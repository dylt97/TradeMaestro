import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';
import { Divider } from 'react-native-paper';
import { auth, db } from './firebase';
import { doc, getDoc } from 'firebase/firestore';

export default function CustomerProfile({ navigation }) {
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const docRef = doc(db, 'customers', user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setCustomer(docSnap.data());
          }
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading profile...</Text>
      </View>
    );
  }

  if (!customer) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Profile not found.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>

      {/* Header Row */}
      <View style={styles.header}>
        <Image
          source={require('./image.jpeg')}
          style={styles.avatar}
        />
        <View style={styles.stats}>
          <Text style={styles.zipCode}>📍 {customer.zipCode}</Text>
          <Text style={styles.memberSince}>Member since {new Date(customer.createdAt?.seconds * 1000).getFullYear()}</Text>
        </View>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.name}>{customer.name}</Text>
        <Text style={styles.email}>{customer.email}</Text>

        <Divider style={styles.divider} />

        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{customer.jobsPosted || 0}</Text>
            <Text style={styles.statLabel}>Jobs Posted</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{customer.jobsCompleted || 0}</Text>
            <Text style={styles.statLabel}>Completed</Text>
          </View>
        </View>

        <Divider style={styles.divider} />

        <Text style={styles.sectionTitle}>Recent Activity</Text>
        <Text style={styles.emptyState}>No recent activity yet.</Text>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a2f4e',
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
  zipCode: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  memberSince: {
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
  email: {
    fontSize: 14,
    color: '#a0b4c8',
    marginBottom: 16,
  },
  divider: {
    backgroundColor: '#2e4a6e',
    marginVertical: 16,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 8,
  },
  statBox: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2e86de',
  },
  statLabel: {
    fontSize: 13,
    color: '#a0b4c8',
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 10,
  },
  emptyState: {
    fontSize: 14,
    color: '#a0b4c8',
    fontStyle: 'italic',
  },
});