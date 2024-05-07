import { View, Text, FlatList, ActivityIndicator } from "react-native";
import React from "react";
import useTmdb from "../../lib/useTmdb";
import VideoPlayer from "../ui/VideoPlayer";

const Videos = ({ id, getVideos }) => {
  const { data, isLoading } = useTmdb(() => getVideos(id));

  return (
    <View className="w-full h-full">
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <VideoPlayer videoKey={item.key} />}
        ListEmptyComponent={() =>
          isLoading ? (
            <ActivityIndicator size="large" />
          ) : (
            <Text className="text-white font-psemibold text-2xl">
              No Videos
            </Text>
          )
        }
        className="w-full h-[38vh]"
      />
    </View>
  );
};

export default Videos;
