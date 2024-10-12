import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  RefreshControl,
} from "react-native";
import Colors from "@/constants/Colors";
import { getAllOrders } from "@/functions/order";
import { IAppState } from "@/store/interface";
import { useRouter } from "expo-router";
import { useSelector } from "react-redux";
import { colors } from "react-native-elements";
import Loader from "@/components/loader";
import EmptyState from "@/components/cards/empty";

const OrdersList = () => {
  
    interface OrderItem {
      orderNumber: string;
      _id: string;
      status: string;
      service: { name: string };
      gas_brand: string;
      bottle_size: string;
      address: { name: string };
      amount_payment_status: string;
      delivery_payment_status: string;
      total_amount: number;
      delivery_fee: number;
      createdAt: string;
      qty: number;
    }
  
    const [orders, setOrders] = useState<OrderItem[]>([]);
    const [refreshing, setRefreshing] = useState(false);
    const router = useRouter();
    const token = useSelector((state: IAppState) => state.systemPersist.token);
    const [loading, setLoading] = useState(true);

    const [selectedTab, setSelectedTab] = useState("Processing");
  
    const fetchOrders = async () => {
      if (token) {
        try {
          // Assuming `getAllOrders(token)` returns the provided JSON
          const fetchedOrders: any = await getAllOrders(token);
  
          const transformedOrders = fetchedOrders.orders.reverse().map((order: any) => ({
            orderNumber: order.orderNumber,
            _id: order._id,
            status: order.status,
            service: order.service || "Unknown Service",
            address: order.address?.name || "Unknown Address",
            total_amount: order.total_amount || 0,
            delivery_fee: order.delivery_fee || 0,
            createdAt: order.createdAt,
            qty: order.qty || 1,
            paymentType: order.paymentType,
          }));
  
          setOrders(transformedOrders);
        } catch (error) {
          alert("Failed to fetch orders. Please try again.");
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
        console.log("No token available");
      }
    };
  
  
    const handleRefresh = () => {
      setRefreshing(true);
      fetchOrders();
      setRefreshing(false);
    };
  
    useEffect(() => {
      fetchOrders();
    }, []);

    // Filter orders based on selected tab
    const filteredOrders = orders.filter((order) => {
      if (selectedTab === "Processing") {
        return order.status === "PENDING" || order.status === "ACCEPTED";
      } else if (selectedTab === "Delivered") {
        return order.status === "DELIVERED";
      } else if (selectedTab === "Cancelled") {
        return order.status === "CANCELLED";
      } else if (selectedTab === 'Rejected') {
        return order.status === "REJECTED"
      }
    });

    const renderItem = ({ item }: { item: OrderItem }) => (
      <View style={styles.orderItem}>
        <View style={styles.orderHeader}>
          <Text style={styles.orderId}>Order Id: #{item.orderNumber}</Text>
          <Text style={styles.orderDate}>{new Date(item.createdAt!).toLocaleString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
            month: "2-digit",
            day: "2-digit",
            year: "numeric",
          })}</Text>
        </View>
        <View style={styles.orderDetails}>
          <Text style={styles.orderQuantity}>Quantity: {item.qty}</Text>
          <Text style={styles.orderTotal}>Total: XAF {item.total_amount}</Text>
        </View>
        <View style={styles.orderDetails}>
          <Text style={styles.orderQuantity}>Service: {item.service.name}</Text>
        </View>
        <View style={styles.orderFooter}>
          <Text style={styles.orderStatus}>{item.status}</Text>
          <TouchableOpacity
            style={styles.detailsButton}
            onPress={() => router.push(`/general/order-details/${item._id}`)}
          >
            <Text style={styles.detailsButtonText}>Details</Text>
          </TouchableOpacity>
        </View>
      </View>
    );

    return (
      <View style={styles.container}>
        <Text style={styles.title}>All Orders</Text>
        <View style={styles.tabs}>
          <TouchableOpacity
            style={[
              styles.tab,
              selectedTab === "Processing" ? styles.activeTab : {},
            ]}
            onPress={() => setSelectedTab("Processing")}
          >
            <Text style={selectedTab === "Processing" ? styles.activeTabText : styles.tabText}>
              Processing
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.tab,
              selectedTab === "Delivered" ? styles.activeTab : {},
            ]}
            onPress={() => setSelectedTab("Delivered")}
          >
            <Text style={selectedTab === "Delivered" ? styles.activeTabText : styles.tabText}>
              Delivered
            </Text>
          </TouchableOpacity>
        </View>
        {refreshing ? <Loader /> : null}
        {!filteredOrders.length && !loading ? (
          <EmptyState
            message="No order yet"
          />
        ) : undefined}
        {loading ? <Loader /> : undefined}
        <FlatList
          data={filteredOrders}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={fetchOrders} />
          }
          contentContainerStyle={styles.listContentContainer}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    marginBottom: 50
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    marginTop: 20,
  },
  tabs: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  tab: {
    paddingVertical: 10,
    width: "30%",
    alignItems: "center",
  },
  tabText: {
    fontSize: 16,
    color: Colors.gray,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: Colors.primary,
  },
  activeTabText: {
    fontSize: 16,
    color: Colors.primary,
    fontWeight: "bold",
  },
  listContentContainer: {
    paddingBottom: 20,
  },
  orderItem: {
    backgroundColor: colors.grey5,
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  orderHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  orderId: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.primary,
  },
  orderDate: {
    fontSize: 14,
    color: Colors.gray,
  },
  orderDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  orderQuantity: {
    fontSize: 14,
    color: Colors.gray,
  },
  orderTotal: {
    fontSize: 14,
    color: Colors.gray,
  },
  orderFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  orderStatus: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.primary,
  },
  detailsButton: {
    backgroundColor: Colors.primary,
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  detailsButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
});

export default OrdersList;
