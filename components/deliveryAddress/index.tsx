import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DeliveryAddress: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Delivery Address</Text>
      <Text style={styles.text}>
        241, molyko to Buea town Road, Buea, Southwest Region, Cameroon
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
  },
});

export default DeliveryAddress;
