import WrapView from "@/src/components/WrapView";
import { images } from "@/src/constants/images";
import {
  COLORS,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  SIZES,
} from "@/src/constants/THEME";
import { ThemedText } from "@/src/constants/ThemedText";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const ProfileScreen = () => {
 
  const Baby ={
  name : "Michael",
   age : "6",
   Value: "64%",
  }

  const Data = [
    {
      id: 1,
      iconName: "person",
      title: "Child Information",
    },
    {
      id: 2,
      iconName: "people-circle",
      title: "Switch Child Profile",
    },
    {
      id: 3,
      iconName: "help-circle",
      title: "Help and Support",
    },
    {
      id: 4,
      iconName: "log-out-outline",
      title: "Logout",
    },
  ];
  const navigation = useNavigation();

  return (
    <WrapView screenTitle="Profile">
      <View style={styles.profileCard}>
        <TouchableOpacity style={styles.profileContainer} activeOpacity={0.5}>
          <Image
            source={images.baby}
            style={{
              width: SIZES.navTitle * 2,
              height: SIZES.navTitle * 2,
              borderRadius: SIZES.navTitle * 2,
              borderWidth: 2,
              borderColor: COLORS.primary,
            }}
          />
          <Ionicons
            name="camera"
            size={20}
            color={COLORS.primary}
            style={{ position: "absolute", bottom: 5, right: 5 }}
          />
        </TouchableOpacity>
        <View>
          <ThemedText type="text3bold" style={{ color: COLORS.primary }}>
            {Baby.name}
          </ThemedText>
          <ThemedText type="text4">{Baby.age} months old </ThemedText>
        </View>
        <TouchableOpacity
          style={styles.editButton}
          activeOpacity={0.7}
          onPress={() =>
            navigation.navigate("StackNav", { screen: "EditProfile" })
          }
        >
          <ThemedText type="text4white" style={{ color: COLORS.white }}>
            Edit Profile{" "}
          </ThemedText>
          <Ionicons name="pencil" size={15} color={COLORS.white} />
        </TouchableOpacity>
      </View>
      <LinearGradient
        colors={[COLORS.primary, COLORS.primary + "80"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.progress}
      >
        <ThemedText type="text3boldwhite">Vaccination Progress</ThemedText>
        <View style={[styles.progressBar]}>
          <View style={[styles.progressFill, { width: Baby.Value }]}></View>
        </View>
        <ThemedText type="text4white">Completion : {Baby.Value}</ThemedText>
        <ThemedText type="text4white">13 of 20 vaccines completed </ThemedText>
      </LinearGradient>
      <View style={styles.nextContainer}>
        <View style={{ flexDirection: "row" }}>
          <Ionicons name="calendar" size={20} color={COLORS.accent} />
          <ThemedText type="text3bold" style={{ marginLeft: SIZES.base }}>
            Next Vaccine
          </ThemedText>
        </View>
        <ThemedText type="text4">OPV 1 + Pentavalent 1</ThemedText>

        <View style={{ flexDirection: "row" }}>
          <Text>Due : 12th June 2024 |</Text>
          <Ionicons
            name="time"
            size={15}
            color={COLORS.accent}
            style={{ marginLeft: SIZES.base / 2 }}
          />
          <Text> Status: Upcoming </Text>
        </View>
      </View>

      <View style={styles.card}>
        <FlatList
          data={Data}
          ListHeaderComponent={
            <ThemedText type="text4bold" style={{ marginVertical: SIZES.base }}>
              Quick Actions
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

export default ProfileScreen;

const styles = StyleSheet.create({
  profileContainer: {
    borderRadius: SIZES.navTitle,
    alignItems: "center",
    justifyContent: "center",
    padding: SIZES.base,
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
  profileCard: {
    backgroundColor: COLORS.white,
    padding: SIZES.base,
    borderRadius: SIZES.padding,
    width: SCREEN_WIDTH * 0.9,
    alignItems: "center",
    marginVertical: SIZES.padding,
    flexDirection: "row",
    elevation: 1,
  },
  editButton: {
    backgroundColor: COLORS.primary,
    padding: SIZES.base,
    marginLeft: "auto",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: SIZES.padding,
    justifyContent: "center",
    elevation: 3,
  },
  progress: {
    padding: SIZES.base * 2,
    borderRadius: SIZES.padding,
    width: SCREEN_WIDTH * 0.9,
    marginVertical: SIZES.base,
    height: SCREEN_HEIGHT * 0.155,
  },
  progressBar: {
    width: SCREEN_WIDTH * 0.8,
    height: SIZES.base * 1.5,
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.padding,
    marginVertical: SIZES.padding / 2,
  },
  progressFill: {
    height: "100%",
    backgroundColor: COLORS.white,
    borderRadius: SIZES.padding,
    elevation: 2,
  },
  nextContainer: {
    backgroundColor: COLORS.accent + "30",
    width: SCREEN_WIDTH * 0.9,
    paddingVertical: SIZES.padding / 2,
    borderRadius: SIZES.padding,
    marginVertical: SIZES.base,
    alignItems: "flex-start",
    paddingHorizontal: SIZES.base * 1.5,
    height: SCREEN_HEIGHT * 0.12,
  },
});
