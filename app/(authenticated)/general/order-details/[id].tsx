import Loader from '@/components/loader';
import Colors from '@/constants/Colors';
import { cancelOrder, getOrderById, Order } from '@/functions/order';
import { IAppState } from '@/store/interface';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Modal } from 'react-native';
import QRCode from "react-native-qrcode-svg";
import Toast from 'react-native-toast-message';
import { useSelector, useDispatch } from 'react-redux';
import { setOrder } from "@/store/system_persist";

const OrderDetails = () => {
  const [orderDetails, setOrderDetails] = useState<Order | null>(null);
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const token = useSelector((state: IAppState) => state.systemPersist.token);
  const dispatch = useDispatch();
  const [showQrCode, setShowQrCode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setModalVisible] = useState(false);

  const fetchOrderDetails = async () => {
    try {
      const fetchedOrder = await getOrderById(id as string, token as string);
      setOrderDetails(fetchedOrder.order);
      setLoading(false);
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Failed to fetch order details.",
      });
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrderDetails();
  }, [id]);

  const handleConfirmDelivery = () => {
    // Open the modal
    if (orderDetails?.paymentType === 'CASH ON DELIVERY') {
      setModalVisible(true);
    } else {
      router.push({
        pathname: "/general/scan_qrcode",
        params: {
          orderId: orderDetails?._id
        }
      })
    }
  };

  const handlePaymentConfirmation = (isPaid: boolean) => {
    setModalVisible(false);
    if (isPaid) {
      // Redirect to scan QR code screen
      router.push({
        pathname: "/general/scan_qrcode",
        params: {
          orderId: orderDetails?._id,
        },
      });
    } else {
      // Show a toast that payment is required
      Toast.show({
        type: 'error',
        text1: 'Payment Pending',
        text2: 'Please let the customer pay first before you deliver.',
      });
    }
  };

  return (
    <ScrollView style={styles.container}>
      {orderDetails && <View>
      {showQrCode ? (
        <View style={styles.qrCodeContainer}>
      </View>
      ) : (
        <View>
      <View style={styles.header}>
          <Text style={styles.invoice}>Invoice: {orderDetails?.orderNumber}</Text>
        </View>

        {/* Service Details */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          contentContainerStyle={styles.horizontalScrollContainer}
        >
          {/* Gas Delivery */}
          {orderDetails?.gas?.length > 0 && (
            <View style={styles.itemDetails}>
              <Text style={styles.serviceName}>Gas Delivery</Text>
              {orderDetails.gas.map((gasItem, index) => (
                <View key={index} style={styles.serviceDetail}>
                  <Text style={styles.detailText}>Brand: {gasItem.brand}</Text>
                  <Text style={styles.detailText}>Bottle Size: {gasItem.bottle_size}</Text>
                  <Text style={styles.detailText}>Qty: {gasItem.qty}</Text>
                </View>
              ))}
            </View>
          )}

          {/* Food Delivery */}
          {orderDetails?.food?.length > 0 && (
            <View style={styles.itemDetails}>
              <Text style={styles.serviceName}>Food Delivery</Text>
              {orderDetails.food.map((foodItem, index) => (
                <View key={index} style={styles.serviceDetail}>
                  <Text style={styles.detailText}>Food: {foodItem.name}</Text>
                  <Text style={styles.detailText}>Restaurant: {orderDetails?.restaurant?.name || 'Unknown'}</Text>
                  <Text style={styles.detailText}>Qty: {foodItem.qty}</Text>
                </View>
              ))}
            </View>
          )}

          {/* Laundry Delivery */}
          {orderDetails?.laundry?.length > 0 && (
            <View style={styles.itemDetails}>
              <Text style={styles.serviceName}>Laundry Delivery</Text>
              {orderDetails.laundry.map((laundryItem, index) => (
                <View key={index} style={styles.serviceDetail}>
                  <Text style={styles.detailText}>Item: {laundryItem.item}</Text>
                  <Text style={styles.detailText}>Qty: {laundryItem.qty}</Text>
                </View>
              ))}
            </View>
          )}

          {/* Garbage Collection */}
          {orderDetails?.garbage?.length > 0 && (
            <View style={styles.itemDetails}>
              <Text style={styles.serviceName}>Garbage Collection</Text>
              {orderDetails.garbage.map((garbageItem, index) => (
                <View key={index} style={styles.serviceDetail}>
                  <Text style={styles.detailText}>Type: {garbageItem.type}</Text>
                  <Text style={styles.detailText}>Qty: {garbageItem.qty}</Text>
                </View>
              ))}
            </View>
          )}
        </ScrollView>

        {/* Order Status */}
        <View style={styles.statusContainer}>
          <View style={styles.statusItem}>
          <Text>
            Order Status: <Text style={[
              styles.totalText,
              orderDetails?.amount_payment_status === 'COMPLETED'
                ? styles.successText
                : orderDetails?.amount_payment_status === 'PENDING'
                ? styles.warningText
                : styles.dangerText,
            ]}>{orderDetails?.status}</Text>
          </Text>
            <Text style={styles.timeText}>{new Date(orderDetails?.createdAt!).toLocaleString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
              month: "2-digit",
              day: "2-digit",
              year: "numeric",
            })}</Text>
          </View>
        </View>

        {/* Delivery Address */}
        <View style={styles.deliveryContainer}>
          <Text style={styles.deliveryTitle}>Delivery Address</Text>
          <Text style={styles.deliveryText}>Name: {orderDetails?.address?.name}</Text>
          <Text style={styles.deliveryText}>Popular Place: {orderDetails?.address?.popular_place}</Text>
          <Text style={styles.deliveryText}>Address Type: {orderDetails?.address?.address_type}</Text>
        </View>

        <View style={styles.totalContainer}>
          <Text style={styles.totalTitle}>Total Amount</Text>
          <Text style={styles.totalText}>{orderDetails?.currency} {orderDetails?.total_amount}</Text>
        </View>

        <View style={styles.totalContainer}>
          <Text style={styles.totalTitle}>Payment status</Text>
          <Text
            style={[
              styles.totalText,
              orderDetails?.amount_payment_status === 'COMPLETED'
                ? styles.successText
                : orderDetails?.amount_payment_status === 'PENDING'
                ? styles.warningText
                : styles.dangerText,
            ]}
          >
            {orderDetails?.amount_payment_status}
          </Text>
        </View>

        {orderDetails.paymentType === 'CASH ON DELIVERY' && <View style={styles.totalContainer}>
          <Text style={styles.totalTitle}>Payment Type</Text>
          <Text
            style={styles.totalText}
          >
            {orderDetails?.paymentType}
          </Text>
        </View>}

      {orderDetails?.status === 'ACCEPTED' && <View style={styles.totalContainer}>
        <Text style={styles.totalTitle}>Delivery time</Text>
        <Text style={styles.totalText}>20mins</Text>
      </View>}

        <View style={{marginBottom: 50}}>
        {(orderDetails?.status === 'ACCEPTED') && <TouchableOpacity onPress={() => {
                    router.push({
                      pathname: "/general/tracking",
                      params: {
                        lat: orderDetails?.address?.lat,
                        lng: orderDetails?.address?.lng,
                        driver: orderDetails?.driver
                      },
                    });
                  }} style={styles.buttonPay}>
          <Text style={styles.buttonText}> Follow route</Text>
        </TouchableOpacity>}

        {(orderDetails?.status !== 'DELIVERED') && <TouchableOpacity onPress={handleConfirmDelivery} style={styles.buttonPay}>
          <Text style={styles.buttonText}>Confirm Delivery</Text>
        </TouchableOpacity>}
        </View>
     </View>
      )}  
      </View>  }    
      {loading ? <Loader /> : undefined}

      {/* Payment Confirmation Modal */}
      <Modal
        transparent={true}
        visible={isModalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Has the customer paid?</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.modalButtonConfirm}
                onPress={() => handlePaymentConfirmation(true)}
              >
                <Text style={styles.modalButtonText}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalButtonCancel}
                onPress={() => handlePaymentConfirmation(false)}
              >
                <Text style={styles.modalButtonText}>No</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  invoice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  horizontalScrollContainer: {
    flexDirection: 'row',
  },
  itemDetails: {
    marginRight: 20,
  },
  serviceName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  serviceDetail: {
    marginBottom: 5,
  },
  detailText: {
    fontSize: 14,
    color: '#666',
  },
  statusContainer: {
    flex: 1,
    marginTop: 20,
  },
  statusItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  timeText: {
    fontSize: 14,
    color: '#999',
    marginLeft: 10,
  },
  deliveryContainer: {
    marginTop: 20,
  },
  deliveryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  deliveryText: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  totalContainer: {
    marginTop: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  totalTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  successText: {
    color: '#32CD32', 
    fontWeight: 'bold'
  },
  warningText: {
    color: '#FFA500', 
    fontWeight: 'bold'
  },
  dangerText: {
    color: '#FF4E4E', 
    fontWeight: 'bold'
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.light,
  },
  buttonPay: {
    backgroundColor: '#50C878',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonCan: {
    backgroundColor: '#FF4E4E',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  qrCodeContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.white,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButtonConfirm: {
    backgroundColor: '#50C878',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginRight: 10,
    alignItems: 'center',
  },
  modalButtonCancel: {
    backgroundColor: '#FF4E4E',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginLeft: 10,
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default OrderDetails;
