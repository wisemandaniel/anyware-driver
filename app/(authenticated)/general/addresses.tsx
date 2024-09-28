import Colors from "@/constants/Colors";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  RefreshControl,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useEffect, useState } from "react";
import { router } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { IAppState } from "@/store/interface";
import { deleteAddress, getAllAddresses } from "@/functions/address";
import React from "react";
import Toast from "react-native-toast-message";

interface AddressItem {
  id: string;
  lat: string;
  lng: string;
  name: string;
  type: string;
  popular_place: string;
}

const Page = () => {
  const [selectedAddressId, setSelectedAddressId] = useState("");
  const [loading, setLoading] = useState(true);
  const item = useSelector((state: IAppState) => state.systemPersist.item);

  const dispatch = useDispatch();
  const user = useSelector((state: IAppState) => state.systemPersist.user);
  const [address, setAddresses] = useState<AddressItem[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const token = useSelector((state: IAppState) => state.systemPersist.token);

  useEffect(() => {
    const fetchAddresses = async () => {
      if (token) {
        try {
          const addresses = await getAllAddresses(token);
          setAddresses(addresses);
          console.log(addresses);
          setLoading(false);
        } catch (error) {
          console.error("Failed to fetch addresses", error);
          setLoading(false);
        }
      }
    };

    fetchAddresses();
  }, [token]);

  const handleRefresh = async () => {
    setRefreshing(true);
    if (token) {
      try {
        const addresses = await getAllAddresses(token);
        setAddresses(addresses);
      } catch (error) {
        console.error("Failed to fetch addresses", error);
      } finally {
        setRefreshing(false);
      }
    }
  };

  const onAddAddress = () => {
    router.push("/general/add_address");
  };

  const handleDeleteAddress = (address_id: string) => {
    Alert.alert(
      "Delete Address",
      "Are you sure you want to delete this address?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteAddress(address_id, `${token}`);
              Toast.show({
                type: "success",
                text1: "Successful",
                text1Style: {
                  fontSize: 18,
                  fontWeight: "bold",
                  color: Colors.background,
                },
                text2: "You successfully deleted the address",
              });
              handleRefresh(); 
            } catch (error) {
              Toast.show({
                type: "error",
                text1: "Error",
                text2: `Failed to delete address: ${error}`,
              });
            }
          },
        },
      ]
    );
  };

  const renderAddress = ({ item }: { item: AddressItem }) => (
    <TouchableOpacity
      onPress={() => setSelectedAddressId(item.id)}
      style={[
        styles.address,
        selectedAddressId === item.id && {
          borderWidth: 2,
          borderColor: Colors.primary,
        },
      ]}
    >
      <View>
        <Text style={styles.addressName}>{item?.name}</Text>
        <Text style={styles.addressPlace}>
          {item?.popular_place}{" "}
          <Text style={styles.popularPlaceTag}>(Popular place)</Text>
        </Text>
      </View>
      <Text style={styles.addressType}>{item.type} Address</Text>
      <View style={styles.actionsContainer}>
        <TouchableOpacity onPress={() => handleDeleteAddress(item._id)}>
          <Ionicons size={28} name="trash-outline" color={Colors.expense} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color={Colors.primary} />
      ) : address.length === 0 ? (
        <View style={styles.emptyStateContainer}>
          <Text style={styles.emptyStateText}>No address added yet</Text>
          <Text style={styles.emptyStateSubText}>
            Add a new address by tapping the "+" button below.
          </Text>
        </View>
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.propertyListContainer}
          data={address}
          renderItem={renderAddress}
          keyExtractor={(item) => item._id}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
        />
      )}

      <TouchableOpacity onPress={onAddAddress} style={styles.fabButton}>
        <Ionicons name="add" size={32} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  propertyListContainer: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 80, // Ensures FAB doesn't overlap content
  },
  address: {
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 4,
  },
  addressName: {
    fontSize: 18,
    color: Colors.primary,
    fontWeight: "bold",
  },
  addressPlace: {
    fontSize: 16,
    color: Colors.gray,
    marginBottom: 8,
  },
  popularPlaceTag: {
    fontSize: 14,
    color: Colors.gray,
  },
  addressType: {
    fontSize: 16,
    color: Colors.primary,
    fontWeight: "bold",
    marginBottom: 10,
  },
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 10,
  },
  fabButton: {
    backgroundColor: Colors.primary,
    width: 60,
    height: 60,
    borderRadius: 30,
    position: "absolute",
    bottom: 20,
    right: 20,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  emptyStateText: {
    fontSize: 20,
    color: Colors.primary,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  emptyStateSubText: {
    fontSize: 16,
    color: Colors.gray,
    textAlign: "center",
  },
});

export default Page;

