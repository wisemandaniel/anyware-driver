import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stack, useRouter } from "expo-router"
import { useEffect } from "react";

export default function Layout(){

    const router = useRouter()

    // const handleConnected = async () => {
    //     // await AsyncStorage.removeItem("isLogin");
    //     const isConnected = await AsyncStorage.getItem("isLogin");
    //     console.log(isConnected);
    //     if (isConnected == "true") {
    //       router.replace("../(tabs)/");
    //     }
    //   };
    
    //   useEffect(() => {
    //     handleConnected();
    //   }, []);

    return (
        <Stack 
            screenOptions={{
                headerShown: false,
            }} 
        />
    )
}