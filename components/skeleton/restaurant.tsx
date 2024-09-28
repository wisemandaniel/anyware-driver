import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  withRepeat,
  Easing,
} from "react-native-reanimated";
import HeaderComponent from "../restaurant/header";
import Colors from "@/constants/Colors";

const { width } = Dimensions.get("window");

const EnhancedSkeleton: React.FC = () => {
  const opacity = useSharedValue(0.5);

  // Create an animated style that will update based on the opacity value
  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  // Animate the opacity value with a pulsing effect
  opacity.value = withRepeat(
    withTiming(1, {
      duration: 1000,
      easing: Easing.inOut(Easing.ease),
    }),
    -1,
    true
  );

  return (
    <View style={styles.container}>
      <HeaderComponent />
      <View style={styles.restaurantSection}>
        <Animated.View style={[styles.titleSkeleton, animatedStyle]} />
        {Array.from({ length: 3 }).map((_, index) => (
          <View key={index} style={styles.restaurantItemContainer}>
            <Animated.View style={[styles.imageSkeleton, animatedStyle]} />
            <View style={styles.restaurantTextContainer}>
              <Animated.View style={[styles.nameSkeleton, animatedStyle]} />
              <Animated.View style={[styles.addressSkeleton, animatedStyle]} />
            </View>
          </View>
        ))}
      </View>

      <View style={styles.mealSection}>
        <Animated.View style={[styles.titleSkeleton, animatedStyle]} />
        <View style={styles.mealList}>
          {Array.from({ length: 4 }).map((_, index) => (
            <View key={index} style={styles.mealItemContainer}>
              <Animated.View
                style={[styles.mealImageSkeleton, animatedStyle]}
              />
              <Animated.View style={[styles.mealNameSkeleton, animatedStyle]} />
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    flex: 1,
    backgroundColor: Colors.white,
  },
  restaurantSection: {
    marginBottom: 30,
    padding: 20,
  },
  titleSkeleton: {
    width: 150,
    height: 20,
    backgroundColor: "#e0e0e0",
    borderRadius: 4,
    marginBottom: 15,
  },
  restaurantItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  imageSkeleton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#e0e0e0",
  },
  restaurantTextContainer: {
    marginLeft: 20,
  },
  nameSkeleton: {
    width: 180,
    height: 20,
    backgroundColor: "#e0e0e0",
    borderRadius: 4,
    marginBottom: 6,
  },
  addressSkeleton: {
    width: 220,
    height: 15,
    backgroundColor: "#e0e0e0",
    borderRadius: 4,
  },
  mealSection: {
    marginBottom: 20,
    padding: 20,
  },
  mealList: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  mealItemContainer: {
    width: (width - 60) / 2,
    marginBottom: 20,
  },
  mealImageSkeleton: {
    width: "100%",
    height: 120,
    borderRadius: 10,
    backgroundColor: "#e0e0e0",
    marginBottom: 10,
  },
  mealNameSkeleton: {
    width: "80%",
    height: 20,
    backgroundColor: "#e0e0e0",
    borderRadius: 4,
  },
});

export default EnhancedSkeleton;
