import { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Pressable,
  StyleSheet,
  ActivityIndicator,
  RefreshControl, // EKLENDİ
} from 'react-native';
import { api } from '../api/client';

export default function ProfilesListScreen({ navigation }) {
  const [profiles, setProfiles] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [refreshing, setRefreshing] = useState(false); // EKLENDİ

  const fetchProfiles = async (isRefresh = false) => {
    if (loading || (!hasMore && !isRefresh)) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const pageToFetch = isRefresh ? 1 : page;
      const res = await api.get(`/profiles?page=${pageToFetch}&limit=10`);
      
      if (res.data.length === 0) {
        setHasMore(false);
      } else {
        if (isRefresh) {
            setProfiles(res.data);
            setPage(2);
        } else {
            setProfiles(prev => [...prev, ...res.data]);
            setPage(prev => prev + 1);
        }
      }
    } catch (err) {
      setError(err.message || 'Profiller yüklenemedi.'); // Güncellendi
      console.error(err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // EKLENDİ: Yenileme fonksiyonu
  const onRefresh = async () => {
    setRefreshing(true);
    setHasMore(true);
    await fetchProfiles(true);
  };

  useEffect(() => {
    fetchProfiles();
  }, []);

  const renderItem = ({ item }) => (
    <Pressable
      style={styles.card}
      onPress={() => navigation.navigate('ProfileDetail', { id: item.id })}
    >
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.email}>{item.email}</Text>
    </Pressable>
  );

  const renderFooter = () => {
    if (!loading) return null;
    return (
      <View style={styles.footer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  };

  const renderEmpty = () => { // EKLENDİ
      if (loading) return null;
      return (
          <View style={styles.centerContainer}>
              <Text style={styles.errorText}>Profil bulunamadı</Text>
          </View>
      );
  };

  // İlk yükleme
  if (loading && profiles.length === 0 && !refreshing) {
      return (
          <View style={styles.centerContainer}>
              <ActivityIndicator size="large" color="#007AFF" />
              <Text style={{marginTop: 10}}>Profiller yükleniyor...</Text>
          </View>
      );
  }

  if (error && profiles.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <Pressable style={styles.retryButton} onPress={() => fetchProfiles(true)}>
          <Text style={styles.retryText}>Tekrar Dene</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={profiles}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        onEndReached={() => fetchProfiles(false)}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={renderEmpty} // EKLENDİ
        contentContainerStyle={styles.listContent}
        refreshControl={ // EKLENDİ
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  listContent: { padding: 16, flexGrow: 1 },
  card: {
    backgroundColor: 'white',
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  name: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 4 },
  email: { fontSize: 14, color: '#666' },
  footer: { paddingVertical: 20, alignItems: 'center' },
  centerContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  errorText: { fontSize: 16, color: '#d32f2f', textAlign: 'center', marginBottom: 16 },
  retryButton: { backgroundColor: '#007AFF', paddingHorizontal: 24, paddingVertical: 12, borderRadius: 8 },
  retryText: { color: 'white', fontSize: 16, fontWeight: '600' },
});