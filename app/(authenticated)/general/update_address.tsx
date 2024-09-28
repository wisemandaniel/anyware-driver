import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import * as Location from "expo-location";
import { router } from "expo-router";
import SelectDropdown from "react-native-select-dropdown";
import { mapStyle } from "@/assets/mapStyle";
import { useSelector } from "react-redux";
import { IAppState } from "@/store/interface";

const Page = () => {
  const [initialRegion, setInitialRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
  });

  useEffect(() => {
    const permission = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      try {
        let currentLocation: any = await Location.getCurrentPositionAsync({});
        if (currentLocation) {
          setCurrentLocation(currentLocation);
          console.log(`Current Location: ${currentLocation}`);
        } else {
          console.log("Unable to retrieve current location");
        }
      } catch (error) {
        console.error("Error retrieving current location:", error);
      }
    };

    permission();
  }, []);

  const onPressContinue = async () => {};

  const [selectedPlace, setSelectedPlace] = useState("");
  const bottomSheetRef: any = useRef(null);
  const snapPoints = useMemo(() => ["50%"], []);
  const [name, setName] = useState("");
  const [popular, setPopular] = useState("");
  const [selectedLat, setSelectedLat] = useState<any>(0);
  const [selectedLng, setSelectedLng] = useState<any>(0);
  const [selectedType, setSelectedType] = useState("");
  const [loading, setLoading] = useState(false);
  const user = useSelector((state: IAppState) => state.systemPersist.user);

  const quantity = [
    {
      id: "1",
      title: "HOME",
    },
    {
      id: "2",
      title: "WORK",
    },
  ];

  const [currentLocation, setCurrentLocation] = useState(null);

  const handleMarkerPress = async (event: any) => {
    setLoading(true);
    setSelectedLat(event.nativeEvent.coordinate.latitude);
    setSelectedLng(event.nativeEvent.coordinate.longitude);
    try {
      setLoading(false);
      const res = await fetch(
        `https://us1.locationiq.com/v1/reverse?key=pk.8be39b4160e3f826b951ce97421c1278&lat=${event.nativeEvent.coordinate.latitude}&lon=${event.nativeEvent.coordinate.longitude}&format=json&`
      );

      try {
        const responseData = await res.json();
        console.log(responseData);
        setSelectedPlace(responseData.display_name);
        bottomSheetRef.current?.expand();

        if (!responseData) return null;
        setInitialRegion({
          ...initialRegion,
          latitude: responseData.lat,
          longitude: responseData.lng,
        });
      } catch (error) {
        setLoading(false);
        console.error("Error parsing JSON:", error);
      }
    } catch (err) {
      setLoading(false);
      alert(err);
    }
  };

  return (
    <View style={styles.container}>
      <GooglePlacesAutocomplete
        enablePoweredByContainer={false}
        styles={{
          container: { flex: 0 },
          textInput: {
            backgroundColor: Colors.lightGray,
            paddingLeft: 35,
            borderRadius: 10,
          },
          textInputContainer: { backgroundColor: "#fff", padding: 8 },
        }}
        renderLeftButton={() => (
          <View style={styles.boxIcon}>
            <Ionicons name="search-outline" size={24} color={Colors.gray} />
          </View>
        )}
        placeholder="Search your location or nearby popular location"
        fetchDetails
        onPress={async (data, details = null) => {
          setSelectedPlace(data.description);
          setSelectedLat(details?.geometry.location.lat);
          setSelectedLng(details?.geometry.location.lng);

          bottomSheetRef.current?.expand();

          const point = details?.geometry?.location;
          if (!point) return null;
          setInitialRegion({
            ...initialRegion,
            latitude: point.lat,
            longitude: point.lng,
          });
        }}
        query={{
          key: "AIzaSyCRtisGn2a6ISoHyJL3BA9DZUMw_VWNdfE",
          language: "en",
        }}
      />

      <MapView
        mapType={"hybrid"}
        toolbarEnabled={true}
        showsBuildings={true}
        loadingEnabled={true}
        liteMode={true}
        showsMyLocationButton={true}
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        followsUserLocation={true}
        style={styles.map}
        customMapStyle={mapStyle}
        initialRegion={{
          latitude: 4.1588768,
          longitude: 9.2804633,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
        onPress={handleMarkerPress}
      >
        <Marker
          onPress={handleMarkerPress}
          coordinate={{
            latitude: initialRegion.latitude,
            longitude: initialRegion.longitude,
          }}
        />
      </MapView>
      <BottomSheet
        style={{ padding: 20 }}
        index={-1}
        enablePanDownToClose
        snapPoints={snapPoints}
        ref={bottomSheetRef}
      >
        <BottomSheetScrollView showsVerticalScrollIndicator={false}>
          {loading && <ActivityIndicator size={50} />}
          <Text style={styles.placeName}>{selectedPlace}</Text>

          <SelectDropdown
            data={quantity}
            onSelect={(selectedItem) => {
              setSelectedType(selectedItem.title);
            }}
            renderButton={(selectedItem, isOpened) => {
              return (
                <View style={styles.dropdownButtonStyle}>
                  {selectedItem && (
                    <Ionicons
                      name={selectedItem.icon}
                      style={styles.dropdownButtonIconStyle}
                    />
                  )}
                  <Text style={styles.dropdownButtonTxtStyle}>
                    {(selectedItem && selectedItem.title) ||
                      "Select Address Type"}
                  </Text>
                  <Ionicons
                    name={isOpened ? "chevron-up" : "chevron-down"}
                    style={styles.dropdownButtonArrowStyle}
                  />
                </View>
              );
            }}
            renderItem={(item, index, isSelected) => {
              return (
                <View
                  style={{
                    ...styles.dropdownItemStyle,
                    ...(isSelected && { backgroundColor: "#D2D9DF" }),
                  }}
                >
                  <Ionicons
                    name={item.icon}
                    style={styles.dropdownItemIconStyle}
                  />
                  <Text style={styles.dropdownItemTxtStyle}>{item.title}</Text>
                </View>
              );
            }}
            showsVerticalScrollIndicator={false}
            dropdownStyle={styles.dropdownMenuStyle}
          />

          <View style={{ flexDirection: "row" }}>
            <TextInput
              style={[styles.input]}
              placeholder="Enter a name you'd like to call it"
              value={name}
              onChangeText={setName}
            />
          </View>
          <View style={{ flexDirection: "row" }}>
            <TextInput
              style={[styles.input]}
              placeholder="Enter name of any popular place around"
              value={popular}
              onChangeText={setPopular}
            />
          </View>
          <TouchableOpacity
            onPress={onPressContinue}
            style={[
              styles.pillButton,
              {
                backgroundColor: Colors.primary,
                width: "80%",
                marginLeft: "auto",
                marginRight: "auto",
                marginBottom: 50,
              },
            ]}
          >
            <Text style={styles.buttonText}>Add Address</Text>
          </TouchableOpacity>
        </BottomSheetScrollView>
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  map: {
    flex: 1,
  },
  bottomSheetContent: {
    padding: 20,
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  placeName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 10,
  },
  quantityContainer: {
    backgroundColor: "red",
    width: "100%",
    // paddingHorizontal: 20,
  },
  pillButton: {
    alignItems: "center",
    borderRadius: 50,
    paddingVertical: 15,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  input: {
    flex: 1,
    borderColor: Colors.primary,
    borderWidth: 1,
    padding: 15,
    borderRadius: 16,
    fontSize: 18,
    marginBottom: 20,
  },
  send_to: {
    fontSize: 18,
    color: Colors.gray,
    textAlign: "center",
    fontWeight: "bold",
  },
  address: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    width: 130,
    margin: 10,
    backgroundColor: "#fff",
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  boxIcon: {
    position: "absolute",
    left: 15,
    top: 18,
    zIndex: 1,
  },
  propertyListContainer: {
    paddingHorizontal: 20,
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
});

export default Page;
