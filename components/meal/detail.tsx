import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

interface FoodDetailsComponentProps {
  name: string;
  rating: number;
  ratingCount: number;
  price: number;
  description: string;
  onSeeReviewPress: () => void;
}

const FoodDetailsComponent: React.FC<FoodDetailsComponentProps> = ({ name, rating, ratingCount, price, description, onSeeReviewPress }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{name}</Text>
      <View style={styles.ratingContainer}>
        <Feather name="star" size={20} color="#FFD700" />
        <Text style={styles.rating}>{rating}</Text>
        <Text style={styles.ratingCount}>({ratingCount}+)</Text>
        <TouchableOpacity onPress={onSeeReviewPress}>
          <Text style={styles.seeReview}>See Review</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.price}>XAF {price.toFixed(2)}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  rating: {
    fontSize: 18,
    marginLeft: 5,
  },
  ratingCount: {
    fontSize: 16,
    color: '#666',
    marginLeft: 5,
  },
  seeReview: {
    fontSize: 16,
    color: '#FF6F00',
    marginLeft: 10,
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF6F00',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#666',
  },
});

export default FoodDetailsComponent;
