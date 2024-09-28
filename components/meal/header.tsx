import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather, FontAwesome, Ionicons } from '@expo/vector-icons';

interface HeaderComponentProps {
  onBackPress: () => void;
  onFavoriteToggle: () => void;
  isFavorite: boolean;
}

const HeaderComponent: React.FC<HeaderComponentProps> = ({ onBackPress, onFavoriteToggle, isFavorite }) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={onBackPress}>
        <Feather name="arrow-left" size={24} color="#000" style={styles.icon} />
      </TouchableOpacity>
      <TouchableOpacity onPress={onFavoriteToggle}>
        <FontAwesome name={isFavorite? "heart": "heart-o"} size={24} color={"#FF6F00"} style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    position: 'absolute',
    width: '100%',
    top: 40,
    zIndex: 1,
  },
  icon: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
});

export default HeaderComponent;
