import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const OtherDaysMenuComponent: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState('Monday');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Other Days' Menus</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollContainer}>
        {days.map((day) => (
          <TouchableOpacity
            key={day}
            onPress={() => setSelectedDay(day)}
            style={[styles.dayButton, selectedDay === day && styles.selectedDayButton]}
          >
            <Text style={[styles.dayText, selectedDay === day && styles.selectedDayText]}>{day}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <Text style={styles.menuContent}>Menu for {selectedDay}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  scrollContainer: {
    flexDirection: 'row',
  },
  dayButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#f5f5f5',
    marginRight: 10,
  },
  selectedDayButton: {
    backgroundColor: '#FF6F00',
  },
  dayText: {
    fontSize: 14,
    color: '#666',
  },
  selectedDayText: {
    color: '#fff',
  },
  menuContent: {
    marginTop: 20,
    fontSize: 16,
    color: '#666',
  },
});

export default OtherDaysMenuComponent;
