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
            rating: 5.0,
            reviews: 15,
            image: 'image.jpg',
        };

return (
  <ScrollView style={styles.container}>
    
    {/* Header Row */}
    <View style={styles.header}>
      <Image 
        source={{ uri: contractor.image }}
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
        backgroundColor: '#1a2f4e',
    }
});
