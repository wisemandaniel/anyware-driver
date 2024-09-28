import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Accordion from 'react-native-collapsible/Accordion';

const Page = () => {
  const [activeSections, setActiveSections] = useState([]);

  const SECTIONS = [
    {
      title: 'What are the benefits of using our delivery service?',
      content: 'Our delivery service offers fast, reliable, and safe transportation of your packages. Whether it’s food, laundry, or any other items, we ensure timely deliveries right to your doorstep. Our tracking system allows you to monitor your delivery in real-time, giving you peace of mind.',
    },
    {
      title: 'How do I place an order for delivery?',
      content: 'To place an order, simply select the service you need, select or add your delivery address, and make a payment. You can also schedule deliveries for a later time that suits you best.',
    },
    {
      title: 'What items can I send using the delivery service?',
      content: 'You can send a variety of items including food, groceries, laundry, and other small packages. However, there are restrictions on hazardous materials, large furniture, and other prohibited items. Please check our guidelines for more details.',
    },
    {
      title: 'What payment methods do you accept?',
      content: 'We accept multiple payment methods including MTN mobile money, Orange money, and cash on delivery. You can choose the payment option that is most convenient for you at checkout.',
    },
    {
      title: 'How do I track my delivery?',
      content: 'Once your order is placed, you you can go to the order detail where you will see the status of the order in real-time. You will also receive updates via SMS or email.',
    },
  ];
  

  const renderHeader = (section: { title: string }, _: string, isActive: boolean) => {
    return (
      <View style={[styles.header, isActive ? styles.activeHeader : null]}>
        <Text style={[styles.headerText, isActive ? styles.activeHeaderText : null]}>{section.title}</Text>
        <Ionicons name={isActive ? "chevron-up" : "chevron-down"} size={20} color="#007AFF" />
      </View>
    );
  };

  const renderContent = (section: { content: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }) => {
    return (
      <View style={styles.content}>
        <Text style={styles.contentText}>{section.content}</Text>
      </View>
    );
  };

  const updateSections = (activeSections: React.SetStateAction<never[]>) => {
    setActiveSections(activeSections);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>FAQ</Text>
      <Accordion
        sections={SECTIONS}
        activeSections={activeSections}
        renderHeader={renderHeader}
        renderContent={renderContent}
        onChange={updateSections}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    alignSelf: 'center',
    color: '#333',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 10,
    backgroundColor: '#e0f0ff',
    borderBottomWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    marginBottom: 10,
  },
  headerText: {
    fontSize: 16,
    color: '#007AFF',
  },
  activeHeader: {
    backgroundColor: '#d0e8ff',
  },
  activeHeaderText: {
    fontWeight: 'bold',
  },
  content: {
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  contentText: {
    fontSize: 14,
    color: '#333',
  },
});

export default Page;
