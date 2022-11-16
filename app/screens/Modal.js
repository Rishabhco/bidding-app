import { View, Text, StyleSheet, TextInput, Pressable } from "react-native";
import React, { useState } from "react";

const Modal = ({ visible, setVisible }) => {
    const [newPrice, setNewPrice] = useState(0);

    return (
        <View style={styles.modalContainer}>
            <Text style={styles.modalHeader}>Update Bid</Text>
            <Text style={{ marginBottom: 10 }}>Price</Text>
            <TextInput
                keyboardType='number-pad'
                style={styles.modalPrice}
                onChangeText={(value) => setNewPrice(value)}
            />
            <View style={{ width: "100%", alignItems: "center" }}>
                <Pressable
                    style={styles.updateBidBtn}
                    onPress={() => {
                        console.log({ newPrice });
                        setVisible(!visible);
                    }}
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