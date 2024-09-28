import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Linking, Platform } from 'react-native';
import Mapbox, { Camera, LineLayer, MapView, ShapeSource, SymbolLayer, Images } from '@rnmapbox/maps';
import { useLocalSearchParams } from 'expo-router';
import { featureCollection, point, lineString } from '@turf/helpers';
import pin from '~/assets/images/pin.png';
import BottomSheet from '@gorhom/bottom-sheet';
import { FontAwesome5 } from '@expo/vector-icons';
import axios from 'axios';
import * as Location from 'expo-location';

Mapbox.setAccessToken(process.env.EXPO_PUBLIC_MAPBOX_KEY || '');

const Tracking = () => {
  const { lat, lng } = useLocalSearchParams(); // Order's location
  const [driverCoordinates, setDriverCoordinates] = useState<[number, number] | null>(null);
  const [orderCoordinates, setOrderCoordinates] = useState<[number, number] | null>([Number(lng), Number(lat)]);
  const [route, setRoute] = useState<any>(null);
  const [distance, setDistance] = useState(0); // Distance in meters
  const [duration, setDuration] = useState(0); // Duration in seconds
  const phoneNumber = "237678313613"; // Hardcoded for this example

  useEffect(() => {
    const getDriverLocation = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Location permission is required to get the driver\'s location.');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const currentDriverCoordinates = [location.coords.longitude, location.coords.latitude];
      setDriverCoordinates(currentDriverCoordinates);

      if (orderCoordinates && currentDriverCoordinates) {
        fetchRoute(currentDriverCoordinates, orderCoordinates);
      }
    };

    getDriverLocation();

    const interval = setInterval(() => {
      if (driverCoordinates) {
        sendDriverLocation(driverCoordinates);
      }
    }, 10000); // 10 seconds

    return () => clearInterval(interval); // Clear interval on unmount
  }, [driverCoordinates]);

  const fetchRoute = async (start: [number, number], end: [number, number]) => {
    const accessToken = process.env.EXPO_PUBLIC_MAPBOX_KEY || '';
    const profile = 'driving';
    const coordinatesString = `${start[0]},${start[1]};${end[0]},${end[1]}`;
    const url = `https://api.mapbox.com/directions/v5/mapbox/${profile}/${coordinatesString}?geometries=geojson&steps=true&access_token=${accessToken}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.routes && data.routes.length > 0) {
        const { geometry, distance, duration } = data.routes[0];
        setRoute(geometry);
        setDistance(distance);
        setDuration(duration);
      } else {
        Alert.alert('Routing Error', 'No route found between the locations.');
      }
    } catch (error) {
      console.error('Error fetching directions:', error);
    }
  };

  const sendDriverLocation = async (coordinates: [number, number]) => {
    try {
      await axios.post('https://your-server-url.com/driver-location', {
        location: {
          latitude: coordinates[1],
          longitude: coordinates[0],
        },
      });
    } catch (error) {
      console.error('Error sending driver location:', error);
    }
  };

  const handleCallDriver = (phoneNumber: string) => {
    const phoneUrl = Platform.OS === 'android' ? `tel:${phoneNumber}` : `telprompt:${phoneNumber}`;
    Linking.openURL(phoneUrl).catch((err) => console.error('Error making call:', err));
  };

  const handleWhatsAppDriver = (phoneNumber: string) => {
    const whatsappUrl = `whatsapp://send?phone=${phoneNumber}`;
    Linking.openURL(whatsappUrl).catch((err) => Alert.alert('Error', 'WhatsApp is not installed on your device.'));
  };

  return (
    <View style={styles.container}>
      <MapView style={{ flex: 1 }} styleURL="mapbox://styles/mapbox/streets-v11">
        {driverCoordinates && (
          <Camera centerCoordinate={driverCoordinates} zoomLevel={15} />
        )}

        {route && (
          <ShapeSource id="routeSource" shape={lineString(route.coordinates)}>
            <LineLayer
              id="routeLine"
              style={{ lineColor: '#4A90E2', lineWidth: 5, lineCap: 'round' }}
            />
          </ShapeSource>
        )}

        {driverCoordinates && orderCoordinates && (
          <ShapeSource
            id="locations"
            shape={featureCollection([
              point(driverCoordinates, { type: 'driver' }),
              point(orderCoordinates, { type: 'order' })
            ])}
          >
            <SymbolLayer
              id="driver-location-pin"
              style={{
                iconImage: 'pin',
                iconSize: 0.5,
                iconAnchor: 'bottom',
                textField: "Driver's Location",
                textSize: 18,
                textFont: ['Open Sans Bold', 'Arial Unicode MS Bold'],
                textOffset: [0, 1.5],
                textColor: '#000',
                textHaloColor: '#FFF',
                textHaloWidth: 2,
              }}
              filter={['==', ['get', 'type'], 'driver']}
            />

            <SymbolLayer
              id="order-location-pin"
              style={{
                iconImage: 'pin',
                iconSize: 0.5,
                iconAnchor: 'bottom',
                textField: 'Order Location',
                textSize: 18,
                textFont: ['Open Sans Bold', 'Arial Unicode MS Bold'],
                textOffset: [0, 1.5],
                textColor: '#000',
                textHaloColor: '#FFF',
                textHaloWidth: 2,
              }}
              filter={['==', ['get', 'type'], 'order']}
            />

            <Images images={{ pin: pin }} />
          </ShapeSource>
        )}
      </MapView>

      <BottomSheet index={0} snapPoints={['35%', '50%']} style={styles.bottomSheet}>
        <View style={styles.info}>
          <Text style={styles.details}>
            Distance: {(distance / 1000).toFixed(2)} km
          </Text>
          <Text style={styles.details}>
            Duration: {(duration / 60).toFixed(2)} min
          </Text>
        </View>

        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.callButton} onPress={() => handleCallDriver(phoneNumber)}>
            <FontAwesome5 name="phone-alt" size={20} color="white" />
            <Text style={styles.buttonText}>Call Customer</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.messageButton} onPress={() => handleWhatsAppDriver(phoneNumber)}>
            <FontAwesome5 name="whatsapp" size={20} color="white" />
            <Text style={styles.buttonText}>WhatsApp Customer</Text>
          </TouchableOpacity>
        </View>
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  bottomSheet: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  info: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  details: {
    fontSize: 16,
    marginVertical: 5,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  callButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#00BFFF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    flex: 1,
    justifyContent: 'center',
    marginRight: 10,
  },
  messageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#32CD32',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    flex: 1,
    justifyContent: 'center',
    marginLeft: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
    marginLeft: 5,
  },
});

export default Tracking;
