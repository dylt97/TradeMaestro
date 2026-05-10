import React, { useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet, FlatList } from 'react-native';

const trades = [
  { id: '0', label: 'All' },
  { id: '1', label: 'Lawn Care' },
  { id: '2', label: 'Fencing' },
  { id: '3', label: 'Painting' },
  { id: '4', label: 'Plumbing' },
  { id: '5', label: 'Electrical' },
  { id: '6', label: 'Carpentry' },
  { id: '7', label: 'Roofing' },
  { id: '8', label: 'Handyman' },
  { id: '9', label: 'Pressure Washing' },
  { id: '10', label: 'Other' },
];

const contractors = [
  {
    id: '1',
    name: 'William Wilde',
    trade: 'Fencing',
    city: 'Jellico',
    rating: 5.0,
    reviews: 15,
    image: require('./image.jpeg'),
  },
  {
    id: '2',
    name: 'Carlos Rivera',
    trade: 'Lawn Care',
    city: 'Knoxville',
    rating: 4.8,
    reviews: 32,
    image: require('./image.jpeg'),
  },
  {
    id: '3',
    name: 'Mike Johnson',
    trade: 'Painting',
    city: 'LaFollette',
    rating: 4.6,
    reviews: 21,
    image: require('./image.jpeg'),
  },
];

export default function CustomerSearch({ navigation }) {
  const [selectedTrade, setSelectedTrade] = useState('All');

  const filtered = selectedTrade === 'All'
    ? contractors
    : contractors.filter(c => c.trade === selectedTrade);

  return (
    <View style={styles.container}>

      {/* Header */}
      <Text style={styles.header}>Find a Contractor</Text>

      {/* Filter Pills */}
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

      {/* Contractor Cards */}
      <FlatList
        data={filtered}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.card}
            onPress={() => navigation.navigate('ContractorProfile')}
          >
            <Image source={item.image} style={styles.avatar} />
            <View style={styles.cardInfo}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.trade}>{item.trade}</Text>
              <Text style={styles.city}>📍 {item.city}</Text>
              <Text style={styles.rating}>⭐ {item.rating} ({item.reviews} reviews)</Text>
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
});