import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

interface StatsCardProps {
  iconUri: string;
  number: string;
  label: string;
  backgroundColor: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ iconUri, number, label, backgroundColor }) => {
  return (
    <View style={[styles.card, { backgroundColor }]}>
      <Image source={{ uri: iconUri }} style={styles.icon} />
      <Text style={styles.number}>{number}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: "45%",
    height: 120,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    margin: 5,
  },
  icon: {
    width: 30,
    height: 30,
    marginBottom: 10,
  },
  number: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  label: {
    fontSize: 14,
    color: '#333',
  },
});

export default StatsCard;
