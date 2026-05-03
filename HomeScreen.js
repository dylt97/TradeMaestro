import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Trade Maestro</Text>
      <Text style={styles.subtitle}>Find trusted local trades</Text>
      
      <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.navigate('ContractorSignup')}
      >
        <Text style={styles.buttonText}>I'm a Contractor</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.navigate('CustomerSignup')}
      >
        <Text style={styles.buttonText}>I'm a Customer</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a2f4e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#a0b4c8',
    marginBottom: 60,
  },
  button: {
    backgroundColor: '#2e86de',
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginBottom: 20,
    width: 260,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
});