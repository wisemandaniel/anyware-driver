import {
  CustomerInfo,
  DeliveryAddress,
  OrderHeader,
  PaymentInfo,
} from "@/components";
import OrderDetails from "@/components/orderDetail";
import React from "react";
import { ScrollView, StyleSheet } from "react-native";

const App: React.FC = () => {
  return (
    <ScrollView style={styles.container}>
      <OrderHeader />
      <CustomerInfo />
      <PaymentInfo />
      <DeliveryAddress />
      <OrderDetails />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

export default App;
