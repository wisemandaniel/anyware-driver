import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button, Alert } from "react-native";
import { CameraView, Camera } from "expo-camera";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import Colors from "@/constants/Colors";
import { useDispatch, useSelector } from "react-redux";
import { router, useLocalSearchParams } from "expo-router";
import { IAppState } from "@/store/interface";
import { setOrder } from "@/store/system_persist";
import Toast from "react-native-toast-message";
import axios from "axios";

export default function App() {
  const [hasPermission, setHasPermission] = useState<any>(null);
  const [scanned, setScanned] = useState(false);
  const user = useSelector((state: IAppState) => state.systemPersist.user);
  const token = useSelector((state: IAppState) => state.systemPersist.token);
  const dispatch = useDispatch();
  const { orderId } = useLocalSearchParams();

  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getCameraPermissions();
  }, []);

  const deliverOrder = async () => {
    const data = {
      status: 'DELIVERED'
    }
    try {
      if (!token) {
        alert('No authorization token found.');
        return;
      }
    
      const response = await axios.put(
        `https://anyware-l4rr.onrender.com/api/orders/${orderId}/confirm-delivery`,
        data,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
    
      if (response.status === 200) {      
        Toast.show({
          type: "success",
          text1: "Successful",
          text1Style: {
            fontSize: 18,
            fontWeight: "bold",
            color: Colors.background,
          },
          text2: "You successfully Deliver this package",
        });
        router.back();
      } else {
        const errorData = response.data;
        alert(`An error occurred: ${errorData.message}`);
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error",
        text1Style: {
          fontSize: 18,
          fontWeight: "bold",
          color: Colors.background,
        },
        text2: `An error occurred: ${error.response?.data?.message || error.message}`,
      });
    } finally {
      // setLoading(false); // Hide the spinner
    }
  }

  const handleBarCodeScanned = (barcodeData: any) => {
    const order = JSON.parse(barcodeData.data);
    if (order._id !== orderId) {
      Toast.show({
        type: "error",
        text1: "Error",
        text1Style: {
          fontSize: 18,
          fontWeight: "bold",
          color: Colors.background,
        },
        text2: "Sorry you are not allowed to deliver this order because it was not assigned to you",
      });
    } else {
      dispatch(setOrder(order));
      setScanned(true);
      console.log(barcodeData.data);
      deliverOrder()
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.text}>
        Scan the QR code on the user's app to confirm you have delivered the
        package
      </Text>
      <CameraView
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: ["qr", "pdf417"],
        }}
        style={styles.camera}
      />
      {scanned && (
        <TouchableOpacity
          style={styles.button}
          onPress={() => setScanned(false)}
          disabled={!scanned}
        >
          <Text style={styles.buttonText}>Tap to Scan Again</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    padding: 20,
    textAlign: "center",
    fontSize: 20,
    marginBottom: 20,
  },
  camera: {
    height: 350,
    width: "90%",
    marginBottom: 20,
    overflow: "hidden",
  },
  button: {
    backgroundColor: Colors.primary,
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
});
