import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

interface SortByComponentProps {
  sortBy: string;
  onSortChange: (sort: string) => void;
  filterBy: string;
  onFilterChange: (filter: string) => void;
}

const SortByComponent: React.FC<SortByComponentProps> = ({ sortBy, onSortChange, filterBy, onFilterChange }) => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.label}>Sort by:</Text>
        <TouchableOpacity style={styles.sortButton} onPress={() => onSortChange(sortBy === 'Popular' ? 'Rating' : 'Popular')}>
          <Text style={styles.sortText}>{sortBy}</Text>
          <Feather name="chevron-down" size={20} color="#FF6F00" />
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Filter by:</Text>
        <TouchableOpacity style={styles.sortButton} onPress={() => onFilterChange(filterBy === 'All' ? 'Fast Food' : 'All')}>
          <Text style={styles.sortText}>{filterBy}</Text>
          <Feather name="chevron-down" size={20} color="#FF6F00" />
        </TouchableOpacity>
      </View>
      <Feather name="filter" size={20} color="#FF6F00" style={styles.filterIcon} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    color: '#666',
    marginRight: 5,
  },
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sortText: {
    fontSize: 16,
    color: '#FF6F00',
    marginRight: 5,
  },
  filterIcon: {
    marginLeft: 10,
  },
});

export default SortByComponent;
