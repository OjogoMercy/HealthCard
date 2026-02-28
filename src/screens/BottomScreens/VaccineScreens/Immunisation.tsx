import WrapView from "@/src/components/WrapView";
import { VaccineData } from "@/src/constants/Database";
import { images } from "@/src/constants/images";
import { COLORS, SCREEN_WIDTH, SIZES } from "@/src/constants/THEME";
import { ThemedText } from "@/src/constants/ThemedText";
import Ionicons from "@expo/vector-icons/Ionicons";
import BottomSheet from "@gorhom/bottom-sheet";
import React, { useMemo, useRef, useState } from "react";
import {
  Image,
  SectionList,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

const Immunisation = () => {
  const age = "6";
  const [selected, setSelected] = useState<{
    id: string;
    name: string;
    summary: string;
  } | null>(null);
  const bottomRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["40%", "70%"], []);
  const handleOpen = (item: any) => {
    console.log(item);
    setSelected(item);
    bottomRef.current?.expand();
  };
  const handleClose = () => {
    console.log("Sheet is closed");
    setSelected(null);
    bottomRef.current?.close();
  };
  console.log(bottomRef.current);
  console.log(snapPoints);

  return (
    <View style={styles.container}>
      <ThemedText type="text2bold" style={{ color: COLORS.primary }}>
        Vaccination Timeline
      </ThemedText>
      <View style={[styles.row, { marginVertical: SIZES.base / 2 }]}>
        <View style={styles.profileContainer}>
          <Image source={images.baby} style={styles.profileImage} />
        </View>
        <ThemedText
          type="text3bold"
          style={{ color: COLORS.primary, marginRight: "auto" }}
        >
          {" "}
          Michael <ThemedText type="text4">| {age} months old</ThemedText>
        </ThemedText>
        <TouchableOpacity activeOpacity={0.5}>
          <Ionicons
            name="chevron-down-circle-outline"
            size={SIZES.navTitle}
            color={COLORS.primary}
          />
        </TouchableOpacity>
      </View>
      <ThemedText
        type="text4bold"
        style={{ color: COLORS.primary, marginTop: SIZES.base }}
      >
        Reccomended Nigerian Immunisation Schedule
      </ThemedText>
      <SectionList
        sections={VaccineData}
        keyExtractor={(item, index) => item.id + index}
        showsVerticalScrollIndicator={false}
        stickySectionHeadersEnabled={false}
        contentContainerStyle={{ marginVertical: SIZES.padding }}
        style={{
          width: SCREEN_WIDTH * 0.9,
          alignSelf: "center",
        }}
        renderSectionHeader={({ section: { title } }) => {
          return (
            <View style={styles.tag}>
              <ThemedText> {title}</ThemedText>
            </View>
          );
        }}
        renderItem={({ item, index, section }) => {
          const lastItem = index === section.data.length - 1;
          return (
            <View style={[styles.list, lastItem && styles.lastItem]}>
              <View
                style={[
                  styles.bigCard,
                  lastItem && {
                    borderBottomLeftRadius: SIZES.padding,
                    borderBottomRightRadius: SIZES.padding,
                  },
                ]}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <ThemedText type="text4bold">{item.name}</ThemedText>
                  <TouchableOpacity
                    onPress={() => handleOpen(item)}
                    activeOpacity={0.5}
                  >
                    <Ionicons
                      name="chevron-down"
                      size={SIZES.padding}
                      color={COLORS.primary}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          );
        }}
      />

      <BottomSheet
        ref={bottomRef}
        snapPoints={snapPoints}
        index={-1}
        onClose={handleClose}
        enablePanDownToClose
      >
        <View
          style={{
            alignItems: "center",
            padding: SIZES.padding,
            backgroundColor: "white",
          }}
        >
          <TouchableOpacity onPress={() => handleClose()} activeOpacity={0.5}>
            <Ionicons
              name="chevron-down"
              size={SIZES.padding}
              color={COLORS.primary}
            />
          </TouchableOpacity>
          <ThemedText type="text2bold" style={{ color: COLORS.primary }}>
            {selected?.name}
          </ThemedText>
          <ThemedText
            type="text4"
            style={{ marginTop: SIZES.base, textAlign: "center" }}
          >
            {selected?.summary}
          </ThemedText>
        </View>
      </BottomSheet>
    </View>
  );
};

export default Immunisation;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: SCREEN_WIDTH * 0.9,
    elevation: 4,
    backgroundColor: COLORS.white,
    padding: SIZES.base,
    borderRadius: SIZES.padding,
  },
  profileContainer: {
    borderRadius: SIZES.navTitle,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
    height: SIZES.navTitle * 1.4,
    width: SIZES.navTitle * 1.4,
  },
  profileImage: {
    height: "90%",
    width: "90%",
    borderRadius: SIZES.padding,
    resizeMode: "cover",
  },
  bigCard: {
    width: "100%",
    backgroundColor: "white",
    padding: SIZES.padding / 1.5,
  },
  tag: {
    backgroundColor: COLORS.secondary + "80",
    height: SIZES.padding * 1.5,
    width: "100%",
    borderTopRightRadius: SIZES.padding,
    borderTopLeftRadius: SIZES.padding,
    justifyContent: "center",
    paddingHorizontal: SIZES.base,
  },
  list: {
    width: SCREEN_WIDTH * 0.9,
    alignSelf: "center",
  },
  lastItem: {
    borderBottomLeftRadius: SIZES.padding,
    borderBottomRightRadius: SIZES.padding,
    marginBottom: SIZES.padding,
    backgroundColor: COLORS.white,
  },
  container:{
    flex:1,
    backgroundColor: COLORS.background,
    alignItems: "center",
    paddingTop: SIZES.padding * 2,
  }
});
