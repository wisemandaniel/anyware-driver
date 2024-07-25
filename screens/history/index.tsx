import { OrderCard } from "@/components";
import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";

export class index extends Component {
  render() {
    return (
      <View style={[styles.activeOrders, styles.container]}>
        <Text style={styles.activeOrdersText}>Orders History</Text>
        <OrderCard />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  activeOrders: {
    paddingTop: 30,
    flex: 1,
    paddingHorizontal: 10,
    marginTop: 10,
  },
  activeOrdersText: {
    fontSize: 22,
    fontWeight: "bold",
    marginVertical: 10,
    marginLeft: 10,
  },
});
export default index;
