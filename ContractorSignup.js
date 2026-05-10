import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';

export default function ContractorSignup({ navigation }) {
  const [name, setName] = useState('');
  const [trade, setTrade] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [otherTrade, setOtherTrade] = useState('');

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Contractor Profile</Text>
      <Text style={styles.subtitle}>Tell us about yourself</Text>

      <TextInput
        label="Full Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
        mode="outlined"
      />

      <View style={styles.pickerContainer}>
        <Picker
            selectedValue={trade}
            onValueChange={(itemValue) => setTrade(itemValue)}
            style={styles.picker}
            dropdownIconColor="#ffffff"
        >
            <Picker.Item label="Select Your Trade..." value="" />
            <Picker.Item label="Landscaping / Lawn Care" value="landscaping" />
            <Picker.Item label="Fencing" value="fencing" />
            <Picker.Item label="Painting" value="painting" />
            <Picker.Item label="Plumbing" value="plumbing" />
            <Picker.Item label="Electrical" value="electrical" />
            <Picker.Item label="Carpentry" value="carpentry" />
            <Picker.Item label="Roofing" value="roofing" />
            <Picker.Item label="HVAC" value="hvac" />
            <Picker.Item label="Pressure Washing" value="pressure_washing" />
            <Picker.Item label="Handyman" value="handyman" />
            <Picker.Item label="Concrete / Masonry" value="concrete" />
            <Picker.Item label="Tree Service" value="tree_service" />
            <Picker.Item label="Pool Service" value="pool_service" />
            <Picker.Item label="Cleaning Service" value="cleaning" />
            <Picker.Item label="Other" value="other" />
        </Picker>
      </View>

            {trade === 'other' && (
                <TextInput
                    label="Please specify your trade"
                    value={otherTrade}
                    onChangeText={setOtherTrade}
                    style={styles.input}
                    mode="outlined"
                />
                )}

      <TextInput
        label="Email Address"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        mode="outlined"
        keyboardType="email-address"
      />

      <TextInput
        label="Zip Code"
        value={city}
        onChangeText={setCity}
        style={styles.input}
        mode="outlined"
        keyboardType="numeric"
        maxLength={5}
      />

      <TouchableOpacity 
         style={styles.button}
         onPress={() => navigation.navigate('ContractorTabs')}
      >
        <Text style={styles.buttonText}>Create Profile</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#1a2f4e',
    flexGrow: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
    marginTop: 40,
  },
  subtitle: {
    fontSize: 16,
    color: '#a0b4c8',
    marginBottom: 30,
  },
  input: {
    marginBottom: 16,
    backgroundColor: '#ffffff',
  },
  button: {
    backgroundColor: '#2e86de',
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
  pickerContainer: {
  backgroundColor: '#ffffff',
  borderRadius: 4,
  marginBottom: 16,
  },
  picker: {
    color: '#000000',
  },
});