import Colors from "@/constants/Colors";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { useSelector, useDispatch } from "react-redux";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { GasBrand, getAvailableGasBrands } from "@/functions/gaz";
import Toast from "react-native-toast-message";
import SkeletonLoader from "@/components/skeleton/gasBrand";
import { addItem, removeItem, setOrder } from "@/store/system_persist";
import HeaderComponent from "@/components/restaurant/header";
import { IAppState } from "@/store/interface";

const brandData = [
  {
    id: 1,
    brand_image:
      "https://xhldxxsvfylyogbjpome.supabase.co/storage/v1/object/sign/avatars/total.png",
    brand_name: "Total",
  },
  {
    id: 2,
    brand_image:
      "https://xhldxxsvfylyogbjpome.supabase.co/storage/v1/object/sign/avatars/gaz-domestique-bocom-125-kg-removebg-preview.png",
    brand_name: "Boccom",
  },
  {
    id: 3,
    brand_image:
      "https://xhldxxsvfylyogbjpome.supabase.co/storage/v1/object/sign/avatars/glocal.png",
    brand_name: "Glocal",
  },
  {
    id: 4,
    brand_image:
      "https://xhldxxsvfylyogbjpome.supabase.co/storage/v1/object/sign/avatars/afrigaz.png",
    brand_name: "AfriGas",
  },
];

const sizeData = [
  {
    id: 1,
    brand_image_size:
      "https://xhldxxsvfylyogbjpome.supabase.co/storage/v1/object/sign/avatars/small.png",
    brand_size: "Small",
  },
  {
    id: 2,
    brand_image_size:
      "https://xhldxxsvfylyogbjpome.supabase.co/storage/v1/object/sign/avatars/medium.png",
    brand_size: "Medium",
  },
  {
    id: 3,
    brand_image_size:
      "https://xhldxxsvfylyogbjpome.supabase.co/storage/v1/object/sign/avatars/large.png",
    brand_size: "Large",
  },
];

const quantity = [
  {
    id: 1,
    num: 1,
    value: "One",
  },
  {
    id: 2,
    num: 2,
    value: "Two",
  },
  {
    id: 3,
    num: 3,
    value: "Three",
  },
  {
    id: 4,
    num: 4,
    value: "Four",
  },
  {
    id: 5,
    num: 5,
    value: "Five",
  },
];

interface serviceSize {
  id: number;
  brand_size: string;
  brand_image_size: string;
}

interface serviceQuantity {
  id: number;
  num: string;
  value: string;
}

