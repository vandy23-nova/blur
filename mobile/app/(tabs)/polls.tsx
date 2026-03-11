import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export default function PollsScreen() {
  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="px-6 py-4 bg-white border-b border-gray-200">
        <Text className="text-3xl font-bold text-primary">Polls</Text>
      </View>

      <View className="flex-1 items-center justify-center px-8">
        <Ionicons name="bar-chart-outline" size={64} color="#D1D5DB" />
        <Text className="text-gray-500 text-lg mt-4 text-center">
          Polls Coming Soon
        </Text>
        <Text className="text-gray-400 text-center mt-2">
          Vote on fun questions about your friends and see who thinks you're the coolest!
        </Text>
      </View>
    </SafeAreaView>
  );
}
