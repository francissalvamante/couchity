import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React, { useState } from "react";

const TabComponent = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <>
      <View className="w-full">
        <FlatList
          data={tabs}
          keyExtractor={(item) => item.index.toString()}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              key={index}
              className={`${
                activeTab === index && "border-b-4 border-bright-gray pb-1"
              }`}
              onPress={() => setActiveTab(index)}
            >
              <Text className="font-psemibold text-xl text-white">
                {item.name}
              </Text>
            </TouchableOpacity>
          )}
          horizontal
          contentContainerStyle={{
            gap: 30,
          }}
          showsHorizontalScrollIndicator={false}
        />
      </View>
      <View className="w-full mt-3">
        {React.createElement(tabs[activeTab].component, {
          ...tabs[activeTab].props,
        })}
      </View>
    </>
  );
};

export default TabComponent;
