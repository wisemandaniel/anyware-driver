import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PaymentInfo: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Payment Info</Text>
      <Text style={styles.text}>Method: Cash On Delivery</Text>
      <Text style={styles.text}>
        Status: <Text style={styles.status}>Paid</Text>
      </Text>
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
  text: {
    fontSize: 16,
    color: '#333',
    marginBottom: 4,
  },
  status: {
    color: 'green',
    fontWeight: 'bold',
  },
});

export default PaymentInfo;
