import { View, Text } from "react-native";
import React from "react";
import useTmdb from "../../lib/useTmdb";

const About = ({ id, getDetails }) => {
  const { data, isLoading } = useTmdb(() => getDetails(id));
  return (
    <View className="w-full">
      {!isLoading && (
        <Text className="text-white font-pregular">{data.overview}</Text>
      )}
    </View>
  );
};

export default About;
