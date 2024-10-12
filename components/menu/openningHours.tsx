import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";

interface OperatingHoursComponentProps {
  openingHours: string;
  closingHours: string;
}

const OperatingHoursComponent: React.FC<OperatingHoursComponentProps> = ({
  openingHours,
  closingHours,
}) => {
  const isOpen = () => {
    const currentTime = new Date();
    const [openingHour, openingMinute] = openingHours.split(":").map(Number);
    const [closingHour, closingMinute] = closingHours.split(":").map(Number);

    const openTime = new Date();
    openTime.setHours(openingHour, openingMinute, 0);

    const closeTime = new Date();
    closeTime.setHours(closingHour, closingMinute, 0);

    return currentTime >= openTime && currentTime <= closeTime;
  };

  const open = isOpen();

  return (
    <View style={[styles.container, open ? styles.open : styles.closed]}>
      <Text style={styles.title}>Operating Hours</Text>
      <View style={styles.hoursContainer}>
        <MaterialCommunityIcons name="door-open" size={20} color="#FF6F00" />
        <Text style={styles.hours}>Open: {openingHours}</Text>
      </View>
      <View style={styles.hoursContainer}>
        <MaterialCommunityIcons name="door-closed" size={20} color="#FF6F00" />
        <Text style={styles.hours}>Close: {closingHours}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    marginBottom: 20,
    borderLeftWidth: 5,
    width: "95%",
    marginHorizontal: "auto",
  },
  open: {
    borderLeftColor: "#00C48C", // Green for open
  },
  closed: {
    borderLeftColor: "#FF6F00", // Red for closed
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  hoursContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  hours: {
    fontSize: 16,
    color: "#666",
    marginLeft: 10,
  },
});

export default OperatingHoursComponent;
