import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";

const SettingComponent = (props) => {
  return (
    <TouchableOpacity style={{ flexDirection: "row", padding: 20,margin:5 , borderWidth: 1, borderColor: "#ff7f36" , borderRadius: 10, alignItems: "center", backgroundColor: "#fff" }} onPress={props.onPress}>
      <View
        style={{ paddingHorizontal: 10 }}
      >
        <FontAwesome name={props.icon} size={25} color={"black"} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={{ color: "#000", fontSize: 18 }}>{props.heading}</Text>
        <Text style={{ color: "#000", fontSize: 14 }}>{props.subheading}</Text>
        <Text style={{ color: "#000", fontSize: 14 }}>{props.subtitle}</Text>
      </View>
      <View>
        <FontAwesome name="arrow-right" size={25} color={"black"} />
      </View>
    </TouchableOpacity>
  );
};

export default SettingComponent;
