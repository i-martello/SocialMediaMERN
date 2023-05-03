import "./database.js";
import cors from "cors";
import { config } from "dotenv";
import express from "express";
import indexRoutes from "./src/routes/index.routes.js";
import usersRoutes from "./src/routes/users.routes.js";
import cookieParser from "cookie-parser";
import http from "http";
import { socketFunction } from "./socket.js";

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  optionSuccessStatus: 200,
};
const app = express();
config();


app.set("port", process.env.PORT || 5000);

// middlewares
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use(indexRoutes);
app.use(usersRoutes);

const server = http.createServer(app);
socketFunction(server);


server.listen(app.get("port"), () => console.log("server andando joya"));
