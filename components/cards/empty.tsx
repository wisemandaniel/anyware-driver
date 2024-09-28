import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";

interface EmptyStateProps {
  iconName?: string;
  message?: string;
  subMessage?: string;
  onPressSubMessage?: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  iconName = "alert-circle-outline",
  message = "No Data Available",
  subMessage,
  onPressSubMessage,
}) => {
  return (
    <View style={styles.container}>
      <Ionicons
        name={iconName}
        size={64}
        color={Colors.primary}
        style={styles.icon}
      />
      <Text style={styles.message}>{message}</Text>
      {subMessage && (
        <TouchableOpacity onPress={onPressSubMessage}>
          <Text
            style={[
              styles.subMessage,
              onPressSubMessage && styles.subMessageAction,
            ]}
          >
            {subMessage}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: Colors.primary + "10",
    width: "90%",
    marginHorizontal: "auto",
    borderRadius: 10,
    marginBottom: 20,
  },
  icon: {
    marginBottom: 20,
  },
  message: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 10,
  },
  subMessage: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
  subMessageAction: {
    color: Colors.primary,
    textDecorationLine: "underline",
  },
});

export default EmptyState;
