import React, { useEffect, useState } from "react";
import { SafeAreaView, FlatList, StyleSheet, Text, ActivityIndicator, RefreshControl, Alert } from "react-native";
import OrderCardComponent from "@/components/cards/order";
import HeaderComponent from "@/components/home/header";
import Colors from "@/constants/Colors";
import { StatusBar } from "expo-status-bar";
import { getAssignedOrders, sendLocationOfDriver } from "@/functions/order"; 
import { IAppState } from "@/store/interface";
import { useSelector } from "react-redux";
import { router } from "expo-router";
import EmptyState from "@/components/cards/empty";
import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LOCATION_TASK_NAME = 'background-location-task';

const MainScreen: React.FC = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const token = useSelector((state: IAppState) => state.systemPersist.token);
  const user = useSelector((state: IAppState) => state.systemPersist.user);

  // Store token and user in AsyncStorage when the app is running
  const storeUserData = async () => {
    try {
      if (token && user) {
        await AsyncStorage.setItem('token', token);
        await AsyncStorage.setItem('user', JSON.stringify(user)); // Store user object as string
      }
    } catch (error) {
      console.log("Error saving token/user to AsyncStorage:", error);
    }
  };

  // Function to request location permissions and start background tracking
  const startLocationTracking = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Location permission is required to access your current location.');
        return;
      }

      const backgroundStatus = await Location.requestBackgroundPermissionsAsync();
      if (backgroundStatus.status !== 'granted') {
        Alert.alert('Background Permission Denied', 'Background location permission is required.');
        return;
      }

      await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
        accuracy: Location.Accuracy.High,
        distanceInterval: 10, // Send updates every 10 meters
        showsBackgroundLocationIndicator: true,
      });
    } catch (error) {
      console.error('Error starting location tracking:', error);
      Alert.alert('Error', 'Could not start location tracking.');
    }
  };

  useEffect(() => {
    storeUserData(); // Save user data on mount
    startLocationTracking(); // Start tracking the location
    fetchOrders(); // Fetch the initial orders

    // Cleanup: Stop location updates when component unmounts
    return () => {
      Location.stopLocationUpdatesAsync(LOCATION_TASK_NAME);
    };
  }, []);

  const fetchOrders = async (isRefreshing = false) => {
    if (token) {
      try {
        if (!isRefreshing) {
          setLoading(true);
        }

        const fetchedOrders: any = await getAssignedOrders(token);
        const transformedOrders = fetchedOrders.orders.reverse().map((order: any) => {
          const availableServices = [
            order.food?.length > 0 ? 'Food' : null,
            order.gas?.length > 0 ? 'Gas' : null,
            order.laundry?.length > 0 ? 'Laundry' : null,
            order.garbage?.length > 0 ? 'Garbage' : null,
          ].filter(Boolean);

          return {
            orderNumber: order.orderNumber,
            _id: order._id,
            status: order.status,
            serviceTypes: availableServices,
            address: order.address?.name || "Unknown Address",
            total_amount: order.total_amount || 0,
            delivery_fee: order.delivery_fee || 0,
            createdAt: order.createdAt,
            qty: order.qty || 1,
            paymentType: order.paymentType,
          };
        });

        setOrders(transformedOrders);
      } catch (error) {
        Alert.alert('Error', 'Failed to fetch orders. Please try again.');
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchOrders(true);
  };

  const renderOrderCard = ({ item }: any) => (
    <OrderCardComponent
      serviceTypes={item.serviceTypes}
      orderNumber={item.orderNumber}
      status={item.status}
      lastUpdated={item.createdAt}
      qty={item.qty}
      totalAmount={item.total_amount}
      onPress={() => router.push(`/general/order-details/${item._id}`)}
    />
  );

  if (loading && !refreshing) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar style="dark" />
        <ActivityIndicator size="large" color={Colors.primary} style={styles.loader} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      {!orders.length && !loading ? (
        <EmptyState message="No active orders yet" />
      ) : (
        <FlatList
          contentContainerStyle={styles.content}
          data={orders}
          renderItem={renderOrderCard}
          keyExtractor={(item: any) => item._id}
          ListHeaderComponent={<Text style={styles.headerTitle}>Active Orders</Text>}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[Colors.primary]}
            />
          }
        />
      )}
    </SafeAreaView>
  );
};

// Define the background location task
TaskManager.defineTask(LOCATION_TASK_NAME, async ({ data, error }) => {
  if (error) {
    console.error('TaskManager Error:', error);
    return;
  }

  if (data) {
    const { locations } = data;
    const { latitude, longitude } = locations[0].coords;

    // Retrieve the token and user from AsyncStorage
    const token = await AsyncStorage.getItem('token');
    const userString = await AsyncStorage.getItem('user');
    const user = userString ? JSON.parse(userString) : null;

    if (token && user) {
      // Send the location to the server
      await sendLocationOfDriver(token, {
        driverId: user._id,
        latitude,
        longitude,
      });
    } else {
      console.log('Token or user not found');
    }
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    marginBottom: 70,
    marginTop: 50,
  },
  content: {
    padding: 20,
    flexGrow: 1,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FF6F00',
    marginBottom: 20,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MainScreen;
