import { View, TextInput, TouchableOpacity, Image, Alert } from "react-native";
import React, { useState } from "react";
import icons from "../../constants/icons";
import { router } from "expo-router";

interface SearchFieldProps {
  placeholder?: string;
  otherStyles?: string;
}

const SearchField = ({ placeholder, otherStyles }: SearchFieldProps) => {
  const [query, setQuery] = useState(null);

  return (
    <View className={`${otherStyles} space-y-2`}>
      <View className="w-full h-16 px-4 bg-bright-gray rounded-2xl items-center flex-row border-2 border-gray-200/20 focus:border-secondary">
        <TextInput
          className="flex-1 font-psemibold text-base text-white"
          value={query}
          placeholder={placeholder}
          placeholderTextColor="rgba(255,255,255,0.7)"
          onChangeText={(e) => setQuery(e)}
          returnKeyLabel="Search"
          returnKeyType="search"
          onSubmitEditing={(event) =>
            router.push(`search/${event.nativeEvent.text}`)
          }
        />
        <TouchableOpacity onPress={() => router.push(`search/${query}`)}>
          <Image
            source={icons.search}
            className="w-6 h-6"
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SearchField;
