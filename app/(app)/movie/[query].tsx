import {
  View,
  Text,
  ImageBackground,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import useTmdb from "../../../lib/useTmdb";
import {
  getCredits,
  getDetails,
  getReviews,
  getVideos,
} from "../../../lib/tmdb";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import TabComponent from "../../../components/ui/TabComponent";
import About from "../../../components/tabs/About";
import Reviews from "../../../components/tabs/Reviews";
import Cast from "../../../components/tabs/Cast";
import Videos from "../../../components/tabs/Videos";

const tmdbImageUrl = "https://image.tmdb.org/t/p/original";

const Query = () => {
  const { query } = useLocalSearchParams();
  const { data, isLoading } = useTmdb(() => getDetails(query));

  const [imageBgLoading, setImageBgLoading] = useState(true);

  const QueryTabs = [
    {
      index: 0,
      name: "About Movie",
      component: About,
      props: {
        id: query,
        getDetails,
      },
    },
    {
      index: 1,
      name: "Reviews",
      component: Reviews,
      props: {
        id: query,
        getReviews,
      },
    },
    {
      index: 2,
      name: "Cast",
      component: Cast,
      props: {
        id: query,
        getCredits,
      },
    },
    {
      index: 3,
      name: "Videos",
      component: Videos,
      props: {
        id: query,
        getVideos,
      },
    },
  ];

  return (
    <SafeAreaView className="bg-primary items-center h-full w-full">
      <View className="w-full items-center my-5">
        {!isLoading && (
          <Text className="font-psemibold text-xl text-center w-1/2 text-white">
            {data.title}
          </Text>
        )}
        <TouchableOpacity
          onPress={() => router.back()}
          className="absolute left-2"
        >
          <MaterialIcons name="arrow-back-ios-new" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <View className="w-full">
        {!isLoading && (
          <>
            <ImageBackground
              source={{
                uri: `${tmdbImageUrl}${data.backdrop_path}`,
              }}
              imageStyle={{
                borderBottomRightRadius: 16,
                borderBottomLeftRadius: 16,
              }}
              className="h-56 justify-center"
              resizeMode="cover"
              onLoadEnd={() => setImageBgLoading(false)}
            >
              {imageBgLoading && <ActivityIndicator size="large" />}
            </ImageBackground>
            <View className="p-2 absolute right-5 bottom-2 bg-gray-400/70 rounded-2xl">
              <Text className="text-rating">
                <AntDesign name="staro" size={15} color="#FF8700" />{" "}
                {parseFloat(data.vote_average).toFixed(2)}
              </Text>
            </View>
          </>
        )}
      </View>
      <View className="w-full h-14 justify-center items-center">
        {!isLoading && (
          <Text className="text-white text-lg font-semibold">
            {new Date(data.release_date).getFullYear()} &nbsp; | &nbsp;{" "}
            {data.runtime} Minutes &nbsp; | &nbsp; {data.genres[0].name}
          </Text>
        )}
      </View>
      <View className="px-3 w-full">
        <TabComponent tabs={QueryTabs} />
      </View>
    </SafeAreaView>
  );
};

export default Query;
