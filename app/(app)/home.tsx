import { View, Text, TouchableOpacity, RefreshControl } from "react-native";
import { useCallback, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-virtualized-view";
import { FontAwesome } from "@expo/vector-icons";
import { useAuthContext } from "../../context/AuthContext";
import { router } from "expo-router";
import { logout } from "../../lib/supabase";
import { getPopular } from "../../lib/tmdb";
import SearchField from "../../components/ui/SearchField";
import Popular from "../../components/tabs/Popular";
import NowPlaying from "../../components/tabs/NowPlaying";
import Upcoming from "../../components/tabs/Upcoming";
import TabComponent from "../../components/ui/TabComponent";
import useTmdb from "../../lib/useTmdb";

const HomeTabs = [
  {
    index: 0,
    name: "Now Playing",
    component: NowPlaying,
  },
  {
    index: 1,
    name: "Upcoming",
    component: Upcoming,
  },
];

const Home = () => {
  const { setUser, setIsLoggedIn } = useAuthContext();
  const { refetch } = useTmdb(getPopular);
  const [refreshing, setRefreshing] = useState(false);

  const signOut = async () => {
    await logout();

    setUser(null);
    setIsLoggedIn(false);

    router.replace("/");
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }, []);

  return (
    <SafeAreaView className="w-full h-screen bg-primary px-5 pt-3 pb-10">
      <ScrollView
        className="w-full h-full"
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View className="w-full">
          <View className="flex-row justify-between">
            <Text className="font-psemibold text-white text-2xl">
              What do you want to watch?
            </Text>
            <TouchableOpacity onPress={signOut}>
              <FontAwesome name="sign-out" size={25} color="white" />
            </TouchableOpacity>
          </View>
          <SearchField placeholder="Search for a movie..." otherStyles="mt-5" />
        </View>
        <View className="my-5">
          <Popular />
        </View>
        <TabComponent tabs={HomeTabs} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
