import { View, Text, FlatList, ActivityIndicator, Image } from "react-native";
import React from "react";
import useTmdb from "../../lib/useTmdb";

const tmdbImageUrl = "https://image.tmdb.org/t/p/original";
const avatarUrl =
  "https://api.dicebear.com/8.x/avataaars/png?top=theCaesarAndSidePart&hairColor=000000&clothing=blazerAndSweater&eyes=happy&eyebrows=default&mouth=smile&skinColor=edb98a";

const Cast = ({ id, getCredits }) => {
  const { data, isLoading } = useTmdb(() => getCredits(id));

  return (
    <FlatList
      data={data?.cast}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View className="items-center w-32 mb-5">
          {item.profile_path ? (
            <Image
              source={{
                uri: `${tmdbImageUrl}${item.profile_path}`,
              }}
              className="w-24 h-24 rounded-full"
              resizeMode="cover"
            />
          ) : (
            <Image
              source={{
                uri: avatarUrl,
              }}
              className="w-24 h-24 rounded-full"
              resizeMode="cover"
            />
          )}
          <Text className="text-white font-psemibold text-lg text-center">
            {item.name}
          </Text>
          <Text className="text-white font-pregular text-center">
            {item.character}
          </Text>
        </View>
      )}
      ListEmptyComponent={isLoading && <ActivityIndicator animating={true} />}
      className="w-full h-[40vh]"
      numColumns={2}
      columnWrapperStyle={{
        gap: 70,
      }}
      contentContainerStyle={{
        alignItems: "center",
      }}
    />
  );
};

export default Cast;
