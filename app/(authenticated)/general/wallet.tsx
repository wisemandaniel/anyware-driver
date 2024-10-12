import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, Modal, TextInput, Button, Alert } from 'react-native';
import Toast from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/Feather';
import { useSelector } from 'react-redux';
import { getUserProfile, ProfileResponse } from '@/functions/profile';
import { getUserWallet, topUpAccount, WalletResponse, withdrawFromMainBalance } from '@/functions/wallet';
import { IAppState } from '@/store/interface';
import Colors from '@/constants/Colors';
import { router } from 'expo-router';
import { getTransactionById } from '@/functions/transaction';

const Page = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [amount, setAmount] = useState('');

  const token = useSelector((state: IAppState) => state.systemPersist.token);
  const [user, setUser] = useState<ProfileResponse | null>(null);
  const [wallet, setWallet] = useState<WalletResponse | null>(null);

  const [isWithdrawalModalVisible, setIsWithdrawalModalVisible] = useState(false);
  const [withdrawPhoneNumber, setWithdrawPhoneNumber] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');


  const onGetUserWallet = async () => {
    setIsLoading(true);
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
        setIsLoading(false);
      }
    } else {
      alert("No token found");
      setIsLoading(false);
    }
  };

  const onGetUserProfile = async () => {
    setIsLoading(true);
    if (token) {
      try {
        const response = await getUserProfile(token);
        console.log('response: ', response.referrals);
        
        setUser(response);
      } catch (error) {
        console.error("Error fetching user profile:", error);
        Toast.show({
          type: "error",
          text1: "Error",
          text2: 'Error fetching user profile',
        });
      } finally {
        setIsLoading(false);
      }
    } else {
      alert("No token found");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    onGetUserWallet();
    onGetUserProfile();
  }, []);

  const handleTopUp = () => {
    setIsModalVisible(true);
  };

  const handleWithdrawalSubmit = async () => {
    const account: any = {
      amount: parseInt(withdrawAmount),
      to: withdrawPhoneNumber,
      currency: "XAF"
    }
    
    setIsLoading(true);
    if (withdrawPhoneNumber) {
      try {
        await withdrawFromMainBalance(account, token as string, wallet?.id as string).then((res) => {
          if (res.message === "Withdrawal has been initiated") {
            monitorWithdrawalStatus(res.details.transactionId);
          } else if (res.message === "Withdrawal is successful and balance deducted") {
            setIsModalVisible(false);
            onGetUserWallet();
            Toast.show({
              type: "success",
              text1: "Successful",
              text1Style: {
                fontSize: 18,
                fontWeight: "bold",
                color: Colors.background,
              },
              text2: `Your withdrawal is successful and ${withdrawAmount} XAF has been deposited into your account`,
            });
            setIsLoading(false);
          } else {
            Alert.alert("Error", "Withrawal failed.");
            setIsLoading(false);
          }
        });
      } catch (error) {
        setIsLoading(false);
        console.log(error);
        Alert.alert("Error", "Failed to withdraw your fund.");
      }
    } else {
      setIsLoading(false);
      Alert.alert("Error", "Please amount should be 2 FCFA");
    }
  };

  const handleWithdrawal = () => {
    setIsWithdrawalModalVisible(true);
  };
  

  const monitorTopUpStatus = (paymentId: string) => {
    console.log(paymentId);
    const interval = setInterval(async () => {
      try {
        const statusResponse = await getTransactionById(paymentId, token!);
        console.log(statusResponse);
        if (statusResponse.status === "SUCCESSFUL") {
          setIsModalVisible(false);
          onGetUserWallet();
          setIsLoading(false);
          clearInterval(interval);
          Toast.show({
            type: "success",
            text1: "Successful",
            text1Style: {
              fontSize: 18,
              fontWeight: "bold",
              color: Colors.background,
            },
            text2: `Top up is successful and ${amount} XAF has been added to your account`,
          });
        } else if (statusResponse.status === "FAILED") {
          setIsModalVisible(false);
          setIsLoading(false);
          clearInterval(interval);
          Toast.show({
            type: "error",
            text1: "Error",
            text1Style: {
              fontSize: 18,
              fontWeight: "bold",
              color: Colors.background,
            },
            text2: 'top up failed. Please try again.',
          });
        }
      } catch (error) {
        setIsLoading(false);
        clearInterval(interval);
        Alert.alert("Error", "Failed to check withdrawal status.");
        console.error("withdrawal status error:", error);
      }
    }, 3000); // Check every 3 seconds
  };

  const monitorWithdrawalStatus = (paymentId: string) => {
    console.log(paymentId);
    const interval = setInterval(async () => {
      try {
        const statusResponse = await getTransactionById(paymentId, token!);
        console.log(statusResponse);
        if (statusResponse.status === "SUCCESSFUL") {
          setIsModalVisible(false);
          setIsWithdrawalModalVisible(false);
          onGetUserWallet();
          setIsLoading(false);
          clearInterval(interval);
          Toast.show({
            type: "success",
            text1: "Successful",
            text1Style: {
              fontSize: 18,
              fontWeight: "bold",
              color: Colors.background,
            },
            text2: `Withdrawal is successful and ${withdrawAmount} XAF has been added to your account`,
          });
        } else if (statusResponse.status === "FAILED") {
          setIsLoading(false);
          clearInterval(interval);
          Alert.alert("Error", "withdrawal failed. Please try again.");
        }
      } catch (error) {
        setIsLoading(false);
        clearInterval(interval);
        Alert.alert("Error", "Failed to check withdrawal status.");
        console.error("withdrawal status error:", error);
      }
    }, 3000); // Check every 3 seconds
  };

  const handleTopUpSubmit = async () => {
    setIsLoading(true);
    if (phoneNumber) {
      try {
        const account: any = {
          amount: parseInt(amount),
          from: phoneNumber,
          currency: "XAF"
        }
        await topUpAccount(account, token as string, wallet?.id as string).then((res) => {
          if (res.message === "Payment is awaiting user confirmation") {
            Alert.alert(
              "Info",
              "Payment is pending confirmation. Please check your payment app."
            );
            monitorTopUpStatus(res.details.transactionId);
          } else if (res.message === "Top up successful and balance updated") {
            setIsModalVisible(false);
            onGetUserWallet();
            Toast.show({
              type: "success",
              text1: "Successful",
              text1Style: {
                fontSize: 18,
                fontWeight: "bold",
                color: Colors.background,
              },
              text2: "You successfully topup your account",
            });
            setIsLoading(false);
          } else {
            Alert.alert("Error", "Topup failed or not confirmed.");
            setIsLoading(false);
          }
        });
      } catch (error) {
        setIsLoading(false);
        console.log(error);
        Alert.alert("Error", "Failed to deposit your fund.");
      }
    } else {
      setIsLoading(false);
      Alert.alert("Error", "Please amount should be 2 FCFA");
    }
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF416C" />
      </View>
    );
  }

  if (!wallet) {
    return (
      <View style={styles.container}>
        <Text>No wallet information available.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.balanceContainer}>
        <Text style={styles.balanceTitle}>Main Balance</Text>
        <Text style={styles.balanceAmount}>XAF {wallet.main_balance.toFixed(2)}</Text>
      </View>

      <View style={styles.balanceContainer}>
        <Text style={styles.balanceTitle}>Referral Balance</Text>
        <Text style={styles.balanceAmount}>XAF {wallet.referral_balance.toFixed(2)}</Text>
      </View>

      <Text style={styles.sectionTitle}>Referred Users</Text>
      <FlatList
        data={user?.referrals} // Assuming you fetch referred users from the wallet object
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.referredUserItem}>
            <Text style={styles.userName}>{item._id}</Text>
            <Text style={styles.userEmail}>{item.phoneNumber}</Text>
          </View>
        )}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<Text style={styles.noReferredUsers}>No referred users yet.</Text>}
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleTopUp}>
          <Icon name="plus-circle" size={20} color="#FFFFFF" />
          <Text style={styles.buttonText}>Top Up</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleWithdrawal}>
          <Icon name="minus-circle" size={20} color="#FFFFFF" />
          <Text style={styles.buttonText}>Withdraw</Text>
        </TouchableOpacity>
      </View>

      {/* Modal for Top Up */}
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={handleModalClose}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Top Up</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Phone Number"
              keyboardType="phone-pad"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter Amount"
              keyboardType="numeric"
              value={amount}
              onChangeText={setAmount}
            />
            <View style={styles.modalButtonContainer}>
              <Button title="Submit" onPress={handleTopUpSubmit} />
              <Button title="Cancel" onPress={handleModalClose} color="red" />
            </View>
          </View>
        </View>
      </Modal>

      {/* Modal for Withdrawal */}
      <Modal
        visible={isWithdrawalModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsWithdrawalModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Withdraw</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Phone Number"
              keyboardType="phone-pad"
              value={withdrawPhoneNumber}
              onChangeText={setWithdrawPhoneNumber}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter Amount"
              keyboardType="numeric"
              value={withdrawAmount}
              onChangeText={setWithdrawAmount}
            />
            <View style={styles.modalButtonContainer}>
              <Button title="Submit" onPress={handleWithdrawalSubmit} />
              <Button title="Cancel" onPress={() => setIsWithdrawalModalVisible(false)} color="red" />
            </View>
          </View>
        </View>
      </Modal>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  balanceContainer: {
    marginBottom: 20,
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#F0F0F0',
    alignItems: 'center',
  },
  balanceTitle: {
    fontSize: 16,
    color: '#7B7B7B',
  },
  balanceAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#32CD32', // Green color for balance
    marginTop: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#7B7B7B',
  },
  referredUserItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#7B7B7B',
  },
  userEmail: {
    fontSize: 14,
    color: '#9B9B9B',
  },
  noReferredUsers: {
    textAlign: 'center',
    color: '#9B9B9B',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E90FF', // Primary button color
    padding: 15,
    borderRadius: 5,
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    marginLeft: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 5,
    marginBottom: 15,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
});

export default Page;
