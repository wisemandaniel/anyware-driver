import React, { useState } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  addItem,
  reduceQuantity,
  removeItem,
  setCurrentMeal,
} from "@/store/system_persist";
import { router } from "expo-router";
import AddOnComponent from "@/components/meal/addOn";
import FoodDetailsComponent from "@/components/meal/detail";
import HeaderComponent from "@/components/meal/header";
import FoodImageComponent from "@/components/meal/image";
import QuantitySelectorComponent from "@/components/meal/quantitySelector";
import { IAppState } from "@/store/interface";

const FoodDetailsScreen: React.FC = () => {
  const dispatch = useDispatch();

  const currentMeal = useSelector(
    (state: IAppState) => state.systemPersist.currentMeal
  );
  const cartItems = useSelector((state: IAppState) => state.systemPersist.card);
  const isInCart = cartItems.some((item) => item.id === currentMeal?._id);
  const current = cartItems.find((item) => item.id === currentMeal?._id);

  console.log(current);
  const [quantity, setQuantity] = useState<number>(current?.quantity || 0);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  console.log(currentMeal);
  const handleIncrease = () => {
    dispatch(
      addItem({
        id: currentMeal._id,
        name: currentMeal.name,
        image: currentMeal.image,
        price: currentMeal.price,
        quantity: 1,
        type: "FOOD",
      })
    );
    setQuantity((prev) => prev + 1);
  };
  const handleDecrease = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
    quantity > 1
      ? dispatch(
          reduceQuantity({
            id: currentMeal._id,
            name: currentMeal.name,
            image: currentMeal.image,
            price: currentMeal.price * quantity,
            quantity,
          })
        )
      : undefined;
  };
  const handleFavoriteToggle = () => setIsFavorite((prev) => !prev);

  const handleAddToCart = () => {
    if (!currentMeal) return;

    if (isInCart) {
      dispatch(removeItem({ id: currentMeal._id }));
      setQuantity(0);
    } else {
      dispatch(
        addItem({
          id: currentMeal._id,
          name: currentMeal.name,
          image: currentMeal.image,
          price: currentMeal.price,
          quantity: 1,
          type: "FOOD",
        })
      );
      setQuantity(1);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <HeaderComponent
          onBackPress={() => router.back()}
          onFavoriteToggle={handleFavoriteToggle}
          isFavorite={isFavorite}
        />
        <FoodImageComponent
          imageUri={currentMeal?.image || "https://via.placeholder.com/400"}
        />
        <View style={styles.detailsContainer}>
          <FoodDetailsComponent
            name={currentMeal?.name || "Meal Name"}
            rating={currentMeal?.rating || 4.5}
            ratingCount={currentMeal?.ratingCount || 30}
            price={currentMeal?.price || 9.5}
            description={currentMeal?.description || "Meal Description"}
            onSeeReviewPress={() => console.log("See Review Pressed")}
          />
          <QuantitySelectorComponent
            quantity={quantity}
            onIncrease={handleIncrease}
            onDecrease={handleDecrease}
          />
          {/* <Text style={styles.addOnTitle}>Choice of Add On</Text> */}
          {/* <AddOnComponent
            name="Pepper Julienne"
            price={2.3}
            imageUri="https://via.placeholder.com/40"
            selected={selectedAddOn === "Pepper Julienne"}
            onSelect={() => handleAddOnSelect("Pepper Julienne")}
          />
          <AddOnComponent
            name="Baby Spinach"
            price={4.7}
            imageUri="https://via.placeholder.com/40"
            selected={selectedAddOn === "Baby Spinach"}
            onSelect={() => handleAddOnSelect("Baby Spinach")}
          />
          <AddOnComponent
            name="Mushroom"
            price={2.5}
            imageUri="https://via.placeholder.com/40"
            selected={selectedAddOn === "Mushroom"}
            onSelect={() => handleAddOnSelect("Mushroom")}
          /> */}
        </View>
      </ScrollView>
      <TouchableOpacity style={styles.button} onPress={handleAddToCart}>
        <Text style={styles.buttonText}>
          {isInCart ? "REMOVE FROM CART" : "ADD TO CART"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  detailsContainer: {
    padding: 20,
  },
  addOnTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
  },
  button: {
    backgroundColor: "#FF6F00",
    padding: 15,
    borderRadius: 30,
    alignItems: "center",
    margin: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default FoodDetailsScreen;
