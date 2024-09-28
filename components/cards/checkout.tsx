import React, { useState } from "react";

import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Ionicons, MaterialIcons, Octicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import { useDispatch } from "react-redux";
import { ReduceQuantity, addItem, removeItem } from "@/app/context/slices/card";

type Props = {
  image: string;
  name: string;
  price: number;
  quantity: number;
  item: any;
  onPress?: () => void;
};

const { height, width } = Dimensions.get("window");

const MealCardCheckout = ({
  image,
  name,
  price,
  quantity,
  item,
  onPress,
}: Props) => {
  const [quant, setQuant] = useState(quantity);
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
        }}
      >
        <Image
          source={{
            uri: image,
          }}
          style={styles.image}
        />
        <View>
          <Text style={styles.name}>{name}</Text>
          <View style={styles.priceContainer}>
            <Ionicons
              name="pricetag-outline"
              size={15}
              color={Colors.primary}
            />
            <Text style={styles.location}>XFA {price}</Text>
          </View>
        </View>
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
          padding: 2,
        }}
      >
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setQuant((prev) => prev + 1);
            dispatch(addItem(item));
          }}
        >
          <Text>+</Text>
        </TouchableOpacity>
        <Text style={{ fontSize: 25, fontFamily: "Ranade-medium" }}>
          {quantity}
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            quantity > 1 ? setQuant((prev) => prev - 1) : undefined;
            quantity > 1 ? dispatch(ReduceQuantity(item)) : undefined;
          }}
        >
          <Text>-</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 5,
    marginVertical: 10,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 1,
    padding: 5,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flex: 1,
    width: "100%",
  },
  image: {
    width: 100,
    height: 100,
    objectFit: "contain",
  },
  name: {
    paddingLeft: 10,
    fontSize: 25,
    fontFamily: "Ranade-medium",
    borderTopColor: Colors.lightGray,
    marginTop: 10,
    textAlign: "center",
  },
  priceContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 2,
    alignItems: "center",
    alignSelf: "center",
    marginVertical: 5,
    marginLeft: 10,
  },
  location: { fontSize: 18, fontFamily: "Ranade-regular" },
  availability: {
    alignSelf: "center",
    fontFamily: "Ranade-medium",
    color: Colors.white,
  },
  availabilityContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 2,
    alignItems: "center",
    alignSelf: "flex-end",
    padding: 5,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    padding: 4,
    width: 30,
    height: 30,
  },
});

export default MealCardCheckout;
