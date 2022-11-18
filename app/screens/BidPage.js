import {
    View,
    Text,
    SafeAreaView,
    Image,
    Button,
} from "react-native";
import React, { useState } from "react";
import Modal from "./Modal";
import {styles} from "../utils/styles";
import { Entypo } from "@expo/vector-icons";

const BidPage = ({ navigation }) => {
    const [visible, setVisible] = useState(false);

    const toggleModal = () => setVisible(!visible);

    return (
        <SafeAreaView style={styles.bidContainer}>
            <View style={styles.headerContainer}>
                <Text style={styles.header}>Place Bids</Text>
                <Entypo
                    name='circle-with-plus'
                    size={30}
                    color='green'
                    onPress={() => navigation.navigate("AddProduct")}
                />
            </View>

            <View style={styles.mainContainer}>
                <View style={styles.productContainer}>
                    <Image
                        style={styles.image}
                        resizeMode='contain'
                        source={{
                            uri: "https://stimg.cardekho.com/images/carexteriorimages/930x620/Tesla/Model-S/5252/1611840999494/front-left-side-47.jpg?tr=w-375",
                        }}
                    />
                    <View style={styles.productDetails}>
                        <Text style={styles.productName}>Tesla Model S</Text>
                        <View>
                            <Text style={styles.productPrice}>Current Price: $40000</Text>
                        </View>

                        <Button title='Place Bid' onPress={toggleModal} />
                    </View>
                </View>
            </View>
            {visible ? <Modal visible={visible} setVisible={setVisible} /> : ""}
        </SafeAreaView>
    );
};

export default BidPage;