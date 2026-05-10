import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { TextInput } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import { TRADES } from './trades';

export default function PostJob({ navigation }) {
  const [trade, setTrade] = useState('');
  const [otherTrade, setOtherTrade] = useState('');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [photo, setPhoto] = useState(null);

  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Permission needed', 'Please allow access to your photo library.');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.7,
    });
    if (!result.canceled) {
      setPhoto(result.assets[0].uri);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Post a Job</Text>
      <Text style={styles.subtitle}>Tell us what you need done</Text>

      {/* Trade Picker */}
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={trade}
          onValueChange={(itemValue) => setTrade(itemValue)}
          style={styles.picker}
          dropdownIconColor="#ffffff"
        >
          {TRADES.map(t => (
            <Picker.Item key={t.value} label={t.label} value={t.value} />
          ))}
        </Picker>
      </View>

      {trade === 'other' && (
        <TextInput
          label="Please specify"
          value={otherTrade}
          onChangeText={setOtherTrade}
          style={styles.input}
          mode="outlined"
        />
      )}

      <TextInput
        label="Address"
        value={address}
        onChangeText={setAddress}
        style={styles.input}
        mode="outlined"
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
        label="Describe the job"
        value={description}
        onChangeText={setDescription}
        style={styles.input}
        mode="outlined"
        multiline
        numberOfLines={4}
      />

      {/* Photo Upload */}
      <TouchableOpacity style={styles.photoButton} onPress={pickImage}>
        <Text style={styles.photoButtonText}>
          {photo ? 'Change Photo' : '📷 Add a Photo (Optional)'}
        </Text>
      </TouchableOpacity>

      {photo && (
        <Image source={{ uri: photo }} style={styles.preview} />
      )}

      <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.navigate('CustomerSearch')}
      >
        <Text style={styles.buttonText}>Post Job</Text>
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
    marginBottom: 24,
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
  photoButton: {
    borderWidth: 1,
    borderColor: '#2e86de',
    borderStyle: 'dashed',
    borderRadius: 10,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 16,
  },
  photoButtonText: {
    color: '#2e86de',
    fontSize: 16,
  },
  preview: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 16,
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