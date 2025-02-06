import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { auth, db } from '../firebaseConfig';
import { collection, query, where, onSnapshot } from 'firebase/firestore';

export default function HomeScreen({ navigation }) {
  const [dives, setDives] = useState([]);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    const q = query(
      collection(db, 'dives'),
      where('userId', '==', user.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      let diveList = [];
      snapshot.forEach((doc) => {
        diveList.push({ id: doc.id, ...doc.data() });
      });
      setDives(diveList);
    });

    return () => unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Dive Logs</Text>
      <FlatList
        data={dives}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.diveItem}>
            <Text>{item.diveSite} - {item.date}</Text>
            <Text>Materials: {item.materialsUsed?.join(', ')}</Text>
          </TouchableOpacity>
        )}
      />
      <Button
        title="Log a New Dive"
        onPress={() => navigation.navigate('DiveForm')}
      />
      <Button
        title="Profile"
        onPress={() => navigation.navigate('Profile')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold', marginVertical: 16 },
  diveItem: {
    marginBottom: 12,
    padding: 12,
    backgroundColor: '#eee',
    borderRadius: 8,
  },
});
