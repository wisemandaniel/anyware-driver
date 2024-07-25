import { BranchInfo, ProfileHeader } from "@/components";
import SettingsOption from "@/components/settingOption";
import { router } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";

const ProfileScreen: React.FC = () => {
  return (
    <ScrollView style={styles.container}>
      <ProfileHeader
        name="Karni"
        email="delivery@karnivore.biz"
        phone="+237677235152"
      />
      <BranchInfo
        branchName="Checkpoint (main)"
        branchIconUri="https://via.placeholder.com/30"
      />
      <View style={styles.optionsContainer}>
        <SettingsOption
          label="Edit Profile"
          iconName="edit"
          onPress={() => router.push("/setting/edit")}
        />
        <SettingsOption
          label="Change Password"
          iconName="lock"
          onPress={() => router.push("/setting/password")}
        />
        <SettingsOption
          label="Privacy Policy"
          iconName="shield"
          onPress={() => router.push("/setting/privacy")}
        />
        <SettingsOption
          label="Contact Us"
          iconName="phone"
          onPress={() => router.push("/setting/contact")}
        />
        <SettingsOption
          label="About Us"
          iconName="info"
          onPress={() => router.push("/setting/about")}
        />
        <SettingsOption
          label="Log Out"
          iconName="log-out"
          onPress={() => console.log("Log Out")}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  optionsContainer: {
    marginTop: 10,
  },
});

export default ProfileScreen;
