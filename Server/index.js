import express from "express";
import {Server} from "socket.io"
import {createServer} from "http";


const app = express();

const server = createServer(app);

const io = new Server(server , {
  cors:{
    origin:"http://localhost:5173",
  }
})

io.on("connection" , (socket)=>{
  console.log('user connected');

  socket.on('update' , (content)=>{
    
    socket.broadcast.emit('recieve-update' , content);
  })

  
})

app.get('/' , (req , res)=>{
  res.send("pong")
})

server.listen(8080 , ()=>{
  console.log('Server Started 🔥');
  
})

