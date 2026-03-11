import { View, Text, TouchableOpacity, Image, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useAuthStore } from '@/stores/useAuthStore';

export default function ProfileScreen() {
  const { user, signOut } = useAuthStore();

  const handleSignOut = async () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Sign Out', style: 'destructive', onPress: async () => await signOut() },
      ]
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="px-6 py-4 bg-white border-b border-gray-200">
        <Text className="text-3xl font-bold text-primary">Profile</Text>
      </View>

      <View className="items-center pt-8 px-6">
        <Image
          source={{ uri: user?.avatar_url || 'https://via.placeholder.com/120' }}
          className="w-32 h-32 rounded-full border-4 border-primary"
        />
        
        <Text className="text-2xl font-bold mt-4">{user?.username}</Text>
        
        <View className="flex-row items-center mt-2 bg-accent/10 px-4 py-2 rounded-full">
          <Ionicons name="diamond" size={20} color="#F59E0B" />
          <Text className="text-accent font-semibold ml-2 text-lg">
            {user?.coins || 0} coins
          </Text>
        </View>

        {user?.is_plus && (
          <View className="bg-primary/10 px-4 py-2 rounded-full mt-3">
            <Text className="text-primary font-semibold">Blur Plus ⭐</Text>
          </View>
        )}
      </View>

      <View className="mt-8 mx-6">
        <View className="bg-white rounded-2xl p-6 shadow-sm">
          <Text className="text-lg font-semibold mb-4">Stats</Text>
          
          <View className="flex-row justify-between mb-3">
            <Text className="text-gray-600">Blurs Sent</Text>
            <Text className="font-semibold">0</Text>
          </View>
          
          <View className="flex-row justify-between mb-3">
            <Text className="text-gray-600">Blurs Received</Text>
            <Text className="font-semibold">0</Text>
          </View>
          
          <View className="flex-row justify-between mb-3">
            <Text className="text-gray-600">Accuracy Rate</Text>
            <Text className="font-semibold">0%</Text>
          </View>
          
          <View className="flex-row justify-between">
            <Text className="text-gray-600">Streak</Text>
            <Text className="font-semibold">0 days 🔥</Text>
          </View>
        </View>

        <TouchableOpacity
          className="bg-white rounded-2xl p-4 mt-4 shadow-sm flex-row items-center justify-between"
          onPress={() => Alert.alert('Coming Soon', 'Leaderboard feature is under development')}
        >
          <View className="flex-row items-center">
            <Ionicons name="trophy" size={24} color="#8B5CF6" />
            <Text className="ml-3 font-semibold text-base">View Leaderboard</Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color="#9CA3AF" />
        </TouchableOpacity>

        <TouchableOpacity
          className="bg-white rounded-2xl p-4 mt-4 shadow-sm flex-row items-center justify-between"
          onPress={() => Alert.alert('Coming Soon', 'Settings feature is under development')}
        >
          <View className="flex-row items-center">
            <Ionicons name="settings" size={24} color="#8B5CF6" />
            <Text className="ml-3 font-semibold text-base">Settings</Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color="#9CA3AF" />
        </TouchableOpacity>

        <TouchableOpacity
          className="bg-red-50 border border-red-200 rounded-2xl p-4 mt-6 flex-row items-center justify-center"
          onPress={handleSignOut}
        >
          <Ionicons name="log-out-outline" size={24} color="#DC2626" />
          <Text className="ml-3 font-semibold text-base text-red-600">Sign Out</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
