import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuthContext } from "../../context/AuthContext";
import Avatar from "../../components/ui/Avatar";
import { logout } from "../../lib/supabase";
import { router } from "expo-router";

const Profile = () => {
  const { user, setUser, setIsLoggedIn } = useAuthContext();

  const signOut = async () => {
    await logout();

    setUser(null);
    setIsLoggedIn(false);

    router.replace("/");
  };

  return (
    <SafeAreaView className="bg-primary w-full h-full">
      <View className="w-full h-full items-center justify-center">
        <Avatar seed={user?.user?.email} avatarStyle="w-14 h-14 mb-3" />
        <Text className="text-white font-psemibold text-2xl">
          {user?.userDetails?.username}
        </Text>
        <Text className="text-white font-pregular text-lg">
          {user?.user?.email}
        </Text>
        <TouchableOpacity
          onPress={signOut}
          className="bg-blue-500 px-10 py-3 mt-3 rounded-lg"
        >
          <Text className="text-white font-pregular text-lg">Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Profile;
