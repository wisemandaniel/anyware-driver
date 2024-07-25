import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons';

const ChangePasswordScreen: React.FC = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Change Password</Text>
      <View style={styles.inputContainer}>
        <Feather name="lock" size={20} color="#888" />
        <TextInput style={styles.input} secureTextEntry placeholder="Current Password" />
      </View>
      <View style={styles.inputContainer}>
        <Feather name="lock" size={20} color="#888" />
        <TextInput style={styles.input} secureTextEntry placeholder="New Password" />
      </View>
      <View style={styles.inputContainer}>
        <Feather name="lock" size={20} color="#888" />
        <TextInput style={styles.input} secureTextEntry placeholder="Confirm New Password" />
      </View>
      <TouchableOpacity style={styles.saveButton} onPress={() => console.log('Change Password')}>
        <Text style={styles.saveButtonText}>Change Password</Text>
      </TouchableOpacity>
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
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 15,
    paddingBottom: 8,
  },
  input: {
    fontSize: 16,
    marginLeft: 10,
    flex: 1,
  },
  saveButton: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 30,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ChangePasswordScreen;
