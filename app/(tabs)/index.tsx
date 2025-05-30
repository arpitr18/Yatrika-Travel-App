import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { FontAwesome, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useHeaderHeight } from "@react-navigation/elements";
import Colors from "@/constants/Colors";
import CatergoryButtons from "@/components/CatergoryButtons";
import Listings from "@/components/Listings";
import GroupListings from "@/components/GroupListings";
import ListingData from "@/data/destinations.json";

const Page = () => {
  const headerHeight = useHeaderHeight();

  const [category , setCategory] = React.useState("All");

  const onCatChanged = (category : string) =>{
    setCategory(category);
    // console.log("Selected Category: ", category);
  }

  return (
    <>
      <Stack.Screen
        options={{
          headerTransparent: true,
          headerTitle: "",
          headerLeft: () => (
            <TouchableOpacity onPress={() => alert("Profile pressed!")}>
              <Image
                source={require("../../assets/images/Me.jpg")}
                style={{
                  width: 30,
                  height: 30,
                  marginLeft: 20,
                  borderRadius: 8,
                }}
              />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity onPress={() => alert("Notifications pressed!")}>
              <View
                style={{
                  backgroundColor: "#fff",
                  borderRadius: 8,
                  padding: 8,
                  marginRight: 20,
                  shadowColor: "#171717",
                  shadowOffset: { width: 2, height: 4 },
                  shadowOpacity: 0.3,
                  shadowRadius: 5,
                }}
              >
                <FontAwesome name="bell" size={24} color="#333" />
              </View>
            </TouchableOpacity>
          ),
        }}
      />
      <ScrollView style={[styles.container, { paddingTop: headerHeight , flex: 1 }]}>
        <Text style={styles.headingtext}>Explore The Beautiful World!</Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginVertical: 20,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "#fff",
              padding: 16,
              borderRadius: 10,
              flex: 1,
            }}
          >
            <Ionicons name="search" size={24} color="#888" style={{marginRight:15}} />
            <TextInput placeholder="Search.." />
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: Colors.primaryColor,
              padding: 12,
              borderRadius: 10,
              marginLeft: 20,
            }}
          >
            <Ionicons name="options" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        <CatergoryButtons onCategoryChanged = {onCatChanged} />

        <Listings category={category}/>

        <GroupListings />
      </ScrollView>
    </>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  headingtext: {
    fontSize: 28,
    color: "#000",
    fontWeight: "800",
    marginTop: 20,
  },
});
