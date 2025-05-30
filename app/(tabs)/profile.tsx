import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import SettingComponent from "../../components/SettingComponent";
import { Ionicons } from "@expo/vector-icons";
import { router, Stack } from "expo-router";
// import {getStatusBarHeight} from 'react-native-status-bar-height';

const { width, height } = Dimensions.get("window");

const profile = () => {
  return (
    <ScrollView style={styles.container}>
      <StatusBar hidden />
      <Stack.Screen
        options={{
          // headerShown: false,
          headerTransparent: true,
          headerTitle: "",
          headerLeft: () => (
            <TouchableOpacity  style={{paddingHorizontal:20 , marginTop:20}} onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={30} color="#000"  />
            </TouchableOpacity>
          ),
        
        }} />

      <View style={styles.profileContainer}>
        <Image
          source={require("../../assets/images/Me.jpg")}
          style={[styles.avatarImage, { height: height / 5 }]}
        />
        <Text style={styles.avatarText}>Arpit Rai</Text>
      </View>

      <View style={styles.profileContainer}>
        <SettingComponent
          icon="user"
          heading="Account"
          subheading="Edit Profile"
          subtitle="Change Password"
        />
        <SettingComponent
          icon="gear"
          heading="Settings"
          subheading="Theme"
          subtitle="Permissions"
        />
        <SettingComponent
          icon="dollar"
          heading="Offers & Refferrals"
          subheading="Offer"
          subtitle="Refferrals"
        />
        <SettingComponent
          icon="info"
          heading="About"
          subheading="About Movies"
          subtitle="more"
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    // paddingTop: StatusBar.currentHeight,
    // backgroundColor: "#000",
  },
  appHeaderContainer: {
    marginHorizontal: 36,
    marginTop: 40,
  },
  profileContainer: {
    alignItems: "center",
    paddingVertical: 30,
    paddingHorizontal: 20,

  },
  avatarImage: {
    aspectRatio: 1 / 1,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: "#ff7f36",
    // shadowColor: "#171717",
    // shadowOffset: { width: 2, height: 4 },
    // shadowOpacity: 0.3,
    // shadowRadius: 5,
    marginBottom: 20,
  },
  avatarText: {
    // fontFamily: FONTFAMILY.poppins_medium,
    fontSize: 25,
    fontWeight: 'bold',
    color: "#ff7f36",
  },
});

export default profile;
