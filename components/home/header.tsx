import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { Feather } from "@expo/vector-icons";

interface HeaderComponentProps {
  onSettingsPress: () => void;
  onNotificationsPress: () => void;
}

const HeaderComponent: React.FC<HeaderComponentProps> = ({
  onSettingsPress,
  onNotificationsPress,
}) => {
  return (
    <View style={styles.header}>
      <Image source={require('@/assets/images/logo.png')} style={styles.logo} />
      <View style={styles.iconsContainer}>
        <TouchableOpacity
          onPress={onNotificationsPress}
          style={styles.iconButton}
        >
          <Feather name="bell" size={24} color="#333" />
        </TouchableOpacity>
        <TouchableOpacity onPress={onSettingsPress} style={styles.iconButton}>
          <Feather name="settings" size={24} color="#333" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  logo: {
    width: 120,
    height: 120,
    resizeMode: "contain",
  },
  iconsContainer: {
    flexDirection: "row",
    alignItems: 'center'
  },
  iconButton: {
    marginLeft: 20,
  },
});

export default HeaderComponent;
