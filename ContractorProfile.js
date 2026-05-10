import React, {useState, useEffect} from 'react';
import {View, Text, Image, ScrollView, TouchableOpacity, StyleSheet} from 'react-native';
import { Divider } from 'react-native-paper';

export default function ContractorProfile ({navigation}) {

        //Todo: replace this dummy data with Firebase fetch data
        const contractor = {
            name: 'William Wilde',
            trade: 'Fencing',
            city: 'Jellico',
            zipcode: '37762',
            bio: 'Professional Fencer with 20 years experience. Commercial and Residential. Free estimates within 40 miles.',
            rating: 4.9,
            reviews: 15,
            image: require('./image.jpeg'),
        };

return (
  <ScrollView style={styles.container}>
    
    {/* Header Row */}
    <View style={styles.header}>
      <Image 
        source={contractor.image}
        style={styles.avatar}
      />
      <View style={styles.stats}>
        <Text style={styles.rating}>⭐ {contractor.rating}</Text>
        <Text style={styles.reviews}>{contractor.reviews} reviews</Text>
      </View>
    </View>

    {/* Content */}
    <View style={styles.content}>
      <Text style={styles.name}>{contractor.name}</Text>
      <Text style={styles.trade}>{contractor.trade}</Text>
      <Text style={styles.city}>📍 {contractor.city}</Text>
      <Divider style={styles.divider}/>
      <Text style={styles.bio}>{contractor.bio}</Text>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Request Job</Text>
      </TouchableOpacity>
    </View>

  </ScrollView>
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a2f4e',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    paddingTop: 50,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 3,
    borderColor: '#2e86de',
  },
  stats: {
    marginLeft: 20,
  },
  rating: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  reviews: {
    fontSize: 14,
    color: '#a0b4c8',
    marginTop: 4,
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  name: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  trade: {
    fontSize: 16,
    color: '#2e86de',
    marginBottom: 4,
  },
  city: {
    fontSize: 14,
    color: '#a0b4c8',
    marginBottom: 16,
  },
  divider: {
    backgroundColor: '#2e4a6e',
    marginVertical: 16,
  },
  bio: {
    fontSize: 15,
    color: '#d0dce8',
    lineHeight: 24,
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#2e86de',
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
});