import React from "react";
import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import CartItemComponent from "@/components/checkout/cardItem";
import CheckoutButtonComponent from "@/components/checkout/checkoutButton";
import CartHeaderComponent from "@/components/checkout/header";
import PromoCodeComponent from "@/components/checkout/promotionCode";
import CartSummaryComponent from "@/components/checkout/summary";
import { IAppState } from "@/store/interface";
import {
  addItem,
  reduceQuantity,
  removeItem,
  setOrder,
} from "@/store/system_persist";
import EmptyState from "@/components/cards/empty";
import { router } from "expo-router";

const CartScreen: React.FC = () => {
  const dispatch = useDispatch();

  // Select cart items from Redux store
  const cartItems = useSelector((state: IAppState) => state.systemPersist.card);

  console.log(cartItems);
  const handleIncrease = (item: {
    id: string;
    name: string;
    price: number;
    quantity: number;
  }) => {
    dispatch(addItem(item));
  };

  const handleDecrease = (item: {
    id: string;
    name: string;
    price: number;
    quantity: number;
  }) => {
    dispatch(reduceQuantity(item));
  };

  const handleRemove = (item: {
    id: string;
    name: string;
    price: number;
    quantity: number;
  }) => {
    dispatch(removeItem(item));
  };

  // Calculate cart totals
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const reduction = 0;
  const total = subtotal - reduction;

  const handleClick = () => {
    // serviceG: "668404f68bf5c10258de7546",
    // serviceM: "66d3a91513bb8b545d5646f2",
    // serviceF: "668405368bf5c10258de7549",

    const gas = cartItems.filter((item) => item.type === "GAZ");
    const food = cartItems.filter((item) => item.type === "FOOD");

    console.log(gas.length);
    console.log(food);

    const orderData = {
      service:
        gas.length && food.length
          ? "66d3a91513bb8b545d5646f2"
          : food.length
          ? "668405368bf5c10258de7549"
          : "668404f68bf5c10258de7546",
      amount_paid: total,
      food: food.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        qty: item.quantity,
      })),
      gas: gas.map((item) => ({
        id: item.id,
        brand: item.name,
        bottle_size: item.size,
        price: item.price,
        qty: item.quantity,
      })),
    };
    dispatch(setOrder(orderData));
    router.replace("/general/delivery_address");
  };

  return (
    <SafeAreaView style={styles.container}>
      <CartHeaderComponent onBackPress={() => router.back()} />
      <ScrollView contentContainerStyle={styles.content}>
        {!cartItems.length ? (
          <EmptyState message="No item in card" />
        ) : (
          cartItems.map((item) => (
            <CartItemComponent
              key={item.id}
              imageUri={item.image}
              name={item.name}
              description={item.description}
              price={`XFA ${item.price}`}
              quantity={item.quantity}
              type={item.type}
              onIncrease={() => handleIncrease(item)}
              onDecrease={() => handleDecrease(item)}
              onRemove={() => handleRemove(item)}
            />
          ))
        )}
        <PromoCodeComponent />
        <CartSummaryComponent
          subtotal={`${subtotal}`}
          reduction={`${reduction || 0}`}
          total={`${total}`}
        />
        {cartItems.length ? (
          <CheckoutButtonComponent onPress={handleClick} />
        ) : undefined}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    padding: 20,
  },
});

export default CartScreen;
