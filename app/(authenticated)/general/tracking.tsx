import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import MapboxGL, { LocationPuck } from '@rnmapbox/maps';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLocalSearchParams } from 'expo-router';
import { useSelector } from 'react-redux';
import Toast from 'react-native-toast-message';

MapboxGL.setAccessToken(process.env.EXPO_PUBLIC_MAPBOX_KEY || '');

const MapScreen = () => {
  const [routeCoordinates, setRouteCoordinates] = useState<[number, number][]>([]);
  const [driverCoordinates, setDriverCoordinates] = useState<[number, number] | null>(null);
  const [distance, setDistance] = useState(0); // in meters
  const [duration, setDuration] = useState(0); // in seconds
  const { lat, lng } = useLocalSearchParams(); // Order's location
  const [orderCoordinates, setOrderCoordinates] = useState<[number, number] | null>([Number(lng), Number(lat)]);
  const user = useSelector((state) => state.systemPersist.user);
  const token = useSelector((state) => state.systemPersist.token);

  // Store token and user in AsyncStorage (called only once on mount)
  useEffect(() => {
    const storeUserData = async () => {
      try {
        if (token && user) {
          const storedToken = await AsyncStorage.getItem('token');
          const storedUser = await AsyncStorage.getItem('user');

          if (!storedToken || !storedUser) {
            await AsyncStorage.setItem('token', token);
            await AsyncStorage.setItem('user', JSON.stringify(user)); // Store user object as string
          }
        }
      } catch (error) {
        console.error("Error saving token/user to AsyncStorage:", error);
      }
    };
    storeUserData();
  }, [token, user]); // Dependency array ensures this runs only when token/user change

  // Function to request location permissions and get driver's current position
  const getCurrentLocation = useCallback(async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Location permission is required to access your current location.');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const currentDriverCoordinates: [number, number] = [location.coords.longitude, location.coords.latitude];
      setDriverCoordinates(currentDriverCoordinates);
    } catch (error) {
      console.error('Error getting location:', error);
      Alert.alert('Error', 'Unable to retrieve your location. Please try again.');
    }
  }, []);

  // Fetch route from Mapbox
  const fetchRoute = useCallback(async (driverCoords: [number, number], orderCoords: [number, number]) => {
    if (!driverCoords || !orderCoords) {
      console.error('Coordinates missing for route calculation');
      return;
    }

    const profile = 'driving';
    const coordinatesString = `${driverCoords[0]},${driverCoords[1]};${orderCoords[0]},${orderCoords[1]}`;
    const url = `https://api.mapbox.com/directions/v5/mapbox/${profile}/${coordinatesString}?geometries=geojson&access_token=${process.env.EXPO_PUBLIC_MAPBOX_KEY}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (response.ok && data.routes && data.routes.length > 0) {
        const { coordinates } = data.routes[0].geometry;
        setRouteCoordinates(coordinates);
        setDistance(data.routes[0].distance);
        setDuration(data.routes[0].duration);
      } else {
        Toast.show({
          type: "error",
          text1: "Route Error",
          text2: 'No route found between the locations.',
        });
      }
    } catch (error) {
      console.error('Error fetching directions:', error);
      Toast.show({
        type: "error",
        text1: "Network Error",
        text2: 'Failed to fetch route information.',
      });
    }
  }, []);

  useEffect(() => {
    // Only run this effect when driverCoordinates change or when orderCoordinates are set for the first time
    if (driverCoordinates && orderCoordinates) {
      fetchRoute(driverCoordinates, orderCoordinates);
    }
  }, [driverCoordinates, orderCoordinates, fetchRoute]);

  useEffect(() => {
    getCurrentLocation(); // Get location when component mounts
  }, [getCurrentLocation]); // This effect runs only once

  return (
    <View style={styles.container}>
      <MapboxGL.MapView style={styles.map}>
        {driverCoordinates && (
          <MapboxGL.Camera
            zoomLevel={20}
            centerCoordinate={driverCoordinates}
            followUserLocation
            followZoomLevel={15}
          />
        )}
        <LocationPuck puckBearingEnabled puckBearing="heading" pulsing={{ isEnabled: true }} />

        {routeCoordinates.length > 0 && (
          <MapboxGL.ShapeSource
            id="routeSource"
            shape={{
              type: 'Feature',
              geometry: {
                type: 'LineString',
                coordinates: routeCoordinates,
              },
            }}
          >
            <MapboxGL.LineLayer id="routeLine" style={styles.routeLine} />
          </MapboxGL.ShapeSource>
        )}
        {driverCoordinates && (
          <MapboxGL.PointAnnotation id="driverLocation" coordinate={driverCoordinates}>
            <View style={styles.markerContainer}>
              <View style={styles.marker} />
              <Text style={styles.markerLabel}>Driver</Text>
            </View>
          </MapboxGL.PointAnnotation>
        )}
        {orderCoordinates && (
          <MapboxGL.PointAnnotation id="orderLocation" coordinate={orderCoordinates}>
            <View style={styles.markerContainer}>
              <View style={[styles.marker, styles.endMarker]} />
              <Text style={styles.markerLabel}>Customer</Text>
            </View>
          </MapboxGL.PointAnnotation>
        )}
      </MapboxGL.MapView>

      <View style={styles.distanceCard}>
        <Text style={styles.cardText}>Distance: {(distance / 1000).toFixed(2)} km</Text>
        <Text style={styles.cardText}>Duration: {(duration / 60).toFixed(2)} min</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  routeLine: {
    lineWidth: 5,
    lineColor: '#1E90FF',
    lineJoin: 'bevel',
  },
  markerContainer: { alignItems: 'center', justifyContent: 'center' },
  marker: {
    width: 20,
    height: 20,
    backgroundColor: '#1E90FF',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#fff',
  },
  endMarker: { backgroundColor: '#FF4500' },
  markerLabel: { marginTop: 5, fontSize: 12, color: '#000', fontWeight: 'bold' },
  distanceCard: {
    position: 'absolute',
    bottom: 100,
    left: 20,
    right: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    alignItems: 'center',
  },
  cardText: { fontSize: 16, fontWeight: 'bold' },
});

export default MapScreen;
