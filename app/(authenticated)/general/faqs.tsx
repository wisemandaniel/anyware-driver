import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Accordion from 'react-native-collapsible/Accordion';
import { getGlobalVarriables } from '@/functions/settings';
import { IAppState } from '@/store/interface';
import Toast from 'react-native-toast-message';
import { useSelector } from 'react-redux';

const Page = () => {
  const [activeSections, setActiveSections] = useState([]);
  const token = useSelector((state: IAppState) => state.systemPersist.token);
  const [faqs, setFaqs] = useState<any[]>([]); // Initialize faqs as an empty array
  const [loading, setLoading] = useState(true);

  const renderHeader = (section: { title: string }, _: string, isActive: boolean) => {
    return (
      <View style={[styles.header, isActive ? styles.activeHeader : null]}>
        <Text style={[styles.headerText, isActive ? styles.activeHeaderText : null]}>{section.question}</Text>
        <Ionicons name={isActive ? "chevron-up" : "chevron-down"} size={20} color="#007AFF" />
      </View>
    );
  };

  const renderContent = (section: { content: string }) => {
    return (
      <View style={styles.content}>
        <Text style={styles.contentText}>{section.answer}</Text>
      </View>
    );
  };

  const updateSections = (activeSections: React.SetStateAction<never[]>) => {
    setActiveSections(activeSections);
  };

  const getSettings = async () => {
    try {
      const varriables = await getGlobalVarriables(token as string);

      // Make sure the FAQs exist and are an array
      if (varriables?.faqs && Array.isArray(varriables.faqs)) {
        setFaqs(varriables.faqs);
      } else {
        setFaqs([]); // Ensure it's an empty array if no data is fetched
      }

      setLoading(false);
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Failed to fetch frequently asked questions.",
      });
      setLoading(false);
    }
  };

  useEffect(() => {
    getSettings();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>FAQ</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#007AFF" />
      ) : (
        <Accordion
          sections={faqs} 
          activeSections={activeSections}
          renderHeader={renderHeader}
          renderContent={renderContent}
          onChange={updateSections}
        />
      )}
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
    marginBottom: 30,
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
    marginBottom: 30,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  contentText: {
    fontSize: 14,
    color: '#333',
  },
});

export default Page;
