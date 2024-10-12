import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';
import * as ImagePicker from 'expo-image-picker';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfile, ProfileResponse, updatedProfile } from '@/functions/profile';
import { IAppState } from '@/store/interface';
import Colors from '@/constants/Colors';
import axios from 'axios';

const Page = () => {
  const [isLoading, setIsLoading] = useState(false);
  const token = useSelector((state: IAppState) => state.systemPersist.token);
  const [user, setUser] = useState<ProfileResponse | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [image, setImage] = useState<string | null>(null);

  const onGetUserProfile = async () => {
    setIsLoading(true);
    if (token) {
      try {
        const response = await getUserProfile(token);
        setUser(response);
        setImage(response.image || 'https://via.placeholder.com/150');
      } catch (error) {
        console.error("Error fetching user profile:", error);
        Toast.show({
          type: "error",
          text1: "Error",
          text2: 'Error fetching user profile',
        });
      } finally {
        setIsLoading(false);
      }
    } else {
      alert("No token found");
      setIsLoading(false);
    }
  };

  const updateProfile = async () => {
    setIsLoading(true);
    if (token) {
      try {
        const userProfile = {
          name,
          email,
          address,
          phoneNumber,
          image,
        };

        await updatedProfile(userProfile, token as string).then((res: any) => {
          Toast.show({
            type: "success",
            text1: "Successful",
            text1Style: {
              fontSize: 18,
              fontWeight: "bold",
              color: Colors.background,
            },
            text2: "You successfully updated your profile",
          });
          setIsLoading(false);
          onGetUserProfile(); // Refresh profile data after update
        });

      } catch (error) {
        console.error("Error updating user profile:", error);
        Toast.show({
          type: "error",
          text1: "Error",
          text2: 'Error updating user profile',
        });
      } finally {
        setIsLoading(false);
      }
    } else {
      alert("No token found");
      setIsLoading(false);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      uploadProfilePhoto(result.assets[0].uri);
    }
  };

  const uploadProfilePhoto = async (imageUri: string) => {
    setIsLoading(true);
    try {
      const formData = new FormData();
        formData.append('image', {
            uri: imageUri,
            name: 'profile.jpg',
            type: 'image/jpeg'
        });


      const response = await axios.put(
        'https://a353-129-0-102-56.ngrok-free.app/api/profile/profile-picture',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      console.log(response);
      

      if (response.data && response.data.user) {
        setUser(response.data.user);
        Toast.show({
          type: "success",
          text1: "Success",
          text2: "Profile picture updated successfully",
        });
      } else {
        throw new Error('Unexpected response from server');
      }
    } catch (error) {
      console.error('Error uploading profile photo:', error);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: 'Error uploading profile photo',
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    onGetUserProfile();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF416C" />
      </View>
    );
  }

  if (!user) {
    return (
      <View style={styles.loadingContainer}>
        <Text>No user data available.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ flexGrow: 1 }}>
      {/* Profile Picture */}
      <View style={styles.profilePictureContainer}>
        <TouchableOpacity onPress={pickImage}>
          <Image
            source={{ uri: image || 'https://via.placeholder.com/150' }}
            style={styles.profilePicture}
          />
        </TouchableOpacity>
      </View>

      {/* Profile Details */}
      <View style={styles.detailsContainer}>
        {/* Name */}
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          value={user.name}
          onChangeText={setName}
        />

        {/* Email */}
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={user.email}
          onChangeText={setEmail}
        />

        {/* Role */}
        <Text style={styles.label}>User Role</Text>
        <TextInput
          style={styles.input}
          value={user.role}
          editable={false}
        />
        {/* Address */}
        <Text style={styles.label}>Address</Text>
        <TextInput
          style={styles.input}
          value={user.address}
          onChangeText={setAddress}
        />

        {/* Mobile Number */}
        <Text style={styles.label}>Mobile Number</Text>
        <TextInput
          style={styles.input}
          value={user.phoneNumber}
          onChangeText={setPhoneNumber}
        />
      </View>

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={updateProfile} style={styles.logoutButton}>
          <Text style={styles.logoutButtonText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  profilePictureContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#fff',
  },
  detailsContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: '#888',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    marginBottom: 15,
    backgroundColor: '#f9f9f9',
  },
  referralCode: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    fontSize: 20,
    color: '#FF416C',
    fontWeight: 'bold',
    marginBottom: 15,
    backgroundColor: '#f9f9f9',
  },
  option: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  optionText: {
    fontSize: 16,
    color: '#000',
  },
  buttonContainer: {
    marginBottom: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  editButton: {
    backgroundColor: '#000',
    padding: 15,
    borderRadius: 10,
    flex: 1,
    marginRight: 10,
  },
  editButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
  logoutButton: {
    backgroundColor: '#FF416C',
    padding: 15,
    borderRadius: 10,
    flex: 1,
    marginLeft: 10,
  },
  logoutButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});

export default Page;
