import WrapView from "@/src/components/WrapView";
import { images } from "@/src/constants/images";
import { COLORS, SCREEN_WIDTH, SIZES } from "@/src/constants/THEME";
import { ThemedText } from "@/src/constants/ThemedText";
import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

const ProfileScreen = () => {
  const name = "Michael";
  const age = "6";
  const gender = "male";

  const Data = [
    {
      id: 1,
      iconName: "person",
      title: "Personal Information",
    },
    {
      id: 2,
      iconName: "calendar",
      title: "Calendar",
    },
    {
      id: 3,
      iconName: "settings",
      title: "Settings",
    },
  ];

  return (
    <WrapView screenTitle="Profile">
      <View style={styles.profileCard}>
        <TouchableOpacity style={styles.profileContainer} activeOpacity={0.5}>
          <Image
            source={images.baby}
            style={{
              width: SIZES.padding *2,
              height: SIZES.padding *2,
              borderRadius: SIZES.padding * 2,
              borderWidth: 2,
              borderColor: COLORS.primary,
            }}
          />
        </TouchableOpacity>
        <ThemedText type="text3bold" style={{ color: COLORS.primary }}>
          {name}
        </ThemedText>
        <ThemedText type="text4">{age} months old </ThemedText>
      </View>

      <View style={styles.card}>
        <FlatList
          data={Data}
          renderItem={({ item }) => {
            return (
              <View style={styles.listItem}>
                <TouchableOpacity>
                  <Ionicons
                    name={item.iconName}
                    size={24}
                    color={COLORS.primary}
                  />
                </TouchableOpacity>
                <ThemedText type="text4" style={{ marginLeft: SIZES.base }}>
                  {item.title}
                </ThemedText>
                <TouchableOpacity style={{ marginLeft: "auto" }}>
                  <Ionicons
                    name="chevron-forward"
                    size={22}
                    color={COLORS.black}
                  />
                </TouchableOpacity>
              </View>
            );
          }}
        />
      </View>
    </WrapView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  profileContainer: {
    borderRadius: SIZES.navTitle,
    alignItems: "center",
    justifyContent: "center",
    padding: SIZES.base,
    marginTop: SIZES.padding,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: SIZES.base,
  },
  card: {
    backgroundColor: COLORS.secondary + "20",
    padding: SIZES.base,
    borderRadius: SIZES.padding,
    marginTop: SIZES.padding,
    width: "90%",
  },
  profileCard:{
    backgroundColor: COLORS.white ,
    padding: SIZES.base,
    borderRadius: SIZES.padding,
    width: SCREEN_WIDTH*0.9,
    alignItems: "center",
    marginBottom: SIZES.padding,
    flexDirection:'row'
  }
});
