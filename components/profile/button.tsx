import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

interface ProfileButtonComponentProps {
  iconName: string;
  title: string;
  onPress: () => void;
}

const ProfileButtonComponent: React.FC<ProfileButtonComponentProps> = ({ iconName, title, onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Feather name={iconName} size={24} color="#FF6F00" style={styles.icon} />
      <Text style={styles.title}>{title}</Text>
      <Feather name="chevron-right" size={24} color="#ccc" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginBottom: 10,
    borderRadius: 10,
  },
  icon: {
    marginRight: 15,
  },
  title: {
    flex: 1,
    fontSize: 18,
  },
});

export default ProfileButtonComponent;
