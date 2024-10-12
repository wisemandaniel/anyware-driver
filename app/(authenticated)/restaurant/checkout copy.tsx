import Colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";
import { Link, useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  FlatList,
  ScrollView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import Toast from "react-native-toast-message";
import { CheckBox } from "react-native-elements";
import { IAppState } from "@/store/interface";

const Page = () => {
  const [countryCode, setCountryCode] = useState("+237");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [type, setType] = useState("MTN MOM");
  const keyboardVerticalOffset = Platform.OS === "ios" ? 80 : 0;
  const router = useRouter();
  const item = useSelector((state: IAppState) => state.systemPersist.item);
  const card = useSelector((state: IAppState) => state.systemPersist.card);
  const user = useSelector((state: IAppState) => state.systemPersist.user);
  const order = useSelector((state: IAppState) => state.systemPersist.order);
  const [checked, setChecked] = useState(false);

  const dispatch = useDispatch();

  console.log("ITEM: ", item);
  console.log(user);

  const DATA = [
    {
      id: "1",
      title: "MTN MOMO",
    },
    {
      id: "2",
      title: "ORANGE MONEY",
    },
  ];

  useEffect(() => {
    setType("MTN MOMO");
    setChecked(order?.payment_status === "UNPAID" ? false : true);
  }, []);

  const status = (reference: string) => {
    return new Promise((resolve, reject) => {
      // const checkStatus = () => {
      //   var myHeaders = new Headers();
      //   myHeaders.append(
      //     "Authorization",
      //     "Token dd3f16a9daf2ed576376f91932e63402138fec97"
      //   );
      //   myHeaders.append("Content-Type", "application/json");

      //   var requestOptions: any = {
      //     method: "GET",
      //     headers: myHeaders,
      //     redirect: "follow",
      //   };

      //   fetch(
      //     `https://demo.campay.net/api/transaction/${reference}/`,
      //     requestOptions
      //   )
      //     .then((response) => response.json())
      //     .then(async (result) => {
            // if (result.status !== "PENDING") {
            //   const { data, error } = await supabase
            //     .from("transactions")
            //     .insert([
            //       {
            //         amount: result.amount,
            //         currency: result.currency,
            //         code: result.code,
            //         operator: result.operator,
            //         operator_reference: result.operator_reference,
            //         order_id: order.id,
            //         reference: result.reference,
            //         status: result.status,
            //         user_id: user.user_id,
            //       },
            //     ])
            //     .select();

            //   if (error !== null) {
            //     Toast.show({
            //       type: "error",
            //       text1: "Error",
            //       text2: error.message,
            //     });
            //     setIsLoading(false);
            //   } else {
            //     resolve(result.status);
            //   }
            // } else {
            //   setTimeout(checkStatus, 3000); // Poll every 3 seconds
            // }
          // })
          // .catch((error) => reject(error));
      // };

      // checkStatus();
    });
  };

  const makePayment = async () => {
    setIsLoading(true);
    const fullPhoneNumber = `${countryCode}${phoneNumber}`;
    try {
      let myHeaders = new Headers();
      myHeaders.append(
        "Authorization",
        "Token dd3f16a9daf2ed576376f91932e63402138fec97"
      );
      myHeaders.append("Content-Type", "application/json");

      let raw = JSON.stringify({
        amount: "2",
        from: fullPhoneNumber,
        description: "Full payment for Gas delivery",
        external_reference: "",
      });

      let requestOptions: any = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch("https://demo.campay.net/api/collect/", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          status(result.reference).then(async (finalStatus) => {
            setIsLoading(false);
            dispatch(clearCart());
            // if (finalStatus === "SUCCESSFUL") {
            //   Toast.show({
            //     type: "success",
            //     text1: "success",
            //     text2: "Transaction Successful",
            //   });

            //   const { data, error } = await supabase
            //     .from("orders")
            //     .update({
            //       payment_status: "PAID",
            //       delivery_payment_status: checked ? "PAID" : "UNPAID",
            //     })
            //     .eq("id", order.id)
            //     .select();

            //   if (error !== null) {
            //     console.log("error: " + JSON.stringify(error));
            //     Toast.show({
            //       type: "error",
            //       text1: "Error",
            //       text2: "Error saving the details.... ",
            //     });
            //   } else {
            //     setTimeout(() => {
            //       router.replace("/(authenticated)/(tabs)/home");
            //     }, 1000);
            //   }
            // } else {
            //   Toast.show({
            //     type: "error",
            //     text1: "Error",
            //     text2: "Transaction Failed try again",
            //   });
            //   setIsLoading(false);
            // }
          });
        })
        .catch((error) => {
          setIsLoading(false);
          console.log("first error: " + error);
          alert(error);
        });
    } catch (error) {
      setIsLoading(false);
      console.error("Error signing up:", error);
    }
  };

  const Item = ({ title }: { title: string }) => (
    <TouchableOpacity
      onPress={() => {
        setType(title);
      }}
      style={[
        styles.item,
        type === title
          ? { backgroundColor: Colors.primary }
          : { backgroundColor: Colors.primaryMuted },
      ]}
    >
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="padding"
      keyboardVerticalOffset={keyboardVerticalOffset}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.profile}
            onPress={() => {
              router.back();
            }}
          >
            <Ionicons name="arrow-back-outline" size={24} color="black" />
          </TouchableOpacity>
          <View></View>
          <TouchableOpacity
            style={styles.profile}
            onPress={() => {
              router.replace("/(authenticated)/(tabs)/home");
            }}
          >
            <AntDesign name="appstore-o" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <View style={defaultStyles.container}>
          <Text style={defaultStyles.header}>Checkout Now</Text>
          <Text style={defaultStyles.descriptionText}>
            Enter your {type} Number below
          </Text>

          <View>
            <FlatList
              contentContainerStyle={{
                alignItems: "center",
                justifyContent: "center",
                marginTop: 25,
              }}
              showsHorizontalScrollIndicator={false}
              horizontal
              data={DATA}
              renderItem={({ item }) => <Item title={item.title} />}
              keyExtractor={(item) => item.id}
            />
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 30,
              alignItems: "center",
              width: "100%",
            }}
          >
            <Text style={{ fontSize: 25, fontFamily: "Ranade-bold" }}>
              Delivery price :
            </Text>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                gap: 20,
                padding: 20,
              }}
            >
              <Text style={{ fontSize: 23, fontFamily: "Ranade-medium" }}>
                {order.delivery_price} XFA
              </Text>
            </View>
          </View>
          {order?.payment_status === "UNPAID" ? (
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                gap: 30,
                alignItems: "center",
                width: "100%",
              }}
            >
              <Text style={{ fontSize: 25, fontFamily: "Ranade-bold" }}>
                Order price :
              </Text>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 20,
                  padding: 20,
                }}
              >
                <Text style={{ fontSize: 23, fontFamily: "Ranade-medium" }}>
                  {order.total_price} XFA
                </Text>
              </View>
            </View>
          ) : undefined}
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 0,
              alignItems: "center",
              width: "100%",
            }}
          >
            <CheckBox
              // title="Click Here"
              checked={order?.payment_status === "PAID" ? true : checked}
              onPress={() =>
                order?.payment_status === "UNPAID"
                  ? setChecked(!checked)
                  : undefined
              }
            />
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                gap: 5,
                padding: 20,
              }}
            >
              <Text style={{ fontSize: 23, fontFamily: "Ranade-medium" }}>
                Pay Delivery now?
              </Text>
            </View>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 30,
              alignItems: "center",
              width: "100%",
            }}
          >
            <Text style={{ fontSize: 30, fontFamily: "Ranade-bold" }}>
              Total :
            </Text>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                gap: 20,
                padding: 20,
              }}
            >
              <Text style={{ fontSize: 25, fontFamily: "Ranade-medium" }}>
                {checked
                  ? order?.payment_status === "UNPAID"
                    ? order.total_price + order.delivery_price
                    : order.delivery_price
                  : order.total_price}{" "}
                XFA
              </Text>
            </View>
          </View>

          {type === "MTN MOMO" && (
            <View style={styles.inputContainer}>
              <View style={styles.code}>
                <Image
                  source={require("@/assets/images/cameroon.jpeg")}
                  style={styles.flag}
                />
                <Text style={styles.c_Code}>{countryCode}</Text>
              </View>
              <TextInput
                maxLength={9}
                style={[styles.input, { flex: 1 }]}
                placeholder="Mobile number"
                placeholderTextColor={Colors.gray}
                keyboardType="numeric"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
              />
            </View>
          )}
          {type === "ORANGE MONEY" && (
            <View style={styles.inputContainer}>
              <View style={styles.code}>
                <Image
                  source={require("@/assets/images/cameroon.jpeg")}
                  style={styles.flag}
                />
                <Text style={styles.c_Code}>{countryCode}</Text>
              </View>
              <TextInput
                maxLength={9}
                style={[styles.input, { flex: 1 }]}
                placeholder="Mobile number"
                placeholderTextColor={Colors.gray}
                keyboardType="numeric"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
              />
            </View>
          )}
          <View style={{ flex: 1 }} />

          <TouchableOpacity
            style={[
              defaultStyles.pillButton,
              phoneNumber.length >= 9 ? styles.enabled : styles.disabled,
              { marginBottom: 20 },
            ]}
            disabled={!phoneNumber || phoneNumber.length < 9}
            onPress={makePayment}
          >
            {!isLoading && (
              <Text style={defaultStyles.buttonText}>PAY WITH {type}</Text>
            )}
            {isLoading && <ActivityIndicator color={"white"} size={32} />}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 40,
    flexDirection: "row",
  },
  header: {
    width: "100%",
    paddingVertical: 30,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 20,
  },
  profile: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    gap: 20,
    position: "relative",
  },
  input: {
    backgroundColor: Colors.lightGray,
    padding: 20,
    borderRadius: 16,
    fontSize: 20,
    marginRight: 10,
  },
  code: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: Colors.lightGray,
    padding: 15,
    borderRadius: 16,
    fontSize: 20,
    marginRight: 10,
  },
  flag: {
    width: 30,
    height: 20,
    marginRight: 8,
  },
  c_Code: {
    fontSize: 20,
    fontWeight: "600",
  },
  enabled: {
    backgroundColor: Colors.primary,
  },
  disabled: {
    backgroundColor: Colors.primaryMuted,
  },
  item: {
    width: 160,
    height: 80,
    padding: 5,
    marginVertical: 8,
    marginHorizontal: 16,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 24,
  },
  title: {
    fontSize: 20,
    textAlign: "center",
    fontWeight: "900",
    color: "#fff",
  },
});

export default Page;
