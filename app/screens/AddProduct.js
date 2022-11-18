import { View, Text, SafeAreaView, TextInput, Pressable } from "react-native";
import React, { useState, useLayoutEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { styles } from "../utils/styles";
import socket from "../utils/socket";

const AddProduct = ({ navigation }) => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [url, setURL] = useState("");
    const [user, setUser] = useState("");

    const getUsername = async () => {
        try {
            const value = await AsyncStorage.getItem("username");
            if (value !== null) {
                setUser(value);
            }
        } catch (e) {
            console.error("Error while loading username!");
        }
    };

    useLayoutEffect(() => {
        getUsername();
    }, []);

    const addProduct = () => {
        if (name.trim() && price.trim() && url.trim()) {
            console.log({ name, price, url, user });
            socket.emit("addProduct",{name,price,url,user});
            navigation.navigate("BidPage");
        }
    };

    return (
        <SafeAreaView style={styles.addProductContainer}>
            <View style={styles.productForm}>
                <Text>Product Name</Text>
                <TextInput
                    style={styles.formInput}
                    onChangeText={(value) => setName(value)}
                />

                <Text>Product Price</Text>
                <TextInput
                    style={styles.formInput}
                    onChangeText={(value) => setPrice(value)}
                />

                <Text>Product Image URL</Text>
                <TextInput
                    style={styles.formInput}
                    keyboardType='url'
                    onChangeText={(value) => setURL(value)}
                    autoCapitalize='none'
                    autoCorrect={false}
                />

                <Pressable style={styles.addProductBtn} onPress={addProduct}>
                    <View>
                        <Text style={{ color: "#fff", fontSize: 16, textAlign: "center" }}>
                            ADD PRODUCT
                        </Text>
                    </View>
                </Pressable>
            </View>
        </SafeAreaView>
    );
};

export default AddProduct;