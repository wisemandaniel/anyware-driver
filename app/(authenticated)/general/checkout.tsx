import Colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";
import { updateOrder } from "@/functions/order";
import { createPayment, PaymentData } from "@/functions/payments"; // Import the function to check payment status
import { ProfileResponse } from "@/functions/profile";
import { getTransactionById } from "@/functions/transaction";
import { getUserWallet, makepaymentWithWallet, WalletPaymentResponse, WalletResponse } from "@/functions/wallet";
import { IAppState } from "@/store/interface";
import { useRouter } from "expo-router";
import React, { useEffect, useState, useCallback, useMemo } from "react";
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
  Alert,
} from "react-native";
import Toast from "react-native-toast-message";
import { useDispatch, useSelector } from "react-redux";

const Page = () => {
  const [countryCode] = useState("+237");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [type, setType] = useState("MOBILE MONEY");
  const router = useRouter();
  const dispatch = useDispatch();
  const token = useSelector((state: IAppState) => state.systemPersist.token);
  const order: any = useSelector(
    (state: IAppState) => state.systemPersist.order
  );
  const [loading, setLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<string | null>(null);
  const [wallet, setWallet] = useState<WalletResponse | null>(null);

  const DATA = useMemo(
    () => [
      { id: "1", title: "MOBILE MONEY" },
      { id: "2", title: "WALLET" },
      { id: "3", title: "CASH" },
    ],
    []
  );

  useEffect(() => {
    setType("MOBILE MONEY");
    onGetUserWallet();
  }, []);

  console.log(order);

  const handlePayment = async () => {
    if (!token) {
      Alert.alert("Error", "User not authenticated");
      return;
    }

    const paymentData: PaymentData = {
      orderId: order._id,
      amount: 2,
      from: countryCode + phoneNumber,
      currency: "XAF",
      status: "PENDING",
    };

    try {
      setLoading(true);

      if (type === 'MOBILE MONEY') {
        const paymentResponse = await createPayment(paymentData, token);
        setPaymentStatus(paymentResponse.message);
        if (paymentResponse.message === "Payment is awaiting user confirmation") {
          Alert.alert(
            "Info",
            "Payment is pending confirmation. Please check your payment app."
          );
          console.log(paymentResponse);
          monitorPaymentStatus(paymentResponse.details.transactionId);
        } else if (paymentResponse.message === "Payment successful") {
          Alert.alert("Success", "Your payment was successful");
          router.push("/(authenticated)/(tabs)/orders");
          setLoading(false);
        } else {
          Alert.alert("Error", "Payment failed or not confirmed.");
          setLoading(false);
        }
      } else if (type === 'WALLET') {
        const paymentDta: WalletPaymentResponse = {
          amount: order.total_amount,
          orderId: order._id
        }
        if (wallet!.main_balance >= order.total_amount) {
          const WalletPaymentResponse = await makepaymentWithWallet(paymentDta, token as string, wallet!.id)        
          if (WalletPaymentResponse.message === 'Payment is successful') {
            setLoading(false)
            Alert.alert("Success", "Your payment was successful");
            router.push("/(authenticated)/(tabs)/orders");
            setLoading(false);            
          } else {
            Alert.alert("Error", "Payment failed! Please try again.");
            setLoading(false);
          }
        } else {
          setLoading(false)
          Alert.alert("Error", "Insufficient wallet balance")
        }
      } else {
        setLoading(false)
        router.push("/(authenticated)/(tabs)/orders");
      }
    } catch (error: any) {
      Alert.alert("Error", error.message);
      console.error("Payment error:", error);
      setLoading(false);
    }
  };

  const onGetUserWallet = async () => {
    setLoading(true);
    if (token) {
      try {
        const response = await getUserWallet(token);
        console.log('wallet: ', response);
        setWallet(response);
      } catch (error) {
        console.error("Error fetching user's wallet:", error);
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "Error fetching user's wallet",
        });
      } finally {
        setLoading(false);
      }
    } else {
      alert("No token found");
      setLoading(false);
    }
  };

  const monitorPaymentStatus = (paymentId: string) => {
    console.log(paymentId);
    const interval = setInterval(async () => {
      try {
        const statusResponse = await getTransactionById(paymentId, token!);
        console.log(statusResponse);
        if (statusResponse.status === "SUCCESSFUL") {
          setLoading(false);
          clearInterval(interval);
          Alert.alert("Success", "Your payment was successful.");
          router.push("/(authenticated)/(tabs)/home"); // Navigate to the home screen
        } else if (statusResponse.status === "FAILED") {
          setLoading(false);
          clearInterval(interval);
          Alert.alert("Error", "Payment failed. Please try again.");
        }
      } catch (error) {
        setLoading(false);
        clearInterval(interval);
        Alert.alert("Error", "Failed to check payment status.");
        console.error("Payment status error:", error);
      }
    }, 3000); // Check every 3 seconds
  };

  const renderItem = useCallback(
    ({ item }: { item: { title: string } }) => (
      <TouchableOpacity
        onPress={() => setType(item.title)}
        style={[
          styles.item,
          type === item.title
            ? { backgroundColor: Colors.primary }
            : { backgroundColor: Colors.primaryMuted },
        ]}
      >
        <Text style={styles.title}>{item.title}</Text>
      </TouchableOpacity>
    ),
    [type]
  );

  const renderTextInput = (placeholder: string) => (
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
        placeholder={placeholder}
        placeholderTextColor={Colors.gray}
        keyboardType="numeric"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
      />
    </View>
  );

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="padding"
      keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
    >
      <View style={defaultStyles.container}>
        <Text style={styles.header}>Checkout Now</Text>
        {type === '' && <Text style={styles.descriptionText}>
          Select payment option below
        </Text>}
        {type === 'MOBILE MONEY' && <Text style={styles.descriptionText}>
          Enter your MOBILE MONEY Number below
        </Text>}
        {type === 'WALLET' && <Text style={styles.descriptionText}>
          Pay from your wallet balance
        </Text>}
        {type === 'CASH' && <Text style={styles.descriptionText}>
          You have selected Cash on delivery
        </Text>}

        <FlatList
          contentContainerStyle={styles.flatListContainer}
          showsHorizontalScrollIndicator={false}
          horizontal
          data={DATA}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />

        {type === 'MOBILE MONEY' &&<View>
          {renderTextInput("Mobile number")}
        </View>}

        {type === 'WALLET' &&<View>
          {order.total_amount >= wallet!.main_balance && <Text style={{textAlign: 'center', fontSize: 20, marginTop: 10}}>Your wallet balance must be more than {order.total_amount.toFixed(2)} XAF</Text>}
          <Text style={styles.amountInWallet}>{wallet?.main_balance.toFixed(2)} XAF</Text>
        </View>}

        {type === 'CASH' && <View>
          <Text style={{textAlign: 'center', fontSize: 20, marginTop: 10}}>You confirm that you will pay {order.total_amount} XAF when the product is delivered</Text>  
        </View>}

        <View style={{ flex: 1 }} />

        {type === 'MOBILE MONEY' &&<TouchableOpacity
          style={[
            styles.pillButton,
            phoneNumber.length >= 9 ? styles.enabled : styles.disabled,
            { marginBottom: 20 },
          ]}
          disabled={phoneNumber.length < 9}
          onPress={handlePayment}
        >
          {!loading ? (
            <Text style={styles.buttonText}>PAY FROM YOUR {type}</Text>
          ) : (
            <ActivityIndicator color={"white"} size={32} />
          )}
        </TouchableOpacity>}

        {type === 'WALLET' && (
            <TouchableOpacity
              style={[
                styles.pillButton,
                wallet!.main_balance > order.total_amount ? styles.enabled : styles.disabled,
                { marginBottom: 20 },
              ]}
              disabled={wallet!.main_balance <= order.total_amount}
              onPress={handlePayment}
            >
              {!loading ? (
                <Text style={styles.buttonText}>PAY FROM {type}</Text>
              ) : (
                <ActivityIndicator color="white" size={32} />
              )}
            </TouchableOpacity>
          )}

        {type === 'CASH' &&<TouchableOpacity
          style={[
            styles.pillButton,
            styles.enabled,
            { marginBottom: 20 },
          ]}
          onPress={handlePayment}
        >
          {!loading ? (
            <Text style={styles.buttonText}>{type} ON DELIVERY</Text>
          ) : (
            <ActivityIndicator color={"white"} size={32} />
          )}
        </TouchableOpacity>}
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 28,
    fontWeight: "bold",
    color: Colors.primary,
    textAlign: "center",
    marginBottom: 10,
    paddingTop: 40,
  },
  descriptionText: {
    fontSize: 16,
    color: Colors.gray,
    textAlign: "center",
    marginBottom: 20,
  },
  flatListContainer: {
    alignItems: "flex-start",
    justifyContent: "center",
    marginTop: 25,
  },
  item: {
    width: 160,
    height: 80,
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
  },
  inputContainer: {
    marginVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    borderColor: Colors.primaryMuted,
    borderWidth: 1,
    borderRadius: 16,
    backgroundColor: Colors.lightGray,
  },
  input: {
    padding: 20,
    fontSize: 18,
    color: Colors.border,
    flex: 1,
  },
  code: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    borderRightColor: Colors.primaryMuted,
    borderRightWidth: 1,
    borderRadius: 16,
    backgroundColor: Colors.lightGray,
  },
  flag: {
    width: 30,
    height: 20,
    marginRight: 8,
  },
  c_Code: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.border,
  },
  pillButton: {
    borderRadius: 50,
    paddingVertical: 15,
    paddingHorizontal: 25,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20,
  },
  enabled: {
    backgroundColor: Colors.primary,
  },
  disabled: {
    backgroundColor: Colors.primaryMuted,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
  },
  amountInWallet : {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#32CD32', 
    textAlign: 'center',
    marginTop: 5,
  }
});

export default Page;
