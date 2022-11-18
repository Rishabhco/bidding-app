import { View, Text, Image, Button } from "react-native";
import React from "react";
import { styles } from "../utils/styles";

const ProductUI = ({ toggleModal, name, image_url, price, id }) => {
    return (
        <View style={styles.productContainer}>
            <Image
                style={styles.image}
                resizeMode='contain'
                source={{
                    uri: image_url,
                }}
            />
            <View style={styles.productDetails}>
                <Text style={styles.productName}>{name}</Text>
                <View>
                    <Text style={styles.productPrice}>Current Price: ${price}</Text>
                </View>

                <Button title='Place Bid' onPress={toggleModal} />
            </View>
        </View>
    );
};

export default ProductUI;