import { AntDesign, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { View, StyleSheet, Text } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import HeaderComponent from "../restaurant/header";
import Colors from "@/constants/Colors";

const SkeletonLoader: React.FC = () => {
  const loadingOpacity = useSharedValue(0.3);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: loadingOpacity.value,
    };
  });

  // Animation loop for the skeleton loader
  React.useEffect(() => {
    loadingOpacity.value = withRepeat(
      withTiming(1, { duration: 1000 }),
      -1,
      true
    );
  }, [loadingOpacity]);

  const renderSkeletonBlock = (
    width: string | number,
    height: number,
    borderRadius: number,
    marginBottom = 10
  ) => (
    <Animated.View
      style={[
        styles.skeletonBlock,
        { width, height, borderRadius, marginBottom },
        animatedStyle,
      ]}
    />
  );

  return (
    <View style={styles.container}>
      <HeaderComponent />

      <View style={styles.section}>
        {renderSkeletonBlock("70%", 20, 5)}
        <View style={styles.row}>
          {[...Array(3)].map((_, index) => (
            <View style={styles.cardContainer} key={index}>
              {renderSkeletonBlock(80, 80, 10)}
              {renderSkeletonBlock("100%", 20, 5, 0)}
            </View>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        {renderSkeletonBlock("70%", 20, 5)}
        <View style={styles.row}>
          {[...Array(3)].map((_, index) => (
            <View style={styles.cardContainer} key={index}>
              {renderSkeletonBlock(80, 80, 10)}
              {renderSkeletonBlock("100%", 20, 5, 0)}
            </View>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        {renderSkeletonBlock("70%", 20, 5)}
        <View style={styles.row}>
          {[...Array(3)].map((_, index) => (
            <View style={styles.cardContainer} key={index}>
              {renderSkeletonBlock(80, 80, 10)}
              {renderSkeletonBlock("100%", 20, 5, 0)}
            </View>
          ))}
        </View>
      </View>

      {renderSkeletonBlock("80%", 50, 25, 30)}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 40,
    backgroundColor: Colors.white
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
    justifyContent: "space-between",
  },
  headerTitle: {
    fontSize: 30,
    fontWeight: "700",
    fontFamily: "Roboto",
  },
  section: {
    marginBottom: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  skeletonBlock: {
    backgroundColor: "#e0e0e0",
  },
  cardContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: 150,
    paddingVertical: 10,
    borderRadius: 15,
    marginRight: 10,
  },
});

export default SkeletonLoader;
