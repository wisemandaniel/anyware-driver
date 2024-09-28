import React from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

interface RelatedRestaurantProps {
  name: string;
  imageUri: string;
  rating: number;
}

const RelatedRestaurant: React.FC<RelatedRestaurantProps> = ({ name, imageUri, rating }) => {
  return (
    <View style={styles.restaurant}>
      <Image source={{ uri: imageUri }} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{name}</Text>
        <View style={styles.ratingContainer}>
          <Feather name="star" size={16} color="#FFD700" />
          <Text style={styles.rating}>{rating.toFixed(1)}</Text>
        </View>
      </View>
    </View>
  );
};

interface RelatedRestaurantsComponentProps {
  restaurants: RelatedRestaurantProps[];
}

const RelatedRestaurantsComponent: React.FC<RelatedRestaurantsComponentProps> = ({ restaurants }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Related Restaurants</Text>
      <FlatList
        data={restaurants}
        renderItem={({ item }) => <RelatedRestaurant {...item} />}
        keyExtractor={(item) => item.name}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  restaurant: {
    flexDirection: 'row',
    marginBottom: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    shadowColor: "#FF6F0070",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 2,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 10,
  },
  infoContainer: {
    justifyContent: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  rating: {
    fontSize: 16,
    marginLeft: 5,
    color: '#333',
  },
});

export default RelatedRestaurantsComponent;
