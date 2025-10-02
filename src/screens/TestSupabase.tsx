import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { supabase } from '../services/supabase';

export default function TestSupabase() {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase.from('users').select('id, username, email, created_at');
        if (error) throw error;
        setUsers(data || []);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <ActivityIndicator size="large" color="#228B22" style={styles.loader} />;
  if (error) return <Text style={styles.error}>❌ Error: {error}</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Supabase Users Table</Text>
      {users.length === 0 ? (
        <Text>No users found.</Text>
      ) : (
        users.map((u) => (
          <Text key={u.id} style={styles.user}>
            {u.username ?? '(no username)'} — {u.email}
          </Text>
        ))
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  user: { marginVertical: 5, fontSize: 16 },
  error: { color: 'red', fontSize: 16 },
});
