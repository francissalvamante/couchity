import {
  View,
  FlatList,
  Text,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React from "react";
import useTmdb from "../../lib/useTmdb";
import ReviewPanel from "../ui/ReviewPanel";

const Reviews = ({ id, getReviews }) => {
  const { data, isLoading } = useTmdb(() => getReviews(id));

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <ReviewPanel review={item} />}
      refreshing={isLoading}
      ListEmptyComponent={() => (
        <View className="w-full h-[30vh] items-center justify-center">
          {isLoading ? (
            <ActivityIndicator animating={true} />
          ) : (
            <Text className="text-white font-psemibold text-xl">
              No Reviews, YET!
            </Text>
          )}
        </View>
      )}
      className="w-full h-[38vh]"
    />
  );
};

export default Reviews;
