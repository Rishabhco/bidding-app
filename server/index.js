const express=require("express");
const app=express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const PORT=4000;

const socketIO = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:3000"
    }
});

socketIO.on('connection', (socket) => {
    console.log(`⚡: ${socket.id} user just connected!`);

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

app.listen(PORT,()=>{
    console.log("Server is running on port "+PORT);
})