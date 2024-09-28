import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

interface CartHeaderComponentProps {
  onBackPress: () => void;
}

const CartHeaderComponent: React.FC<CartHeaderComponentProps> = ({ onBackPress }) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={onBackPress}>
        <Feather name="arrow-left" size={24} color="#000" />
      </TouchableOpacity>
      <Text style={styles.title}>Cart</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    paddingTop: 40
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 20,
  },
});

export default CartHeaderComponent;
