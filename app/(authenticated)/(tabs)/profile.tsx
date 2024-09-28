import ProfileButtonComponent from "@/components/profile/button";
import ProfileHeaderComponent from "@/components/profile/header";
import { deleteAccount, getUserProfile } from "@/functions/profile";
import { IAppState } from "@/store/interface";
import {
  reinitializeSystemPersist,
  removeToken,
  removeUser,
  setUser,
} from "@/store/system_persist";
import { router, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import Toast from "react-native-toast-message";
import { useDispatch, useSelector } from "react-redux";

const ProfileScreen: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const token = useSelector((state: IAppState) => state.systemPersist.token);
  const user = useSelector((state: IAppState) => state.systemPersist.user);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log('user: ', user);
    
  }, [])

  const handleAccountPress = () => {
    console.log("Account pressed");
    router.push("/general/account");
  };

  const handleAddressesPress = () => {
    router.push("/general/addresses");
  };

  const handleCustomerSupportPress = () => {
    console.log("Customer Support pressed");
    router.push("/general/support");
  };

  const handleFAQPress = () => {
    console.log("FAQ pressed");
    router.push('/general/faqs')
  };

  const handleLogoutPress = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => {
            // Clear the token and user data from the Redux store
            dispatch(removeToken());
            // dispatch(removeUser());
            // dispatch(reinitializeSystemPersist());

            // Route to the home screen
            router.push("/");
          },
        },
      ],
      { cancelable: true }
    );
  };

  const handleWalletPress = () => {
    console.log("Settings pressed");
    router.push('/general/wallet')
  };

  const handleDeleteProfile = () => {
    Alert.alert(
      "Delete account",
      "Are you sure you want to Delete your account? This action is irreversible",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: async () => {
            setIsLoading(true);
            if (token) {
              try {
                const response = await deleteAccount(token);
                console.log("API Response:", response);
                router.push('/')
              } catch (error) {
                console.error("Error fetching user profile:", error);
                Toast.show({
                  type: "error",
                  text1: "Error",
                  text2: 'error',
                });
              } finally {
                setIsLoading(false);
              }
            } else {
              alert("No token found");
              setIsLoading(false);
            }
          },
        },
      ],
      { cancelable: true }
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <ProfileHeaderComponent
          profileImageUrl={user.image || ''}
          name={user.name}
          email={user.email}
        />
        <View style={styles.buttonContainer}>
          <ProfileButtonComponent
            iconName="user"
            title="Account"
            onPress={handleAccountPress}
          />
          <ProfileButtonComponent
            iconName="headphones"
            title="Customer Support"
            onPress={handleCustomerSupportPress}
          />
          <ProfileButtonComponent
            iconName="help-circle"
            title="FAQ"
            onPress={handleFAQPress}
          />
          <ProfileButtonComponent
            iconName="log-out"
            title="Logout"
            onPress={handleLogoutPress}
          />
          <ProfileButtonComponent
            iconName="trash"
            title="Delete account"
            onPress={handleDeleteProfile}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f7f7",
  },
  content: {
    padding: 20,
    paddingTop: 40,
  },
  buttonContainer: {
    marginTop: 20,
  },
});

export default ProfileScreen;
