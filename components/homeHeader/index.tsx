import React from 'react';
import { View, StyleSheet, Image } from 'react-native';

const Header: React.FC = () => {
  return (
    <View style={styles.header}>
      <Image
        source={{ uri: 'https://via.placeholder.com/24x24' }} 
        style={styles.icon}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 100,
    paddingTop:40,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: 10,
  },
  icon: {
    width: 40,
    height: 40,
  },
});

export default Header;
