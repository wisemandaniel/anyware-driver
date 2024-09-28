import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

interface OrderCardComponentProps {
  serviceTypes: string[];  // Array of service types
  orderNumber: number;      // Order number
  status: string;           // Status of the order
  lastUpdated: string;      // Last updated date (as a string)
  qty: number;              // Quantity
  totalAmount: number;      // Total amount
  onPress: () => void;      // Press handler
}

const OrderCardComponent: React.FC<OrderCardComponentProps> = ({
  serviceTypes,
  orderNumber,
  status,
  lastUpdated,
  qty,
  totalAmount,
  onPress
}) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.iconContainer}>
        <Feather name="shopping-cart" size={28} color="#fff" />
      </View>
      <Text style={styles.title}>Order #{orderNumber}</Text>
      <Text style={styles.description}>Status: <Text style={styles.status}>{status}</Text></Text>
      <Text style={styles.description}>Last Updated: {lastUpdated}</Text>
      <Text style={styles.totalAmount}>Total Amount: XAF {totalAmount.toFixed(2)}</Text>
      <Text style={styles.serviceTypes}>
        Services: <Text style={{fontWeight: 'bold'}}>{serviceTypes.join(', ')}</Text>
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#e0e0e0', // Light border for better separation
  },
  iconContainer: {
    backgroundColor: '#4CAF50', // Green background for the icon
    borderRadius: 50,
    padding: 15,
    marginBottom: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 3,
  },
  status: {
    fontWeight: 'bold',
    color: '#FF9800', // Highlighting status with a different color
  },
  totalAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50', // Highlighting the total amount
    marginTop: 5,
  },
  serviceTypes: {
    fontSize: 12,
    color: '#777',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default OrderCardComponent;
