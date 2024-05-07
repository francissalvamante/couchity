import { View, Text } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";

const TabIcon = ({ icon, name, focused }) => {
  return (
    <View className="items-center justify-center gap-2">
      {icon}
      <Text
        className={`${
          focused
            ? "font-psemibold text-active-tint"
            : "font-pregular text-inactive-tint"
        } text-xs`}
      >
        {name}
      </Text>
    </View>
  );
};

const AppLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: "#0296E5",
          tabBarInactiveTintColor: "#67686D",
          tabBarStyle: {
            backgroundColor: "#242A32",
            borderTopWidth: 1,
            borderTopColor: "#0296E5",
            height: 84,
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={<FontAwesome name="home" size={24} color={color} />}
                name="Home"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="watchlist"
          options={{
            title: "Watchlist",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={<FontAwesome name="bookmark" size={24} color={color} />}
                name="Watchlist"
                focused={focused}
              />
            ),
            unmountOnBlur: true,
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={<FontAwesome name="user" size={24} color={color} />}
                name="Profile"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="movie/[query]"
          options={{
            href: null,
            headerShown: false,
            unmountOnBlur: true,
          }}
        />
        <Tabs.Screen
          name="search/[query]"
          options={{
            href: null,
            headerShown: false,
            unmountOnBlur: true,
          }}
        />
      </Tabs>
      <StatusBar backgroundColor="#1e1e1e" style="light" />
    </>
  );
};

export default AppLayout;
