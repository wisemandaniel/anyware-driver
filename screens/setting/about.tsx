import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons';

const AboutUsScreen: React.FC = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>About Us</Text>
      <Feather name="info" size={24} color="#333" style={styles.icon} />
      <Text style={styles.content}>
        Our company has been providing exceptional service and quality products for over a decade. Our mission is to deliver the best customer experience through innovation and dedication.
      </Text>
      <Text style={styles.content}>
        We pride ourselves on our strong values, which include integrity, customer focus, and teamwork. Our team of experienced professionals is dedicated to achieving excellence in every aspect of our business.
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  icon: {
    marginBottom: 20,
    alignSelf: 'center',
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
    color: '#555',
    marginBottom: 20,
  },
});

export default AboutUsScreen;
