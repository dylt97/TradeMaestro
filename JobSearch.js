import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, FlatList, Alert } from 'react-native';
import { db, auth } from './firebase';
import { collection, getDocs } from 'firebase/firestore';
import { TRADE_LABELS } from './trades';

const trades = [
  { id: '0', label: 'All' },
  ...TRADE_LABELS.map((label, index) => ({ id: String(index + 1), label })),
  { id: String(TRADE_LABELS.length + 1), label: 'Other' },
];

const standardTrades = TRADE_LABELS;

export default function JobSearch({ navigation }) {
  const [selectedTrade, setSelectedTrade] = useState('All');
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'jobs'));
        const list = [];
        querySnapshot.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setJobs(list);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const filtered = selectedTrade === 'All'
    ? jobs
    : selectedTrade === 'Other'
    ? jobs.filter(j => !standardTrades.includes(j.trade))
    : jobs.filter(j => j.trade === selectedTrade);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading jobs...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>

      <Text style={styles.header}>Available Jobs</Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.pillContainer}
      >
        {trades.map(trade => (
          <TouchableOpacity
            key={trade.id}
            style={[
              styles.pill,
              selectedTrade === trade.label && styles.pillActive
            ]}
            onPress={() => setSelectedTrade(trade.label)}
          >
            <Text style={[
              styles.pillText,
              selectedTrade === trade.label && styles.pillTextActive
            ]}>
              {trade.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <FlatList
        data={filtered}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No jobs found.</Text>
        }
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.trade}>{item.trade}</Text>
              <Text style={styles.postedAgo}>
                {item.createdAt?.seconds
                  ? new Date(item.createdAt.seconds * 1000).toLocaleDateString()
                  : 'Recently'}
              </Text>
            </View>
            <Text style={styles.description} numberOfLines={2}>
              {item.description}
            </Text>
            <Text style={styles.location}>📍 {item.address}, {item.zipCode}</Text>

            <TouchableOpacity style={styles.applyButton}>
              <Text style={styles.applyButtonText}>I Can Do This Job</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        )}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a2f4e',
    paddingTop: 50,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: '#1a2f4e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    color: '#a0b4c8',
    fontSize: 16,
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#ffffff',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  pillContainer: {
    paddingHorizontal: 16,
    marginBottom: 16,
    flexGrow: 0,
  },
  pill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#2e86de',
    marginRight: 8,
  },
  pillActive: {
    backgroundColor: '#2e86de',
  },
  pillText: {
    color: '#2e86de',
    fontSize: 14,
  },
  pillTextActive: {
    color: '#ffffff',
  },
  list: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#243d5c',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  trade: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2e86de',
  },
  postedAgo: {
    fontSize: 12,
    color: '#a0b4c8',
  },
  description: {
    fontSize: 14,
    color: '#ffffff',
    marginBottom: 8,
    lineHeight: 20,
  },
  location: {
    fontSize: 13,
    color: '#a0b4c8',
    marginBottom: 12,
  },
  applyButton: {
    backgroundColor: '#2e86de',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  applyButtonText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '600',
  },
});