import { View, Text, TextInput, Pressable } from "react-native";
import {styles} from "../utils/styles";
import React, { useState } from "react";
import symbolicateStackTrace from "react-native/Libraries/Core/Devtools/symbolicateStackTrace";
import socket from "../utils/socket";

const Modal = ({ setVisible,selectedProduct }) => {
    const [newPrice, setNewPrice] = useState(selectedProduct.price);
    const [user,setUser]=useState("");

    const updateBidFunction=()=>{
        if(Number(newPrice)>Number(selectedProduct.price)){
            socket.emit("updatePrice",{newPrice,user,selectedProduct});
            setVisible(false);
        }else{
            Alert.alert("Error!,New price must be more than the bidding price");
        }
    }

    return (
        <View style={styles.modalContainer}>
            <Text style={styles.modalHeader}>Update Bid</Text>
            <Text style={{ marginBottom: 10 }}>Name: {selectedProduct.name}</Text>
            <Text style={{ marginBottom: 10 }}>Price</Text>
            <TextInput
                keyboardType='number-pad'
                style={styles.modalPrice}
                defaultValue={selectedProduct.price}
                onChangeText={(value) => setNewPrice(value)}
            />
            <View style={{ width: "100%", alignItems: "center" }}>
                <Pressable
                    style={styles.updateBidBtn}
                    onPress={() => {updateBidFunction}}
                >
                    <View>
                        <Text style={{ color: "#fff", fontSize: 16, textAlign: "center" }}>
                            PLACE BID
                        </Text>
                    </View>
                </Pressable>
            </View>
        </View>
    );
};

export default Modal;