import { View, Text, FlatList, ActivityIndicator } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import useTmdb from "../../lib/useTmdb";
import { getUserWatchList, removeFromWatchList } from "../../lib/supabase";
import { useAuthContext } from "../../context/AuthContext";
import CoverComponent from "../../components/ui/CoverComponent";

const Watchlist = () => {
  const { user } = useAuthContext();
  const { data, isLoading, refetch } = useTmdb(() =>
    getUserWatchList(user?.user)
  );

  const isWatchListed = (item) => data.find((w) => w.details.id === item.id);

  const remove = async (item) => {
    await removeFromWatchList(user?.user, item);
    refetch();
  };

  return (
    <SafeAreaView className="bg-primary w-full h-full items-center">
      <Text className="font-psemibold text-3xl text-white mt-5">Watchlist</Text>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CoverComponent
            item={item.details}
            showRanking={false}
            watchlisted={isWatchListed(item.details)}
            removeFromWatchList={() => remove(item)}
            imageStyles="w-[115px] h-[160px] mb-5"
          />
        )}
        ListEmptyComponent={() => (
          <View className="items-center justify-center">
            {isLoading ? (
              <ActivityIndicator size="large" />
            ) : (
              <Text className="text-white font-pmedium text-xl">
                Add movies to your watchlist
              </Text>
            )}
          </View>
        )}
        numColumns={3}
        columnWrapperStyle={{
          gap: 10,
        }}
        className="mt-5"
      />
    </SafeAreaView>
  );
};

export default Watchlist;
