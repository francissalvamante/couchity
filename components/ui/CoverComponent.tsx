import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  ImageBackground,
} from "react-native";
import React, { useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";

const tmdbImageUrl = "https://image.tmdb.org/t/p/original";

interface CoverComponentProps {
  item: any;
  index?: number;
  watchlisted?: boolean;
  saveToWatchList?: any;
  removeFromWatchList?: any;
  imageStyles?: string;
  showRanking?: boolean;
  showBookmark?: boolean;
}

const CoverComponent = ({
  item,
  index,
  watchlisted,
  saveToWatchList,
  removeFromWatchList,
  imageStyles,
  showRanking = true,
  showBookmark = true,
}: CoverComponentProps) => {
  const [coverLoading, setCoverLoading] = useState(true);

  return (
    <TouchableOpacity onPress={() => router.push(`movie/${item.id}`)}>
      <ImageBackground
        source={{
          uri: `${tmdbImageUrl}${item.poster_path}`,
        }}
        imageStyle={{
          borderRadius: 16,
        }}
        className={`justify-center ${imageStyles}`}
        resizeMode="stretch"
        onLoadEnd={() => setCoverLoading(false)}
      >
        {coverLoading && <ActivityIndicator />}
      </ImageBackground>
      {showRanking && (
        <View className="items-center justify-center absolute bottom-2 right-1 bg-black/30 backdrop-blur-3xl shadow-lg w-16 h-16 border border-solid border-white/50 rounded-full">
          <Text className="font-pmedium text-4xl text-white mt-2">
            {index + 1}
          </Text>
        </View>
      )}
      {showBookmark && (
        <View className="absolute top-2 right-3">
          <TouchableOpacity
            onPress={watchlisted ? removeFromWatchList : saveToWatchList}
          >
            <FontAwesome
              name={watchlisted ? "bookmark" : "bookmark-o"}
              size={30}
              color="white"
            />
          </TouchableOpacity>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default CoverComponent;
