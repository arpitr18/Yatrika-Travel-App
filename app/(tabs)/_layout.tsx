import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import Colors from "@/constants/Colors";
import { FontAwesome, Ionicons, MaterialIcons } from "@expo/vector-icons";

const Layout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: Colors.bgColor,
        },
        tabBarShowLabel: false,
        tabBarActiveTintColor: Colors.black,
        tabBarInactiveTintColor: "#888",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" size={30} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="catergory"
        options={{
          title: "Category",
          tabBarIcon: ({ color }) => (
            <Ionicons name="list" size={30} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          tabBarIcon: ({ color }) => (
            <View
              style={{
                backgroundColor: Colors.primaryColor,
                padding: 8,
                borderRadius: 10,
                height: 50,
                width: 50,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Ionicons name="search" size={30} color={Colors.white} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="bookmarks"
        options={{
          title: "Bookmarks",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="bookmarks" size={30} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="user" size={30} color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default Layout;

const styles = StyleSheet.create({});
