import { useEffect, useState } from 'react';
import { View, Text, FlatList, RefreshControl, Image, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { useBlursStore } from '@/stores/useBlursStore';
import { useAuthStore } from '@/stores/useAuthStore';
import type { Blur } from '@/lib/types';

export default function FeedScreen() {
  const { blurs, loading, fetchBlurs, unlockBlur } = useBlursStore();
  const { user } = useAuthStore();
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchBlurs();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchBlurs();
    setRefreshing(false);
  };

  const handleUnlock = async (blur: Blur) => {
    if (blur.unlocked) return;

    // Check if user has enough coins (50 coins to unlock)
    if ((user?.coins || 0) < 50) {
      Alert.alert(
        'Not Enough Coins',
        'You need 50 coins to unlock this blur. Invite friends to earn more coins!',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Invite Friends', onPress: () => {/* TODO: Open invite modal */} },
        ]
      );
      return;
    }

    try {
      await unlockBlur(blur.id);
      
      // Deduct coins (TODO: move to backend)
      // await useAuthStore.getState().updateUser({ coins: (user?.coins || 0) - 50 });
      
      Alert.alert('Unlocked!', 'You can now see who sent you this blur');
    } catch (error: any) {
      Alert.alert('Error', error.message);
    }
  };

  const renderBlur = ({ item }: { item: Blur }) => (
    <TouchableOpacity
      className="bg-white rounded-2xl mb-4 overflow-hidden shadow-sm"
      onPress={() => handleUnlock(item)}
      activeOpacity={0.9}
    >
      <View className="relative aspect-[3/4] bg-gray-100">
        <Image
          source={{ uri: item.image_url }}
          className="w-full h-full"
          resizeMode="cover"
        />
        
        {!item.unlocked && (
          <BlurView intensity={80} className="absolute inset-0" tint="light">
            <View className="flex-1 items-center justify-center">
              <View className="bg-white/90 px-6 py-4 rounded-2xl items-center">
                <Ionicons name="lock-closed" size={32} color="#8B5CF6" />
                <Text className="text-lg font-semibold mt-2 text-gray-800">
                  Tap to Unlock
                </Text>
                <Text className="text-sm text-gray-600 mt-1">
                  50 coins or invite 2 friends
                </Text>
              </View>
            </View>
          </BlurView>
        )}
      </View>

      <View className="p-4">
        {item.unlocked ? (
          <View className="flex-row items-center">
            <Image
              source={{ uri: item.sender?.avatar_url || 'https://via.placeholder.com/40' }}
              className="w-10 h-10 rounded-full mr-3"
            />
            <View>
              <Text className="font-semibold text-base">{item.sender?.username}</Text>
              <Text className="text-sm text-gray-500">
                {new Date(item.created_at).toLocaleDateString()}
              </Text>
            </View>
          </View>
        ) : (
          <View className="flex-row items-center">
            <View className="w-10 h-10 rounded-full bg-gray-200 mr-3" />
            <View>
              <Text className="font-semibold text-base text-gray-400">Someone</Text>
              <Text className="text-sm text-gray-500">
                sent you a blur
              </Text>
            </View>
          </View>
        )}

        {item.message && item.unlocked && (
          <Text className="mt-3 text-gray-700">{item.message}</Text>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="px-6 py-4 bg-white border-b border-gray-200">
        <Text className="text-3xl font-bold text-primary">Blurs</Text>
        <Text className="text-gray-600 mt-1">
          {blurs.filter(b => !b.unlocked).length} waiting to be unlocked
        </Text>
      </View>

      <FlatList
        data={blurs}
        renderItem={renderBlur}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <View className="items-center justify-center py-12">
            <Ionicons name="image-outline" size={64} color="#D1D5DB" />
            <Text className="text-gray-500 text-lg mt-4">No blurs yet</Text>
            <Text className="text-gray-400 text-center mt-2 px-8">
              Ask your friends to send you blurs!
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}
