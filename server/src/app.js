import express from "express";
import http from "http";
const socketIO = require("socket.io");

import messages from "./routes/api/v1/messages/wsMessages";

import "dotenv/config";
import middlewareConfig from "./config/middlewareConfig";
import connectionFactory from "./config/database";
connectionFactory();
import routes from "./routes/api/v1";
const app = express();
middlewareConfig(app);

app.use("/api", routes.addClient);
app.use("/api", routes.getClient);
app.use("/api", routes.authClient);
app.use("/api", routes.addAccount);
app.use("/api", routes.getAccount);
app.use("/api", routes.addMessage);
app.use("/api", routes.getMessage);
app.use("/api", routes.getConversation);
app.use("/api", routes.getTotalConversation);

const server = app.listen(process.env.PORT, () =>
  console.log(
    `Server running at http://${process.env.HOST}:${process.env.PORT}/`
  )
);

// let io = socketIO.listen(server);

// io.on("connection", (socket) => {
//   console.log("New client connected " + socket.id);

//   socket.on("sendPayload", (payload) => {
//     return new Promise((resolve) => {
//       //  socket.emit("getSchema", resolve);
//       let response = messages.postMessage(payload);
//     });
//   });

//   socket.emit("getPayload", "");

//   socket.on("disconnect", () => {
//     console.log("user disconnected");
//   });
// });
