import Colors from "@/constants/Colors";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Alert,
} from "react-native";
import { useEffect, useState, useMemo, useRef, useCallback } from "react";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { getDistance } from "geolib";
import { IAppState } from "@/store/interface";
import { getAllAddresses } from "@/functions/address";
import { clearCart, setOrder } from "@/store/system_persist";
import EmptyState from "@/components/cards/empty";
import { createOrder } from "@/functions/order";
import Loader from "@/components/loader";
import OtherDaysMenuComponent from "@/components/menu/otherDays";
import Toast from "react-native-toast-message";
import { ActivityIndicator } from "react-native";

interface AddressItem {
  _id: string;
  lat: string;
  lng: string;
  name: string;
  type: string;
  popular_place: string;
}

const Page = () => {
  const [selectedAddressId, setSelectedAddressId] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [popular, setPopular] = useState("");
  const [name, setName] = useState("");
  const item = useSelector((state: IAppState) => state.systemPersist.item);
  const dispatch = useDispatch();
  const user = useSelector((state: IAppState) => state.systemPersist.user);
  const [address, setAddresses] = useState<AddressItem[]>([]);
  const [deliveryPrice, setDeliveryPrice] = useState<number | null>(null);
  const [currentLocation, setCurrentLocation] = useState({
    latitude: 0.3,
    longitude: 0.3,
  });
  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const token = useSelector((state: IAppState) => state.systemPersist.token);
  const order = useSelector((state: IAppState) => state.systemPersist.order);

  useEffect(() => {
    const fetchAddresses = async () => {
      if (token) {
        try {
          const addresses = await getAllAddresses(token);
          setAddresses(addresses);
          setLoading(false);
        } catch (error) {
          console.error("Failed to fetch addresses", error);
        }
      }
    };

    fetchAddresses();
  }, [token]);

  const selectAddress = (item: AddressItem) => {
    setSelectedAddressId(item._id);
    setLat(item.lat);
    setLng(item.lng);
    setPopular(item.popular_place);
    setName(item.name);
    setCurrentLocation({
      latitude: +item.lat,
      longitude: +item.lng,
    });
  };

  const renderAddress = ({ item }: { item: AddressItem }) => (
    <TouchableOpacity
      style={[
        styles.address,
        selectedAddressId === item._id && {
          borderWidth: 2,
          borderColor: Colors.primary,
        },
      ]}
      onPress={() => selectAddress(item)}
    >
      {selectedAddressId !== item._id && (
        <FontAwesome name="circle-o" size={22} color={Colors.gray} />
      )}
      {selectedAddressId === item._id && (
        <FontAwesome name="circle" size={22} color={Colors.primary} />
      )}
      <View style={styles.addressContent}>
        <Text style={styles.sendTo}>SEND TO</Text>
        <Text style={styles.title}>{item?.name}</Text>
        <Text style={styles.addressType}>{item.type} Address</Text>
      </View>
    </TouchableOpacity>
  );

  const checkDistance = () => {
    const distance = getDistance(currentLocation, {
      latitude: 0.0,
      longitude: 0.0,
    });

    if (distance > 3000) {
      setDeliveryPrice(1000); // Example price for distance > 3 km
    } else {
      setDeliveryPrice(500); // Example price for distance ≤ 3 km
    }
  };

  useEffect(() => {
    if (lat && lng) {
      checkDistance();
    }
  }, [currentLocation]);

  const onPressContinue = async () => {
    setIsLoading(true);
    if (selectedAddressId) {
      dispatch(setOrder({ ...order, address: selectedAddressId }));
      try {
        const OrderData: any = {
          ...order,
          address: selectedAddressId,
          delivery_fee: deliveryPrice,
          status: "Pending",
          total_amount: order.amount_paid + deliveryPrice,
          amount_payment_status: "PENDING",
          delivery_payment_status: "PENDING",
        };

        await createOrder(OrderData, token as string).then((res: any) => {
          dispatch(setOrder({ ...OrderData, _id: res.order._id }));
          Toast.show({
            type: "success",
            text1: "Successful",
            text1Style: {
              fontSize: 18,
              fontWeight: "bold",
              color: Colors.background,
            },
            text2: "You successfully Place your order",
          });
          setIsLoading(false);
          dispatch(clearCart());
          setTimeout(() => {
            router.replace("/general/checkout");
          }, 2000);
        });
      } catch (error) {
        setIsLoading(false);
        console.log(error.message);
        Alert.alert("Error", "Failed placing your order.");
      }
    } else {
      setIsLoading(false);
      Alert.alert("Error", "Please select a delivery address");
    }
  };

  const onAddAddress = () => {
    router.push("/general/add_address");
  };

  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <Text style={styles.headerText}>Where should we drop it?</Text>
        {!address.length && !loading ? (
          <EmptyState
            message="No location added yet"
            subMessage="Add one"
            onPressSubMessage={() => {
              router.push("/general/add_address");
            }}
          />
        ) : undefined}
        {loading ? <Loader /> : undefined}
        <FlatList
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.propertyListContainer}
          data={address}
          renderItem={renderAddress}
          keyExtractor={(item) => item._id}
        />
      </View>

      <View style={styles.priceContainer}>
        <Text style={styles.priceLabel}>Order Price:</Text>
        <Text style={styles.priceValue}>{order.amount_paid || ""}</Text>
      </View>
      <View style={styles.priceContainer}>
        <Text style={styles.priceLabel}>Delivery Price:</Text>
        <Text style={styles.priceValue}>
          {deliveryPrice ? `${deliveryPrice} XFA` : "Select a location"}
        </Text>
      </View>
      <View style={styles.priceContainer}>
        <Text style={styles.priceLabel}>Total Price:</Text>
        <Text style={styles.priceValue}>
          {deliveryPrice
            ? `${deliveryPrice + order.amount_paid} XFA`
            : "Select a location"}
        </Text>
      </View>

      <TouchableOpacity onPress={onAddAddress} style={styles.addAddressButton}>
        <Text style={styles.addAddressText}>Add Address</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={onPressContinue} style={styles.confirmButton}>
        {!isLoading && (
          <Text style={styles.confirmButtonText}>Confirm Order</Text>
        )}
        {isLoading && <ActivityIndicator color={"white"} size={32} />}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
    backgroundColor: Colors.background,
  },
  headerText: {
    padding: 25,
    fontSize: 20,
    fontWeight: "600",
    color: Colors.primary,
  },
  propertyListContainer: {
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  address: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    marginBottom: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  addressContent: {
    marginLeft: 15,
  },
  sendTo: {
    fontSize: 16,
    color: Colors.gray,
    marginBottom: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.primary,
  },
  addressType: {
    fontSize: 14,
    color: Colors.gray,
  },
  priceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 10,
    marginHorizontal: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#FE724C",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  priceLabel: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.primary,
  },
  priceValue: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.border,
  },
  addAddressButton: {
    backgroundColor: Colors.background,
    borderRadius: 50,
    paddingVertical: 15,
    marginTop: 25,
    marginHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#FE724C80",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  addAddressText: {
    fontSize: 20,
    fontWeight: "600",
    color: Colors.primary,
  },
  confirmButton: {
    backgroundColor: Colors.primary,
    borderRadius: 50,
    paddingVertical: 15,
    marginTop: 15,
    marginHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#FE724C80",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  confirmButtonText: {
    fontSize: 20,
    fontWeight: "600",
    color: "#fff",
  },
});

export default Page;
