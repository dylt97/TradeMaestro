import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { db } from './firebase';
import { collection, getDocs } from 'firebase/firestore';
import { TRADES } from './trades';

const trades = [
  { id: '0', label: 'All' },
  ...TRADE_LABELS.map((label, index) => ({ id: String(index + 1), label })),
  { id: String(TRADE_LABELS.length + 1), label: 'Other' },
];

export default function CustomerSearch({ navigation }) {
  const [selectedTrade, setSelectedTrade] = useState('All');
  const [contractors, setContractors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContractors = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'contractors'));
        const list = [];
        querySnapshot.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setContractors(list);
      } catch (error) {
        console.error('Error fetching contractors:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchContractors();
  }, []);

  const standardTrades = TRADE_LABELS;

  const filtered = selectedTrade === 'All'
    ? contractors
    : selectedTrade === 'Other'
    ? contractors.filter(c => !standardTrades.includes(c.trade))
    : contractors.filter(c => c.trade === selectedTrade);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading contractors...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>

      <Text style={styles.header}>Find a Contractor</Text>

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
          <Text style={styles.emptyText}>No contractors found.</Text>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('ContractorProfile', { contractorId: item.id })}
          >
            <Image source={require('./image.jpeg')} style={styles.avatar} />
            <View style={styles.cardInfo}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.trade}>{item.trade}</Text>
              <Text style={styles.city}>📍 {item.zipCode}</Text>
              <Text style={styles.rating}>⭐ {item.rating || 'New'}</Text>
            </View>
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
    flexDirection: 'row',
    backgroundColor: '#243d5c',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 16,
  },
  cardInfo: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 2,
  },
  trade: {
    fontSize: 14,
    color: '#2e86de',
    marginBottom: 2,
  },
  city: {
    fontSize: 13,
    color: '#a0b4c8',
    marginBottom: 2,
  },
  rating: {
    fontSize: 13,
    color: '#f0c040',
  },
  emptyText: {
    color: '#a0b4c8',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 40,
  },
});