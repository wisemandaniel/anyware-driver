import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // For icons
import { Platform } from 'react-native';

const Page = () => {
    const phoneNumber = "237678313613";
    const whatsappGroupUrl = "https://chat.whatsapp.com/GjuJhdRNNgg6P9adJvvXB0";
    const telegramGroupUrl = "https://t.me/+wCVZf6btswExMjI8";

    const handleWhatsAppPress = async () => {
        let msg = "Hello AnyWare Delivery";

        let mobile =
            Platform.OS == "ios" ? phoneNumber : "+" + phoneNumber;
        if (mobile) {
            if (msg) {
            let url = "whatsapp://send?text=" + msg + "&phone=" + mobile;
            Linking.openURL(url)
                .then(data => {
                console.log("WhatsApp Opened");
                })
                .catch(() => {
                alert("Make sure WhatsApp installed on your device");
                });
            } else {
            alert("Please insert message to send");
            }
        } else {
            alert("Please insert mobile no");
        }
    };

    // Function to handle Telegram click
    const handleTelegramPress = async () => {
        let msg = "Hello AnyWare Delivery"; // Message text
        let username = "anyware_official";  // Replace with the Telegram username

        if (username && msg) {
            // Telegram URL scheme for opening a chat with a specific username
            let url = `tg://resolve?domain=${username}`;

            // Try opening Telegram with the given URL
            Linking.openURL(url)
                .then(() => {
                    console.log("Telegram opened successfully");
                })
                .catch(() => {
                    Alert.alert("Error", "Make sure Telegram is installed on your device.");
                });
        } else {
            Alert.alert("Error", "Please provide a valid username.");
        }
    };

    // Function to handle Call click
    const handleCallPress = () => {
        const url = `tel:${phoneNumber}`;
        Linking.openURL(url);
    };

// Function to open WhatsApp group
const handleWhatsAppGroupPress = async () => {
    try {
        await Linking.openURL(whatsappGroupUrl);
    } catch (error) {
        console.error("Error opening WhatsApp group: ", error);
        Alert.alert("An error occurred while trying to open the WhatsApp group");
    }
};

 // Function to open WhatsApp group
const handleTelegramGroupPress = async () => {
    try {
        await Linking.openURL(telegramGroupUrl);
    } catch (error) {
        console.error("Error opening WhatsApp group: ", error);
        Alert.alert("An error occurred while trying to open the WhatsApp group");
    }
};

    return (
        <View style={styles.container}>
            {/* Profile Picture */}
            <View style={styles.profileContainer}>
                <Image
                    source={require('@/assets/images/logo.png')} // Replace with actual image URL
                    style={styles.profileImage}
                />
                <Text style={styles.nameText}>AnyWare Delivery</Text>
            </View>

            {/* Action Buttons */}
            <View style={styles.actionContainer}>
                <TouchableOpacity onPress={handleCallPress} style={styles.actionButton}>
                    <Ionicons name="call-outline" size={24} color="#007AFF" />
                    <Text style={styles.actionText}>Call</Text>
                </TouchableOpacity>
            </View>

            {/* Contact Information */}
            <View style={styles.infoContainer}>
                <Text style={styles.infoLabel}>Mobile | Cameroon</Text>
                <Text style={styles.infoText}>(+237) 678313613</Text>
            </View>

            {/* WhatsApp Section */}
            <TouchableOpacity onPress={handleWhatsAppPress} style={styles.contactMethodContainer}>
                <Ionicons name="logo-whatsapp" size={24} color="#25D366" />
                <Text style={styles.contactMethodText}>WhatsApp</Text>
            </TouchableOpacity>

            {/* Telegram Section */}
            <TouchableOpacity onPress={handleTelegramPress} style={styles.contactMethodContainer}>
                <Ionicons name="paper-plane-outline" size={24} color="#0088cc" />
                <Text style={styles.contactMethodText}>Telegram</Text>
            </TouchableOpacity>

            {/* WhatsApp Group Card */}
            <TouchableOpacity onPress={handleWhatsAppGroupPress} style={styles.groupContainer}>
                <Ionicons name="logo-whatsapp" size={24} color="#25D366" />
                <Text style={styles.groupText}>Join Our WhatsApp Group</Text>
            </TouchableOpacity>

            {/* Telegram Group Card */}
            <TouchableOpacity onPress={handleTelegramGroupPress} style={styles.groupContainer}>
                <Ionicons name="paper-plane-outline" size={24} color="#0088cc" />
                <Text style={styles.groupText}>Join Our Telegram Group</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f7f7f7',
        padding: 20,
    },
    profileContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
    },
    nameText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#333',
    },
    actionContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20,
    },
    actionButton: {
        alignItems: 'center',
    },
    actionText: {
        fontSize: 14,
        color: '#007AFF',
        marginTop: 5,
    },
    infoContainer: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 2 },
        elevation: 3,
    },
    infoLabel: {
        fontSize: 12,
        color: '#888',
        marginBottom: 5,
    },
    infoText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#333',
    },
    contactMethodContainer: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        borderRadius: 10,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 2 },
        elevation: 3,
    },
    contactMethodText: {
        fontSize: 16,
        marginLeft: 10,
        color: '#333',
    },
    groupContainer: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        borderRadius: 10,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 2 },
        elevation: 3,
    },
    groupText: {
        fontSize: 16,
        marginLeft: 10,
        color: '#333',
    },
});

export default Page;
