import React, { useEffect, useState } from "react";
import { SafeAreaView, FlatList, StyleSheet, Text, ActivityIndicator, RefreshControl } from "react-native";
import OrderCardComponent from "@/components/cards/order";
import HeaderComponent from "@/components/home/header";
import Colors from "@/constants/Colors";
import { StatusBar } from "expo-status-bar";
import { getAssignedOrders } from "@/functions/order"; 
import { IAppState } from "@/store/interface";
import { useSelector } from "react-redux";
import { router } from "expo-router";
import EmptyState from "@/components/cards/empty";

const MainScreen: React.FC = () => {
  const [orders, setOrders] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const token = useSelector((state: IAppState) => state.systemPersist.token);

  const fetchOrders = async (isRefreshing = false) => {
    if (token) {
      try {
        if (!isRefreshing) {
          setLoading(true);
        }
  
        const fetchedOrders: any = await getAssignedOrders(token);
        const transformedOrders: any = fetchedOrders.orders.reverse().map((order: any) => {
          // Dynamically determine available services
          const availableServices = [
            order.food && order.food.length > 0 ? 'Food' : null,
            order.gas && order.gas.length > 0 ? 'Gas' : null,
            order.laundry && order.laundry.length > 0 ? 'Laundry' : null,
            order.garbage && order.garbage.length > 0 ? 'Garbage' : null,
          ].filter(Boolean); // Remove null values
  
          return {
            orderNumber: order.orderNumber,
            _id: order._id,
            status: order.status,
            serviceTypes: availableServices, // Pass the available services
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
        alert("Failed to fetch orders. Please try again.");
      } finally {
        setLoading(false);
        setRefreshing(false); // Stop the refresh indicator
      }
    } else {
      setLoading(false);
      setRefreshing(false);
      console.log("No token available");
    }
  };
  

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleSettingsPress = () => {
    console.log("Settings pressed");
  };

  const handleNotificationsPress = () => {
    console.log("Notifications pressed");
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
        <HeaderComponent
          onSettingsPress={handleSettingsPress}
          onNotificationsPress={handleNotificationsPress}
        />
        <ActivityIndicator size="large" color={Colors.primary} style={styles.loader} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
  <StatusBar style="dark" />
  <HeaderComponent
    onSettingsPress={handleSettingsPress}
    onNotificationsPress={handleNotificationsPress}
  />

  {!orders.length && !loading ? (
    <EmptyState
      message="No active order yet"
    />
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    marginBottom: 70
  },
  content: {
    padding: 20,
    flexGrow: 1,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#FF6F00",
    marginBottom: 20,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MainScreen;
