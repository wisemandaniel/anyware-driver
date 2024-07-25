import React from "react";
import { View, StyleSheet, Text } from "react-native";

import { HomeCard, HomeHeader, OrderCard } from "@/components";

const App = () => {
  return (
    <View style={styles.container}>
      <HomeHeader />
      <View style={styles.statsContainer}>
        <HomeCard
          iconUri="https://via.placeholder.com/24x24"
          number="1"
          label="Complete Delivery"
          backgroundColor="#e0f7fa"
        />
        <HomeCard
          iconUri="https://via.placeholder.com/24x24"
          number="0"
          label="Return Delivery"
          backgroundColor="#e0f7fa"
        />
      </View>
      <View style={styles.activeOrders}>
        <Text style={styles.activeOrdersText}>Active Orders</Text>
        <OrderCard />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
  activeOrders: {
    flex: 1,
    paddingHorizontal: 10,
    marginTop:10
  },
  activeOrdersText: {
    fontSize: 22,
    fontWeight: "bold",
    marginVertical: 10,
    marginLeft:10
  },
});

export default App;
