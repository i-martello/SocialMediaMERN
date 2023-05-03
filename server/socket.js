import { Server } from "socket.io";
import commentSchema from './src/models/comment.js';

export const socketFunction = (server) => {
  const io = new Server(server, {
    cors: {
      origin: 'http://localhost:3000'
    }
  });

  io.on("connection", async (socket) => {
    console.log("Nuevo usuario conectado");
      const comentarios = await commentSchema.find({}).sort({ createdAt: -1 });
      io.emit("comments", comentarios);
      
      socket.on("comments", async(msg)=> {
        const newComment = await new commentSchema(msg);
        await newComment.save();
        const comentarios = await commentSchema.find({}).sort({ createdAt: -1 });
        console.log(comentarios);
        io.emit("newcomments", comentarios);
      } )
  });
  
};
