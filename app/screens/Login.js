import React, {useState} from "react";
import{
    View,Text,SafeAreaView,TextInput,Pressable,Alert
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {styles} from "../utils/styles";

const Login=({navigation})=>{
    const [username,setUsername]=useState("");
    const storeUsername=async()=>{
        try{
            await AsyncStorage.setItem("username",username);
            navigation.navigate("BidPage");
        }catch(e){
            Alert.alert("Error! While saving username");
        }
    };

    const handleLogin=()=>{
        if(username.trim()){
            console.log({username});
            storeUsername();
        }else{
            Alert.alert("Username is required");
        }
    };

    return(
        <SafeAreaView style={styles.loginContainer}>
            <Text style={styles.heading}>Login</Text>
            <View style={styles.formContainer}>
                <Text style={styles.formLabel}>Username</Text>
                <TextInput placeholder='Enter your name' style={styles.input} autoCorrect={false} onChangeText={(value)=>setUsername(value)}/>
                <Pressable style={styles.loginbutton} onPress={handleLogin}>
                    <View>
                        <Text style={styles.loginbuttonText}>Get Started</Text>
                    </View>
                </Pressable>
            </View>
        </SafeAreaView>
    );
}

export default Login;