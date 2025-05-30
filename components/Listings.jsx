import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import { Link } from "expo-router";
import listings from "@/data/destinations.json";

const Listings = ({ category }) => {

  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    // console.log("Category:", category);
    setLoading(true);

    setTimeout(()=>{
      setLoading(false);
    },200)
  },[category]);

    const filteredListings = listings.filter((item) => {
    return category === "All" || item.category === category;
  });

  const renderItem = ({ item }) => {
    return (
      <Link href={`/listing/${item.id}`} asChild>
        <TouchableOpacity style={{ marginBottom: 10 }} onPress={() => {}}>
          <View
            style={{
              backgroundColor: "#fff",
              marginRight: 10,
              padding: 10,
              borderRadius: 10,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
              width: 220,
            }}
          >
            <Image
              source={{ uri: item.image }}
              style={{
                width: 200,
                height: 200,
                borderRadius: 10,
                marginBottom: 20,
              }}
            />
            <View
              style={{
                backgroundColor: Colors.primaryColor,
                padding: 10,
                position: "absolute",
                top: 180,
                right: 20,
                borderRadius: "50%",
                borderColor: "#fff",
                borderWidth: 2,
              }}
            >
              <Ionicons name="bookmark-outline" size={24} color="#fff" />
            </View>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "600",
                marginBottom: 5,
                color: "#000",
              }}
              numberOfLines={1}
              ellipsizeMode="middle"
            >
              {item.name}
            </Text>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Ionicons
                  name="location"
                  size={18}
                  color={Colors.primaryColor}
                  style={{ marginBottom: 2 }}
                />
                <Text
                  style={{
                    fontSize: 12,
                    color: Colors.textSecondary,
                    fontWeight: "bold",
                  }}
                >
                  {item.location}
                </Text>
              </View>
              <Text
                style={{ fontSize: 15, fontWeight: "900", color: "#ff7f36" }}
              >
                ${item.price}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </Link>
    );
  };
  return (
    <View>
      <FlatList
        data={loading? [] : listings}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default Listings;

const styles = StyleSheet.create({});
