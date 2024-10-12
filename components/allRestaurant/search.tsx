import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

interface SearchBarComponentProps {
  searchQuery: string;
  onSearch: (query: string) => void;
}

const SearchBarComponent: React.FC<SearchBarComponentProps> = ({ searchQuery, onSearch }) => {
  return (
    <View style={styles.container}>
      <Feather name="search" size={20} color="#666" style={styles.icon} />
      <TextInput
        placeholder="Find for food or restaurant..."
        style={styles.input}
        value={searchQuery}
        onChangeText={onSearch}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 10,
    marginVertical: 20,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
});

export default SearchBarComponent;
