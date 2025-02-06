import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../firebaseConfig';

export default function ProfileScreen() {
  const [userData, setUserData] = useState(null);
  const [totalDives, setTotalDives] = useState('');
  const [certifications, setCertifications] = useState('');
  const [insuranceName, setInsuranceName] = useState('');
  const [insuranceNumber, setInsuranceNumber] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const userDoc = doc(db, 'users', user.uid);
      const snapshot = await getDoc(userDoc);
      if (snapshot.exists()) {
        const data = snapshot.data();
        setUserData(data);
        setTotalDives(String(data.totalDives || 0));
        setCertifications(data.certifications || '');
        setInsuranceName(data.insuranceName || '');
        setInsuranceNumber(data.insuranceNumber || '');
      }
    };

    fetchUserData();
  }, []);

  const handleSave = async () => {
    try {
      const user = auth.currentUser;
      if (!user) return;

      const userDoc = doc(db, 'users', user.uid);
      await updateDoc(userDoc, {
        totalDives: parseInt(totalDives) || 0,
        certifications,
        insuranceName,
        insuranceNumber,
      });
      alert('Profile updated');
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  if (!userData) {
    return (
      <View style={styles.container}>
        <Text>Loading profile...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>

      <Text>Name: {userData.name}</Text>
      <Text>Email: {userData.email}</Text>

      <TextInput
        style={styles.input}
        value={totalDives}
        onChangeText={setTotalDives}
        keyboardType="numeric"
        placeholder="Total Dives"
      />
      <TextInput
        style={styles.input}
        value={certifications}
        onChangeText={setCertifications}
        placeholder="Certifications"
      />
      <TextInput
        style={styles.input}
        value={insuranceName}
        onChangeText={setInsuranceName}
        placeholder="Insurance Name"
      />
      <TextInput
        style={styles.input}
        value={insuranceNumber}
        onChangeText={setInsuranceNumber}
        placeholder="Insurance Number"
      />

      <Button title="Save" onPress={handleSave} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: {
    fontSize: 22, fontWeight: 'bold', marginBottom: 16,
  },
  input: {
    borderWidth: 1, borderColor: '#ccc', padding: 8, marginBottom: 12,
  },
});
