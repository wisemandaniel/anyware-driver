import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons';

const ContactUsScreen: React.FC = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Contact Us</Text>
      <View style={styles.inputContainer}>
        <Feather name="user" size={20} color="#888" />
        <TextInput style={styles.input} placeholder="Your Name" />
      </View>
      <View style={styles.inputContainer}>
        <Feather name="mail" size={20} color="#888" />
        <TextInput style={styles.input} placeholder="Your Email" keyboardType="email-address" />
      </View>
      <View style={styles.inputContainer}>
        <Feather name="message-circle" size={20} color="#888" />
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Your Message"
          multiline
          numberOfLines={4}
        />
      </View>
      <TouchableOpacity style={styles.sendButton} onPress={() => console.log('Message Sent')}>
        <Text style={styles.sendButtonText}>Send Message</Text>
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
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  sendButton: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 30,
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ContactUsScreen;
