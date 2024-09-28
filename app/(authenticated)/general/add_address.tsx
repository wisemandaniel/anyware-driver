import React, { useEffect, useState, useMemo, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ActivityIndicator, Alert, FlatList } from 'react-native';
import Mapbox, { Camera, LocationPuck, MapView, MarkerView } from '@rnmapbox/maps';
import BottomSheet from '@gorhom/bottom-sheet';
import * as Location from 'expo-location';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import SelectDropdown from 'react-native-select-dropdown';
import axios from 'axios';
import { createAddress } from '@/functions/address';
import { router } from 'expo-router';
import { IAppState } from '@/store/interface';
import { useSelector } from 'react-redux';
import { CheckBox } from 'react-native-elements'; // Import CheckBox component

Mapbox.setAccessToken(process.env.EXPO_PUBLIC_MAPBOX_KEY || '');

const Tracking = () => {
  const [currentLocation, setCurrentLocation] = useState<[number, number] | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<[number, number] | null>(null);
  const [addressType, setAddressType] = useState('');
  const [popularPlace, setPopularPlace] = useState('');
  const [optionalAddress, setOptionalAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [useCurrentLocation, setUseCurrentLocation] = useState(false); // State for checkbox
  const bottomSheetRef: any = useRef(null);
  const snapPoints = useMemo(() => ['55%', '70%'], []);
  const user = useSelector((state: IAppState) => state.systemPersist.user);
  const token = useSelector((state: IAppState) => state.systemPersist.token);

  const quantity = [
    {
      id: '1',
      title: 'Home',
      text: 'Home',
    },
    {
      id: '2',
      title: 'Office',
      text: 'Office',
    },
  ];

  useEffect(() => {
    const getLocationPermissionAndFetchLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }

      try {
        let location = await Location.getCurrentPositionAsync({});
        if (location) {
          setCurrentLocation([location.coords.longitude, location.coords.latitude]);
        }
      } catch (error) {
        console.error('Error fetching location:', error);
      }
    };

    getLocationPermissionAndFetchLocation();
  }, []);

  const handleMapPress = (event: any) => {
    const { geometry } = event;
    const { coordinates } = geometry;

    setSelectedLocation([coordinates[0], coordinates[1]]);
  };

  const searchLocation = async (query: string) => {
    if (!query) {
      setSearchResults([]);
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
          query
        )}.json?access_token=${process.env.EXPO_PUBLIC_MAPBOX_KEY}`
      );

      if (response.data.features.length > 0) {
        setSearchResults(response.data.features);
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.error('Error searching location:', error);
      Alert.alert('Error', 'Failed to search location.');
    } finally {
      setLoading(false);
    }
  };

  const onSelectLocation = (location: any) => {
    const { center } = location;
    setCurrentLocation([center[0], center[1]]);
    setSearchResults([]); // Clear the search results
    setSearchQuery(location.place_name); // Set the search query to the selected location name
  };

  const onPressContinue = async () => {
    setSubmitting(true);
    const finalLocation = useCurrentLocation ? currentLocation : selectedLocation;

    if (!addressType || !popularPlace || !optionalAddress || !finalLocation) {
      Alert.alert('Error', 'Please fill in all required fields.');
      setSubmitting(false);
      return;
    }

    const newAddress: any = {
      lat: finalLocation[1],
      lng: finalLocation[0],
      name: optionalAddress,
      popular_place: popularPlace,
      address_type: addressType,
    };

    try {
      const createdAddress = await createAddress(newAddress, token as string);
      Alert.alert('Success', 'Address created successfully!');
      setSubmitting(false);
      router.back();
    } catch (error) {
      setSubmitting(false);
      Alert.alert('Error', 'Failed to create address.');
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        style={{ flex: 1 }}
        styleURL="mapbox://styles/mapbox/streets-v11"
        onPress={handleMapPress}
      >
        {currentLocation && (
          <>
            <Camera zoomLevel={16} centerCoordinate={currentLocation} />
            <LocationPuck puckBearingEnabled puckBearing="heading" pulsing={{ isEnabled: true }} />
          </>
        )}

        {selectedLocation && (
          <MarkerView coordinate={selectedLocation}>
            <View style={styles.marker}>
              <FontAwesome5 name="map-marker-alt" size={30} color="#e74c3c" />
            </View>
          </MarkerView>
        )}
      </MapView>

      {/* Location Search Input */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search for a location"
          value={searchQuery}
          onChangeText={(text) => {
            setSearchQuery(text);
            searchLocation(text);
          }}
        />
        <TouchableOpacity onPress={() => searchLocation(searchQuery)} style={styles.searchButton}>
          {loading ? <ActivityIndicator color="white" size={24} /> : <Text style={styles.searchButtonText}>Search</Text>}
        </TouchableOpacity>
      </View>

      {/* Display Search Results as a Dropdown */}
      {searchResults.length > 0 && (
        <FlatList
          data={searchResults}
          keyExtractor={(item) => item.id}
          style={styles.searchResultsContainer}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.searchResultItem} onPress={() => onSelectLocation(item)}>
              <Text style={styles.searchResultText}>{item.place_name}</Text>
            </TouchableOpacity>
          )}
        />
      )}

      <BottomSheet ref={bottomSheetRef} index={0} snapPoints={snapPoints} style={styles.bottomSheet}>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Type of Address</Text>
          <SelectDropdown
            data={quantity}
            onSelect={(selectedItem) => setAddressType(selectedItem.text)}
            renderButton={(selectedItem, isOpened) => (
              <View style={styles.dropdownButtonStyle}>
                <Text style={styles.dropdownButtonTxtStyle}>
                  {selectedItem ? selectedItem.title : 'Select Address Type'}
                </Text>
                <Ionicons name={isOpened ? 'chevron-up' : 'chevron-down'} style={styles.dropdownButtonArrowStyle} />
              </View>
            )}
            renderItem={(item, index, isSelected) => (
              <View
                style={{
                  ...styles.dropdownItemStyle,
                  ...(isSelected && { backgroundColor: '#D2D9DF' }),
                }}
              >
                <Text style={styles.dropdownItemTxtStyle}>{item.title}</Text>
              </View>
            )}
            showsVerticalScrollIndicator={false}
            dropdownStyle={styles.dropdownMenuStyle}
          />

          <Text style={styles.inputLabel}>Popular Place Around</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter name of a popular place"
            value={popularPlace}
            onChangeText={setPopularPlace}
          />

          <Text style={styles.inputLabel}>Address Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter address name"
            value={optionalAddress}
            onChangeText={setOptionalAddress}
          />

          <View style={styles.checkboxContainer}>
            <CheckBox
              title="Use Current Location"
              checked={useCurrentLocation}
              onPress={() => setUseCurrentLocation(!useCurrentLocation)}
              containerStyle={styles.checkbox}
              textStyle={styles.checkboxText}
            />
          </View>
        </View>

        <View style={styles.actionButtons}>
          <TouchableOpacity onPress={onPressContinue} style={styles.messageButton}>
            {!submitting ? (
              <>
                <FontAwesome5 name="plus" size={20} color="white" />
                <Text style={styles.buttonText}>Add Address</Text>
              </>
            ) : (
              <ActivityIndicator color="white" size={24} />
            )}
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
  searchContainer: {
    position: 'absolute',
    top: 10,
    left: 10,
    right: 10,
    flexDirection: 'row',
    zIndex: 1,
  },
  searchInput: {
    flex: 1,
    backgroundColor: '#fff',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
  searchButton: {
    backgroundColor: '#32CD32',
    paddingHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginLeft: 5,
  },
  searchButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  searchResultsContainer: {
    position: 'absolute',
    top: 60,
    left: 10,
    right: 10,
    backgroundColor: '#fff',
    zIndex: 1,
    maxHeight: 200,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
  },
  searchResultItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  searchResultText: {
    fontSize: 16,
  },
  bottomSheet: {
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  inputContainer: {
    padding: 20,
  },
  inputLabel: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
    paddingHorizontal: 10,
  },
  messageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#32CD32',
    padding: 15,
    borderRadius: 10,
    flex: 1,
    marginHorizontal: 5,
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 10,
  },
  marker: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
  },
  dropdownButtonStyle: {
    width: "100%",
    height: 50,
    marginTop: 10,
    marginBottom: 30,
    backgroundColor: "#E9ECEF",
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 12,
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: "500",
    color: "#151E26",
  },
  dropdownButtonArrowStyle: {
    fontSize: 28,
  },
  dropdownButtonIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
  dropdownMenuStyle: {
    backgroundColor: "#E9ECEF",
    borderRadius: 8,
  },
  dropdownItemStyle: {
    width: "100%",
    flexDirection: "row",
    paddingHorizontal: 12,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 8,
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: "500",
    color: "#151E26",
  },
  dropdownItemIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
  },
  checkbox: {
    width: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: 15,
    backgroundColor: '#fff',
    borderColor: '#ddd',
    borderRadius: 5,
    borderWidth: 1,
  },
  checkboxText: {
    fontSize: 16,
  },
});

export default Tracking;
