import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, Alert, FlatList, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { supabase } from '@/lib/supabase';
import { useBlursStore } from '@/stores/useBlursStore';
import { useAuthStore } from '@/stores/useAuthStore';
import type { User } from '@/lib/types';

export default function SendScreen() {
  const [friends, setFriends] = useState<User[]>([]);
  const [selectedFriend, setSelectedFriend] = useState<User | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const { sendBlur } = useBlursStore();
  const { user } = useAuthStore();

  useEffect(() => {
    loadFriends();
  }, []);

  const loadFriends = async () => {
    if (!user?.school_id) return;

    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('school_id', user.school_id)
      .neq('id', user.id)
      .limit(50);

    if (!error && data) {
      setFriends(data);
    }
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Please grant photo library access');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 4],
      quality: 0.8,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Please grant camera access');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [3, 4],
      quality: 0.8,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSend = async () => {
    if (!selectedFriend || !image) {
      Alert.alert('Error', 'Please select a friend and a photo');
      return;
    }

    setSending(true);
    try {
      // TODO: Upload image to Supabase Storage
      // For now, using the local URI (this won't work in production)
      await sendBlur(selectedFriend.id, image, message);
      
      Alert.alert('Success', 'Blur sent!');
      setImage(null);
      setMessage('');
      setSelectedFriend(null);
    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally {
      setSending(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="px-6 py-4 bg-white border-b border-gray-200">
        <Text className="text-3xl font-bold text-primary">Send a Blur</Text>
      </View>

      <View className="flex-1 p-6">
        {!image ? (
          <View className="flex-1 justify-center">
            <TouchableOpacity
              className="bg-primary py-6 rounded-2xl mb-4"
              onPress={takePhoto}
            >
              <View className="items-center">
                <Ionicons name="camera" size={32} color="white" />
                <Text className="text-white font-semibold text-lg mt-2">
                  Take Photo
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              className="bg-white border-2 border-primary py-6 rounded-2xl"
              onPress={pickImage}
            >
              <View className="items-center">
                <Ionicons name="images" size={32} color="#8B5CF6" />
                <Text className="text-primary font-semibold text-lg mt-2">
                  Choose from Gallery
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        ) : (
          <View className="flex-1">
            <View className="aspect-[3/4] rounded-2xl overflow-hidden mb-4">
              <Image source={{ uri: image }} className="w-full h-full" />
              <TouchableOpacity
                className="absolute top-4 right-4 bg-black/50 p-2 rounded-full"
                onPress={() => setImage(null)}
              >
                <Ionicons name="close" size={24} color="white" />
              </TouchableOpacity>
            </View>

            <TextInput
              className="bg-white border border-gray-300 rounded-xl px-4 py-3 mb-4"
              placeholder="Add a message (optional)"
              value={message}
              onChangeText={setMessage}
              multiline
            />

            <Text className="text-lg font-semibold mb-3">Send to:</Text>
            
            <FlatList
              data={friends}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => (
                <TouchableOpacity
                  className={`mr-4 items-center ${selectedFriend?.id === item.id ? 'opacity-100' : 'opacity-50'}`}
                  onPress={() => setSelectedFriend(item)}
                >
                  <View className={`p-1 rounded-full ${selectedFriend?.id === item.id ? 'bg-primary' : 'bg-transparent'}`}>
                    <Image
                      source={{ uri: item.avatar_url || 'https://via.placeholder.com/60' }}
                      className="w-16 h-16 rounded-full"
                    />
                  </View>
                  <Text className="text-sm mt-2 max-w-[70px] text-center" numberOfLines={1}>
                    {item.username}
                  </Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item.id}
              ListEmptyComponent={
                <Text className="text-gray-500">No friends found. Add friends to send blurs!</Text>
              }
            />

            <TouchableOpacity
              className="bg-primary py-4 rounded-xl mt-4"
              onPress={handleSend}
              disabled={sending || !selectedFriend}
            >
              <Text className="text-white text-center font-semibold text-base">
                {sending ? 'Sending...' : 'Send Blur'}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}
