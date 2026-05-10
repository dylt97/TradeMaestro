import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, FlatList } from 'react-native';

const jobs = [
  {
    id: '1',
    trade: 'Fencing',
    description: 'Need a 6ft wooden privacy fence installed along the back of my property. About 100 feet.',
    address: '123 Oak Street',
    city: 'Jellico',
    zipCode: '37762',
    postedBy: 'John Smith',
    postedAgo: '2 hours ago',
  },
  {
    id: '2',
    trade: 'Lawn Care',
    description: 'Weekly lawn mowing and edging for a medium sized yard. Looking for ongoing service.',
    address: '456 Maple Ave',
    city: 'Knoxville',
    zipCode: '37902',
    postedBy: 'Sarah Williams',
    postedAgo: '5 hours ago',
  },
  {
    id: '3',
    trade: 'Painting',
    description: 'Interior painting for living room and kitchen. Walls only, no ceilings.',
    address: '789 Pine Road',
    city: 'LaFollette',
    zipCode: '37766',
    postedBy: 'Mike Davis',
    postedAgo: '1 day ago',
  },
  {
    id: '4',
    trade: 'Pressure Washing',
    description: 'Driveway and back patio need pressure washing. Concrete surfaces only.',
    address: '321 Elm Street',
    city: 'Knoxville',
    zipCode: '37901',
    postedBy: 'Lisa Brown',
    postedAgo: '1 day ago',
  },
];

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
];

export default function JobSearch({ navigation }) {
  const [selectedTrade, setSelectedTrade] = useState('All');

  const filtered = selectedTrade === 'All'
    ? jobs
    : jobs.filter(j => j.trade === selectedTrade);

  return (
    <View style={styles.container}>

      <Text style={styles.header}>Available Jobs</Text>

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

      {/* Job Cards */}
      <FlatList
        data={filtered}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.trade}>{item.trade}</Text>
              <Text style={styles.postedAgo}>{item.postedAgo}</Text>
            </View>
            <Text style={styles.description} numberOfLines={2}>
              {item.description}
            </Text>
            <Text style={styles.location}>📍 {item.city}, {item.zipCode}</Text>
            <Text style={styles.postedBy}>Posted by {item.postedBy}</Text>
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
    marginBottom: 4,
  },
  postedBy: {
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