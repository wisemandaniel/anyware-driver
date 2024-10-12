import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

interface AddOnProps {
  name: string;
  price: number;
  imageUri: string;
  selected: boolean;
  onSelect: () => void;
}

const AddOnComponent: React.FC<AddOnProps> = ({ name, price, imageUri, selected, onSelect }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onSelect}>
      <Image source={{ uri: imageUri }} style={styles.image} />
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.price}>+${price.toFixed(2)}</Text>
      <View style={[styles.radio, selected && styles.selectedRadio]} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  name: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  price: {
    fontSize: 16,
    color: '#333',
    marginRight: 10,
  },
  radio: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#ccc',
    backgroundColor: '#fff',
  },
  selectedRadio: {
    borderColor: '#FF6F00',
    backgroundColor: '#FF6F00',
  },
});

export default AddOnComponent;
