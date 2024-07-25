import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const PrivacyPolicyScreen: React.FC = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Privacy Policy</Text>
      <Text style={styles.sectionTitle}>1. Introduction</Text>
      <Text style={styles.content}>
        This section describes the introduction to your privacy policy, including an overview of what the policy covers.
      </Text>
      <Text style={styles.sectionTitle}>2. Information Collection</Text>
      <Text style={styles.content}>
        Details about what information is collected from users and how it is used.
      </Text>
      <Text style={styles.sectionTitle}>3. User Rights</Text>
      <Text style={styles.content}>
        Information about user rights concerning their data and how they can manage these rights.
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
    color: '#555',
    marginBottom: 20,
  },
});

export default PrivacyPolicyScreen;
