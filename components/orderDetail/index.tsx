import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const OrderDetails: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Order Details</Text>
      <View style={styles.orderItem}>
        <Image source={{ uri: 'https://via.placeholder.com/60x60' }} style={styles.foodImage} />
        <View style={styles.foodInfo}>
          <Text style={styles.foodTitle}>Fried Rice Meal Family</Text>
          <Text style={styles.foodDescription}>Select Drink Complement: Coca Col</Text>
          <Text style={styles.foodPrice}>XAF5500.00</Text>
        </View>
      </View>
      <View style={styles.summary}>
        <Text style={styles.summaryText}>Subtotal</Text>
        <Text style={styles.summaryText}>XAF5500.00</Text>
      </View>
      <View style={styles.summary}>
        <Text style={styles.summaryText}>Discount</Text>
        <Text style={styles.summaryText}>XAF0.00</Text>
      </View>
      <View style={styles.summary}>
        <Text style={styles.summaryText}>Delivery Charge</Text>
        <Text style={styles.summaryText}>XAF1.00</Text>
      </View>
      <View style={[styles.summary, styles.total]}>
        <Text style={[styles.summaryText, styles.totalText]}>Total</Text>
        <Text style={[styles.summaryText, styles.totalText]}>XAF5501.00</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  orderItem: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  foodImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 16,
  },
  foodInfo: {
    flex: 1,
  },
  foodTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  foodDescription: {
    fontSize: 16,
    color: '#666',
    marginBottom: 4,
  },
  foodPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  summary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4,
  },
  summaryText: {
    fontSize: 16,
    color: '#333',
  },
  total: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 8,
  },
  totalText: {
    fontWeight: 'bold',
    color: '#000',
  },
});

export default OrderDetails;
