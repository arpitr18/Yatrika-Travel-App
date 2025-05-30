import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useRef } from "react";
import destinationCategories from "@/data/categories";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";

const CatergoryButtons = ({onCategoryChanged}) => {
  const itemRef = useRef([]);
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = React.useState(null);

  const handleSelectCategory = (index) => {
    const selected = itemRef.current[index];

    setActiveIndex(index);
    selected?.measure((x) => {
      scrollRef.current?.scrollTo({
        x: x,
        y: 0,
        animated: true,
      });
    });

    onCategoryChanged(destinationCategories[index].title);

  };

  return (
    <View>
      <Text style={styles.title}>Catergories</Text>
      <ScrollView
      ref={scrollRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          gap: 10,
          marginVertical: 10,
        }}
      >
        {destinationCategories.map((item, index) => (
          <TouchableOpacity
            key={index}
            ref={(el) => (itemRef.current[index] = el)}
            onPress={() => handleSelectCategory(index)}
            style={
              activeIndex == index
                ? styles.catergoryButtonActive
                : styles.catergoryButton
            }
          >
            <MaterialCommunityIcons
              name={item.iconName}
              size={20}
              color={activeIndex == index ? "#fff" : "#000"}
            />
            <Text
              style={
                activeIndex == index
                  ? { color: "#fff", fontWeight: "bold" }
                  : { color: "#000", fontWeight: "bold" }
              }
            >
              {item.title}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default CatergoryButtons;

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000",
  },
  catergoryButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    gap: 10,
  },
  catergoryButtonActive: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.primaryColor,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    gap: 10,
  },
});
