import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const CustomerInfo: React.FC = () => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: 'https://via.placeholder.com/50x50' }} style={styles.image} />
      <View>
        <Text style={styles.customerName}>Customer</Text>
        <Text style={styles.customerDetails}>Tecnvoice LTD</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  customerName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  customerDetails: {
    fontSize: 16,
    color: '#666',
  },
});

export default CustomerInfo;
