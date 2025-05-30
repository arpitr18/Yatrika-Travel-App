import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import grouplist from "@/data/groups.json";
import { Ionicons } from "@expo/vector-icons";

const GroupListings = () => {
  const renderItem = ({ item }) => {
    return (
      <View
        style={{
          marginRight: 10,
          padding: 10,
          backgroundColor: "#fff",
          borderRadius: 10,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image
          source={{ uri: item.image }}
          style={{
            width: 80,
            height: 100,
            borderRadius: 10,
            marginRight: 10,
          }}
        />
        <View>
          <Text style={{ fontWeight: "bold", marginBottom: 5 }}>
            {item.name}
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 5,
            }}
          >
            <Ionicons name="star" size={18} color="#ff7f36" />
            <Text>
              {item.rating}
              <Text style={{ color: "grey" }}>({item.reviews}) </Text>
            </Text>
          </View>
        </View>
      </View>
    );
  };
  return (
    <View>
      <Text
        style={{
          fontSize: 18,
          fontWeight: "bold",
          color: "#000",
        }}
      >
        Top Travel Groups
      </Text>
      <FlatList
        data={grouplist}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default GroupListings;

const styles = StyleSheet.create({});
