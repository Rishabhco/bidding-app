const express=require("express");
const http=require("http");
const app=express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const PORT=4000;

const socketIO = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:3000"
    }
});

const generateID=()=>Math.random().toString(36).substring(2,10);
let productList=[];

socketIO.on('connection', (socket) => {
    console.log(`⚡: ${socket.id} user just connected!`);

    socket.on("addProduct",(product)=>{
        productList.unshift({
            id:generateID(),
            name:product.name,
            price:product.price,
            image_url:product.url,
            owner:product.user
        })
        socket.emit("getProducts",productList);
    })

    socket.on('disconnect', () => {
      socket.disconnect()
      console.log('🔥: A user disconnected');
    });
});

app.get("/",(req,res)=>{
    res.json({
        msg:"Hello World!!"
    });
})

app.get("/products",(req,res)=>{
    res.json(productList);
})

app.listen(PORT,()=>{
    console.log("Server is running on port "+PORT);
})