const Page = () => {
  const [selectedBrand, setSelectedBrand] = useState<GasBrand>();
  const [selectedBrandId, setSelectedBrandId] = useState("");
  const [selectedBrandImg, setSelectedBrandImg] = useState("");
  const [selectedBrandName, setSelectedBrandName] = useState("");
  const [selectedQuantityId, setSelectedQuantityId] = useState(1);
  const [selectedQuantity, setSelectedQuantity] = useState("1");
  const [selectedSizeId, setSelectedSizeId] = useState(2);
  const [selectedSize, setSelectedSize] = useState("Medium");
  const [gasBrands, setGasBrands] = useState<GasBrand[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const cartItems = useSelector((state: IAppState) => state.systemPersist.card);

  const isInCart = cartItems.some(
    (item) => item.id === selectedBrandName + selectedSize
  );

  useEffect(() => {
    fetchGasBrands();
  }, []);

  const fetchGasBrands = async () => {
    try {
      setLoading(true);
      const brands = await getAvailableGasBrands();
      setGasBrands(brands);
      console.log(brands);
      setSelectedBrand(brands[0]);
      setSelectedBrandId(brands[0]._id);
      setSelectedBrandName(brands[0].name);
      setSelectedBrandImg(brands[0].image);
      console.log(brands);
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Failed to load gas brands",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <SkeletonLoader />;
  }

  const selectBrand = (item: GasBrand) => {
    setSelectedBrand(item);
    setSelectedBrandId(item._id);
    setSelectedBrandImg(item.image);
    setSelectedBrandName(item.name);
  };

  const selectSize = (item: serviceSize) => {
    setSelectedSizeId(item.id);
    setSelectedSize(item.brand_size);
  };

  const selectQuantity = (item: serviceQuantity) => {
    setSelectedQuantityId(item.id);
    setSelectedQuantity(item.num);
  };

  const handleAddToCart = () => {
    if (isInCart) {
      dispatch(
        removeItem({
          id: `${selectedBrandName + selectedSize}`,
        })
      );
    } else {
      console.log(selectedBrandImg);
      console.log(selectedQuantity);
      dispatch(
        addItem({
          id: selectedBrandName + selectedSize,
          name: `Name: ${selectedBrandName}` + ` - Size: ${selectedSize}`,
          image: selectedBrandImg,
          price:
            selectedSizeId == 1
              ? parseInt(selectedBrand?.prices.sPrice || "3500")
              : selectedSizeId == 2
              ? parseInt(selectedBrand?.prices.mPrice || "7500")
              : parseInt(selectedBrand?.prices.lPrice || "20000"),
          quantity: parseInt(selectedQuantity),
          type: "GAZ",
          size: selectedSize,
        })
      );
    }
  };

  const renderSize = ({ item }: { item: serviceSize; index: number }) => (
    <TouchableOpacity
      onPress={() => selectSize(item)}
      style={[
        styles.card,
        selectedSizeId === item.id && {
          borderWidth: 2,
          borderColor: Colors.primary,
        },
      ]}
    >
      <Image source={{ uri: item.brand_image_size }} style={styles.image} />
      <View style={styles.cardFooter}>
        <Text style={styles.title}>{item.brand_size}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderBrand = ({ item }: { item: GasBrand; index: number }) => (
    <TouchableOpacity
      onPress={() => selectBrand(item)}
      style={[
        styles.card,
        selectedBrandId === item._id && {
          borderWidth: 2,
          borderColor: Colors.primary,
        },
      ]}
    >
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.cardFooter}>
        <Text style={styles.title}>
          {item.name} - ({item.quantityInStock})
        </Text>
      </View>
    </TouchableOpacity>
  );

  const renderQuantity = ({
    item,
  }: {
    item: serviceQuantity;
    index: number;
  }) => (
    <TouchableOpacity
      onPress={() => selectQuantity(item)}
      style={[
        styles.quantity,
        selectedQuantityId === item.id && {
          borderWidth: 2,
          borderColor: Colors.primary,
        },
      ]}
    >
      <Text style={styles.title}>{item.value}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <HeaderComponent />
      <View
        style={{
          paddingHorizontal: 20,
        }}
      >
        <Text style={styles.sectionTitle}>Select Gas Brand (Bottle Color)</Text>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.propertyListContainer}
          data={gasBrands}
          renderItem={renderBrand}
          keyExtractor={(item) => item._id}
        />
      </View>
      <View
        style={{
          paddingHorizontal: 20,
        }}
      >
        <Text style={styles.sectionTitle}>Select Bottle Size</Text>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.propertyListContainer}
          data={sizeData}
          renderItem={renderSize}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
      <View
        style={{
          paddingHorizontal: 20,
        }}
      >
        <Text style={styles.sectionTitle}>How Many Do You Want?</Text>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.propertyListContainer}
          data={quantity}
          renderItem={renderQuantity}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>

      <TouchableOpacity
        onPress={handleAddToCart}
        style={[
          styles.continueButton,
          {
            backgroundColor: Colors.primary,
          },
        ]}
      >
        <Text style={[styles.buttonText, { color: "#fff" }]}>
          {isInCart ? "REMOVE FROM CART" : "ADD TO CART"}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingTop: 40,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 30,
    fontWeight: "700",
    fontFamily: "Roboto",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 15,
    marginTop: 15,
    color: "#FF6F00",
  },
  propertyListContainer: {
    paddingBottom: 20,
  },
  card: {
    alignItems: "center",
    justifyContent: "center",
    height: 150,
    width: 150,
    marginRight: 10,
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 15,
    shadowColor: "#FF6F0020",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    height: 80,
    width: 80,
    marginBottom: 10,
    resizeMode: "contain",
  },
  cardFooter: {
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  quantity: {
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    width: 100,
    marginRight: 10,
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 10,
    shadowColor: "#FF6F0020",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  continueButton: {
    alignSelf: "center",
    backgroundColor: Colors.primary,
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 40,
    marginTop: 25,
    marginBottom: 50,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
});

export default Page;
