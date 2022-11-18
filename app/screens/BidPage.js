import {
    View,
    Text,
    SafeAreaView,
    Image,
    Button,
    FlatList,
} from "react-native";
import React, { useEffect, useLayoutEffect,useState } from "react";
import Modal from "./Modal";
import ProductUI from "./ProductUI";
import {styles} from "../utils/styles";
import { Entypo } from "@expo/vector-icons";
import socket from "../utils/socket";

const BidPage = ({ navigation }) => {
    const [visible, setVisible] = useState(false);
    const [products,setProducts]=useState([]);
    const [selectedProduct, setSelectedProduct] = useState({});

    const toggleModal = (name, price, id) => {
        setVisible(true);
        setSelectedProduct({ name, price, id });
    };

    useLayoutEffect(()=>{
        function fetchProducts(){
            fetch("http://localhost:4000/products")
            .then((res)=>res.json())
            .then((data)=>setProducts(data))
            .catch((err)=>console.log(err));
        }
        fetchProducts();
    },[]);

    useEffect(()=>{
        socket.on("getProducts",(data)=>{console.log(data);setProducts(data)});
    },[socket]);

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
                <FlatList data={products} key={(item)=>item.id} renderItem={({item})=>(
                    <ProductUI 
                        name={item.name} 
                        image_url={item.image_url} 
                        price={item.price} 
                        toggleModal={toggleModal} 
                        id={item.id}
                    />
                    )}
                />
            </View>
            {visible ? (<Modal visible={visible} setVisible={setVisible} selectedProduct={selectedProduct} /> ): ("")}
        </SafeAreaView>
    );
};

export default BidPage;