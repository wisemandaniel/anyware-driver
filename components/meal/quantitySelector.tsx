import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

interface QuantitySelectorComponentProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
}

const QuantitySelectorComponent: React.FC<QuantitySelectorComponentProps> = ({ quantity, onIncrease, onDecrease }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onDecrease} style={styles.button}>
        <Feather name="minus" size={24} color="#FF6F00" />
      </TouchableOpacity>
      <Text style={styles.quantity}>{quantity < 10 ? `0${quantity}` : quantity}</Text>
      <TouchableOpacity onPress={onIncrease} style={styles.button}>
        <Feather name="plus" size={24} color="#FF6F00" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  button: {
    padding: 10,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
  },
  quantity: {
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 20,
  },
});

export default QuantitySelectorComponent;
