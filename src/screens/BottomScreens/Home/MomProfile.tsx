import PrimaryButton from "@/src/components/PrimaryButton";
import WrapView from "@/src/components/WrapView";
import { general } from "@/src/constants/General";
import {
  COLORS,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  SIZES,
} from "@/src/constants/THEME";
import { ThemedText } from "@/src/constants/ThemedText";
import { images } from "@/src/constants/images";
import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { Image, StyleSheet, TouchableOpacity, View,FlatList } from "react-native";

const MomProfile = () => {
  const User = {
    name: "Sarah Williams",
    email: "email.com",
    Phone: "070845346257",
  };
  const Baby = {
    name: "Michael",
    age: "6",
    Value: "64%",
  };
   const Data = [
    {
      id: 1,
      iconName: "person",
      title: "Edit Profile",
    },
    {
      id: 2,
      iconName: "people-circle",
      title: "Security",
    },
    {
      id: 3,
      iconName: "settings",
      title: "Settings",
    },
    {
        id:4,
        iconName:"help-circle",
        title:"Help"


    },
    {
      id: 5,
      iconName: "log-out-outline",
      title: "Logout",
    },
  ];
  return (
    <WrapView screenTitle="Mom Profile">
      <View style={styles.profileCard}>
        <TouchableOpacity style={styles.profileContainer} activeOpacity={0.5}>
          <Image
            source={images.mom}
            style={{
              width: SCREEN_WIDTH * 0.25,
              height: SCREEN_WIDTH * 0.25,
              borderRadius: SIZES.navTitle * 2,
            }}
          />
          <Ionicons
            name="camera"
            size={22}
            color={COLORS.primary}
            style={{ position: "absolute", bottom: 0, right: 0 }}
          />
        </TouchableOpacity>
        <ThemedText
          type="text3bold"
          style={{ marginVertical: SIZES.base, color: COLORS.primary }}
        >
          {User.name}
        </ThemedText>
        <ThemedText type="text4">{User.email}</ThemedText>
        <ThemedText type="text4">{User.Phone}</ThemedText>
      </View>
      <View
        style={[
          general.nextContainer,
          {
            height: SCREEN_HEIGHT * 0.25,
            backgroundColor: COLORS.primary + "20",
          },
        ]}
      >
        <View style={{ flexDirection: "row" }}>
          <Ionicons name="people-circle" size={20} color={COLORS.primary} />
          <ThemedText type="text3bold" style={{ marginLeft: SIZES.base }}>
            Children
          </ThemedText>
        </View>

        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View
            style={[
              general.profileContainer,
              { width: SIZES.navTitle * 2, height: SIZES.navTitle * 2 },
            ]}
          >
            <Image
              source={images.baby}
              style={[
                general.profileImage,
                { borderWidth: 2, borderColor: COLORS.primary },
              ]}
            />
          </View>
          <ThemedText
            type="text3bold"
            style={{ color: COLORS.primary, marginRight: "auto" }}
          >
            {" "}
            Michael{" "}
            <ThemedText type="text4">| {Baby.age} months old</ThemedText>
          </ThemedText>
        </View>
        <View style={{width:'100%'}}>
        <PrimaryButton title="Add New Child" onPress={undefined} />

        </View>
      </View>
      <View style={styles.card}>
        <FlatList
          data={Data}
          ListHeaderComponent={
            <ThemedText type="text4bold" style={{ marginVertical: SIZES.base }}>
              Account Settings
            </ThemedText>
          }
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

export default MomProfile;

const styles = StyleSheet.create({
  profileCard: {
    backgroundColor: COLORS.white,
    padding: SIZES.base,
    borderRadius: SIZES.padding,
    width: SCREEN_WIDTH * 0.9,
    alignItems: "center",
    marginVertical: SIZES.padding,
    elevation: 1,
  },
  profileContainer: {
    borderRadius: SIZES.navTitle * 2,
    alignItems: "center",
    justifyContent: "center",
    padding: SIZES.base / 4,
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  card: {
    backgroundColor: COLORS.secondary + "20",
    padding: SIZES.base,
    borderRadius: SIZES.padding,
    marginTop: SIZES.padding,
    width: "90%",
  },
   listItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: SIZES.base,
  },


});
