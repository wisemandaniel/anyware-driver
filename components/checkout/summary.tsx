import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface CartSummaryComponentProps {
  subtotal: string;
  reduction: string;
  total: string;
}

const CartSummaryComponent: React.FC<CartSummaryComponentProps> = ({ subtotal, reduction, total }) => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.label}>Subtotal</Text>
        <Text style={styles.value}>{subtotal} FCFA</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>reduction</Text>
        <Text style={styles.value}>{reduction} FCFA</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Total</Text>
        <Text style={styles.value}>{total} FCFA</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    color: '#666',
  },
  value: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CartSummaryComponent;
