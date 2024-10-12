import React from 'react';
import { Image, StyleSheet } from 'react-native';

interface FoodImageComponentProps {
  imageUri: string;
}

const FoodImageComponent: React.FC<FoodImageComponentProps> = ({ imageUri }) => {
  return <Image source={{ uri: imageUri }} style={styles.image} />;
};

const styles = StyleSheet.create({
  image: {
    width: '98%',
    marginHorizontal:"auto",
    marginTop:40,
    height: 300,
    borderRadius:20,
  },
});

export default FoodImageComponent;
