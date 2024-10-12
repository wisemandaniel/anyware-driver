import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';

const SearchBarComponent: React.FC = () => {
  return (
    <TouchableOpacity onPress={()=>{router.push("/restaurant/search")}} style={styles.searchBar}>
      <Feather name="search" size={20} color="#888" />
      <TextInput
        style={styles.searchInput}
        placeholder="Find food or restaurant..."
        editable={false}
      />
      <View style={styles.filterButton}>
        <Feather name="sliders" size={20} color="#FF6F00" />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 12,
    padding: 10,
    marginVertical: 10,
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
  filterButton: {
    padding: 10,
  },
});

export default SearchBarComponent;
