import {
  Alert,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  StatusBar,
  TouchableOpacity,
  View,
} from "react-native";
import React, { use, useEffect, useState } from "react";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import listings from "@/data/destinations.json";
import {
  Feather,
  FontAwesome,
  FontAwesome5,
  Ionicons,
  Entypo,
} from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";

const { width, height } = Dimensions.get("window");

const ListingDetails = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter(); // Use the useRouter hook to access the router
  const [item, setItem] = useState();
  const [Loading, setLoading] = useState(true);
  const getItembyID = () => {
    const listing = listings.find((item) => item.id === id);
    setItem(listing);
    setLoading(false);
  };
  useEffect(() => {
    getItembyID();
  }, []);

  const [bookmark, setBookmark] = React.useState(false);
  const saveBookMark = async (itemId) => {
    setBookmark(true);
    await AsyncStorage.getItem("bookmarks").then((token) => {
      const res = JSON.parse(token);
      if (res !== null) {
        let data = res.find((val) => val === itemId);
        if (!data) {
          res.push(itemId);
          AsyncStorage.setItem("bookmarks", JSON.stringify(res));
          Alert.alert(
            "Bookmark Added",
            "This listing has been added to your bookmarks."
          );
        }
      } else {
        let bookmark = [];
        bookmark.push(itemId);
        AsyncStorage.setItem("bookmarks", JSON.stringify(bookmark));
        alert(
          "Bookmark Added",
          "This listing has been added to your bookmarks."
        );
      }
    });
  };

  const removeBookMark = async (itemId) => {
    setBookmark(false);
    const data = await AsyncStorage.getItem("bookmarks").then((token) => {
      const res = JSON.parse(token);
      return res.filter((val) => val !== itemId);
    });

    await AsyncStorage.setItem("bookmarks", JSON.stringify(data));
    Alert.alert(
      "Bookmark Removed",
      "This listing has been removed from your bookmarks."
    );
  };

  const renderBookmarkIcon = async (itemId) => {
    await AsyncStorage.getItem("bookmarks").then((token) => {
      const res = JSON.parse(token);
      if (res !== null) {
        let data = res.find((val) => val === itemId);
        return data ? setBookmark(true) : setBookmark(false);
      }
    });
  };

  useEffect(() => {
    {
      Loading ? null : renderBookmarkIcon(item?.id);
    }
  }, [Loading]);

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <Stack.Screen
        options={{
          headerTransparent: true,
          headerTitleAlign: "center",
          headerTitle: item?.name || "Listing Details",

          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                router.back();
              }}
              style={styles.headerLeftBtn}
            >
              <Feather name="arrow-left" size={24} color="black" />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                bookmark ? removeBookMark(item?.id) : saveBookMark(item?.id);
              }}
              style={styles.headerRightBtn}
            >
              <Ionicons
                name={bookmark ? "heart" : "heart-outline"}
                size={24}
                color={bookmark ? "red" : "black"}
              />
            </TouchableOpacity>
          ),
        }}
      />

      <ScrollView contentContainerStyle={styles.contentWrapper}>
        <Image source={{ uri: item?.image }} style={styles.image} />
        <Text style={styles.listingName}>{item?.name}</Text>

        <View style={styles.listingLocationWrapper}>
          <FontAwesome5
            name="map-marker-alt"
            size={18}
            color={Colors.primaryColor}
          />
          <Text style={styles.listingLocationTxt}>{item?.location}</Text>
        </View>

        <View style={styles.highlightWrapper}>
          <View style={{ flexDirection: "row" }}>
            <View style={styles.highlightIcon}>
              <Ionicons name="time" size={18} color={Colors.primaryColor} />
            </View>
            <View>
              <Text style={styles.highlightTxt}>Duration </Text>
              <Text style={styles.highlightTxtVal}>{item?.duration} Days</Text>
            </View>
          </View>
          <View style={{ flexDirection: "row" }}>
            <View style={styles.highlightIcon}>
              <FontAwesome name="users" size={18} color={Colors.primaryColor} />
            </View>
            <View>
              <Text style={styles.highlightTxt}>Persons </Text>
              <Text style={styles.highlightTxtVal}>{item?.duration}</Text>
            </View>
          </View>
          <View style={{ flexDirection: "row" }}>
            <View style={styles.highlightIcon}>
              <Ionicons name="star" size={18} color={Colors.primaryColor} />
            </View>
            <View>
              <Text style={styles.highlightTxt}>Rating </Text>
              <Text style={styles.highlightTxtVal}>{item?.rating}</Text>
            </View>
          </View>
        </View>

        <Text style={styles.listingDetails}>{item?.description}</Text>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          onPress={() => {}}
          style={[styles.footerBtn, styles.footerBookBtn]}
        >
          <Text style={styles.footerBtnTxt}>Book Now</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}} style={styles.footerBtn}>
          <Text style={styles.footerBtnTxt}>${item?.price}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ListingDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    // paddingTop: StatusBar.currentHeight,
  },
  headerLeftBtn: {
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    padding: 4,
    borderRadius: 10,
  },
  headerRightBtn: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    padding: 4,
    borderRadius: 10,
  },
  contentWrapper: {
    // padding: 20,
    backgroundColor: Colors.white,
  },
  image: {
    width: width,
    height: 400,
    borderRadius: 30,
    marginBottom: 20,
    marginTop : -50
  },
  listingName: {
    paddingHorizontal: 10,
    fontSize: 24,
    fontWeight: "500",
    color: Colors.black,
    letterSpacing: 0.5,
  },
  listingLocationWrapper: {
    paddingHorizontal: 10,
    flexDirection: "row",
    marginTop: 5,
    marginBottom: 10,
    alignItems: "center",
  },
  listingLocationTxt: {
    fontSize: 14,
    marginLeft: 5,
    color: Colors.black,
  },
  highlightWrapper: {
    paddingHorizontal: 10,
    flexDirection: "row",
    marginVertical: 20,
    justifyContent: "space-between",
  },
  highlightIcon: {
    backgroundColor: "#F4F4F4",
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 8,
    marginRight: 5,
    alignItems: "center",
  },
  highlightTxt: {
    fontSize: 12,
    color: "#999",
  },
  highlightTxtVal: {
    fontSize: 14,
    fontWeight: "600",
  },
  listingDetails: {
    paddingHorizontal: 10,
    fontSize: 16,
    color: Colors.black,
    lineHeight: 25,
    letterSpacing: 0.5,
  },
  footer: {
    flexDirection: "row",
    position: "absolute",
    bottom: 0,
    padding: 20,
    paddingBottom: 30,
    width: width,
  },
  footerBtn: {
    flex: 1,
    backgroundColor: Colors.black,
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  footerBookBtn: {
    flex: 2,
    backgroundColor: Colors.primaryColor,
    marginRight: 20,
  },
  footerBtnTxt: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: "600",
    textTransform: "uppercase",
  },
});
