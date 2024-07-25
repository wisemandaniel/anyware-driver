import { FontAwesome6, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Linking,
} from "react-native";
import * as Location from "expo-location";

const OrderCard: React.FC = () => {
  const destination = { latitude: 37.7749, longitude: -122.4194 }; // Dummy destination (San Francisco)

  const getDirections = async () => {
    try {
      // Request location permissions
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission Denied",
          "Permission to access location was denied"
        );
        return;
      }

      // Use dummy current location (Delivery Agent's starting point)
      const currentLocation = { latitude: 34.0522, longitude: -118.2437 }; // Dummy current location (Los Angeles)

      // Construct the URL for Google Maps with navigation mode
      const url = `https://www.google.com/maps/dir/?api=1&origin=${currentLocation.latitude},${currentLocation.longitude}&destination=${destination.latitude},${destination.longitude}&travelmode=driving`;

      // Open Google Maps
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        Linking.openURL(url);
      } else {
        Alert.alert("Error", "Unable to open Google Maps");
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong while fetching location");
    }
  };
  return (
    <View style={styles.card}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 10,
        }}
      >
        <Text style={styles.orderId}>Order Id : 20022427</Text>
        <View style={styles.statusContainer}>
          <Text style={styles.status}>Out For Delivery</Text>
        </View>
      </View>
      <Text style={styles.timestamp}>10:19 AM, 20-02-2024</Text>
      <Text style={styles.location}>
        <Ionicons name="location" /> molyko to Buea town Road, Buea, Southwest
        Region, Cameroon
      </Text>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            router.push("/order");
          }}
        >
          <Text style={styles.buttonText}>See Details</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.directionButton]}
          onPress={getDirections}
        >
          <Text style={[styles.buttonText, { color: "#fff" }]}>
            Get Direction
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    margin: 10,
  },
  orderId: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 5,
    width: "auto",
  },
  statusContainer: {
    alignSelf: "flex-start",
    backgroundColor: "#e0f7fa",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  status: {
    color: "#00796b",
    fontWeight: "bold",
  },
  timestamp: {
    color: "#777",
    marginBottom: 10,
  },
  location: {
    marginBottom: 20,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#f5f5f5",
    width: "45%",
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
  },
  directionButton: {
    backgroundColor: "#ff4081",
  },
  buttonText: {
    color: "#333",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default OrderCard;
