import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { TextInput } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import { auth, db } from './firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

export default function ContractorSignup({ navigation }) {
  const [name, setName] = useState('');
  const [trade, setTrade] = useState('');
  const [otherTrade, setOtherTrade] = useState('');
  const [email, setEmail] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignup = async () => {
    if (!name || !trade || !email || !zipCode || !password) {
      Alert.alert('Missing Fields', 'Please fill out all required fields.');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Password Mismatch', 'Passwords do not match.');
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, 'contractors', user.uid), {
        name: name,
        trade: trade === 'other' ? otherTrade : trade,
        email: email,
        zipCode: zipCode,
        role: 'contractor',
        createdAt: new Date(),
      });

      navigation.navigate('ContractorTabs');
    } catch (error) {
      let message = 'Something went wrong. Please try again.';
      if (error.code === 'auth/email-already-in-use') {
        message = 'An account with this email already exists.';
      } else if (error.code === 'auth/invalid-email') {
        message = 'Please enter a valid email address.';
      } else if (error.code === 'auth/weak-password') {
        message = 'Password must be at least 6 characters.';
      }
      Alert.alert('Signup Failed', message);
    }
  };

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
        value={zipCode}
        onChangeText={setZipCode}
        style={styles.input}
        mode="outlined"
        keyboardType="numeric"
        maxLength={5}
      />

      <TextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        mode="outlined"
        secureTextEntry
      />

      <TextInput
        label="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        style={styles.input}
        mode="outlined"
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleSignup}>
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
  pickerContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 4,
    marginBottom: 16,
  },
  picker: {
    color: '#000000',
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
});