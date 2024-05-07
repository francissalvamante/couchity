import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import React from "react";
import { router, useLocalSearchParams } from "expo-router";
import useTmdb from "../../../lib/useTmdb";
import { searchMovies } from "../../../lib/tmdb";
import { SafeAreaView } from "react-native-safe-area-context";
import { BlurView } from "expo-blur";
import images from "../../../constants/images";

const tmdbImageUrl = "https://image.tmdb.org/t/p/original";

const Search = () => {
  const { query } = useLocalSearchParams();
  const { data, refetch } = useTmdb(() => searchMovies(query));

  return (
    <SafeAreaView className="bg-primary w-full h-full">
      <View className="w-full items-center mb-10">
        <Text className="text-white font-pbold text-2xl">Movie Search</Text>
      </View>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            className="w-full px-5"
            onPress={() => router.push(`movie/${item.id}`)}
          >
            <ImageBackground
              source={
                item.backdrop_path
                  ? {
                      uri: `${tmdbImageUrl}${item.backdrop_path}`,
                    }
                  : images.noImgAvailable
              }
              className="h-40 w-full items-center justify-center"
              resizeMode="cover"
              imageStyle={{
                borderRadius: 20,
              }}
            >
              <BlurView
                intensity={15}
                tint="systemMaterialDark"
                className="w-full"
              >
                <Text className="font-psemibold text-2xl text-white text-center w-full py-5">
                  {item.title}
                </Text>
              </BlurView>
            </ImageBackground>
          </TouchableOpacity>
        )}
        className="w-full h-full"
        contentContainerStyle={{
          gap: 20,
        }}
      />
    </SafeAreaView>
  );
};

export default Search;
