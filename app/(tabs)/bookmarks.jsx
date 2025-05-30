import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import React, { use, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import listings from "@/data/destinations.json";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";

const bookmarks = () => {
  const [bookmarks, setBookmarks] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const isFocused = useIsFocused();

  const fetchBooksmarks = async () => {
    try {
      const token = await AsyncStorage.getItem("bookmarks");
      const res = JSON.parse(token);
      let item = [];
      if (res) {
        res.forEach((element) => {
          const listing = listings.find((item) => item.id === element);
          if (listing) {
            item.push(listing);
          }
        });
        setBookmarks(item);
      } else {
        setBookmarks([]);
      }
    } catch (error) {
      console.error("Failed to fetch bookmarks", error);
      setBookmarks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooksmarks();
  }, [isFocused]);
  const renderItem = ({ item }) => {
    return (
      <Link href={`/listing/${item.id}`} asChild>
        <TouchableOpacity style={{ marginBottom: 10 }} onPress={() => {}}>
          <View
            style={{
              // marginRight: 10,
              padding: 10,
              backgroundColor: "#fff",
              borderRadius: 10,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                source={{ uri: item.image }}
                style={{
                  width: 100,
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
                  <Text>{item.rating}</Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 5,
                  }}
                >
                  <Ionicons name="location" size={18} color="#ff7f36" />

                  <Text style={{ color: "grey" }}>({item.location}) </Text>
                </View>
              </View>
            </View>
            <Text style={{ color: "#ff7f36", fontWeight: "bold" }}>
              ${item.price}
            </Text>
          </View>
        </TouchableOpacity>
      </Link>
    );
  };

  return (
    <View>
      {loading ? (
        <ActivityIndicator
          size="large"
          color="#0000ff"
          style={{ marginTop: 20 }}
        />
      ) : (
        <FlatList
          data={bookmarks}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          // renderItem={({ item }) => renderItem(item)}
        />
      )}
      {!loading && bookmarks.length === 0 && (
        <Text style={{ textAlign: "center", marginTop: 20 }}>
          No bookmarks found.
        </Text>
      )}
    </View>
  );
};
export default bookmarks;

