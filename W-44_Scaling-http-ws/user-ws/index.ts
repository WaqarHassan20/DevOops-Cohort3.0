import { WebSocketServer, WebSocket as WebSocketWsType } from "ws";

// Create a WebSocket server running on port 8080
const wss = new WebSocketServer({ port: 8081 });

// Define a Room interface containing an array of connected sockets
interface Room {
  sockets: WebSocketWsType[];
}

// Object that stores rooms with their connected clients
const roomsList: Record<string, Room> = {};

// URL of the relayer WebSocket (acts as a middle server)
const RELAYER_URL = "ws://localhost:3001";
const relayerSocket = new WebSocket(RELAYER_URL);

// When relayer receives a message from another server
relayerSocket.onmessage = ({ data }) => {
  const parsedData = JSON.parse(data.toString());
  const inputRoom = parsedData.room;

  // If the message is a chat type, broadcast it to all sockets in that room
  if (parsedData.type == "chat") {
    roomsList[inputRoom]?.sockets.forEach((s) => s.send(data));
  }
};

// ================================ //
// This is the Relayer socket logic //
// ================================ //

// ========================================= //
// Working of Relayer Socket Logic (Main Code):
// This implementation uses a relayer server (ws://localhost:3001) as a middle layer for chat communication. When a client joins a room, it is added to the server’s roomsList. If a client sends a "chat" message, instead of broadcasting directly, the message is sent to the relayer. The relayer then receives the message and broadcasts it back to all connected clients in the corresponding room. This makes the system scalable across multiple WebSocket servers, as they can all use the same relayer to synchronize chats across distributed servers.
// =========================================================== //

wss.on("connection", (ws) => {
  // When a new client connects
  ws.on("error", console.error);

  ws.on("message", (data: string) => {
    // When client sends a message
    const parsedData = JSON.parse(data);
    const room = parsedData.room;

    // Handle joining a room
    if (parsedData.type == "join-room") {
      if (!roomsList[room]) {
        roomsList[room] = { sockets: [] };
      }
      roomsList[room].sockets.push(ws); // Add socket to the room
    }

    // Forward chat message to relayer (not directly to clients)
    if (parsedData.type == "chat") {
      relayerSocket.send(data);
    }
  });

  // Handle client disconnection
  ws.on("close", () => {
    console.log("Connection closed");
  });
});

// ==================================== //
// This is the simple web socket logic  //
// (Direct broadcast without relayer)   //
// ==================================== //

// ==================================================== //
// Working of Simple WebSocket Logic (Commented-out Code):
// The simple WebSocket implementation skips the relayer and directly handles communication within the same server. When a client connects, it can send "join-room" messages to join a chat room, and "chat" messages to broadcast directly to all clients in that room. This approach is lightweight and easier to set up, but it only works within a single server instance. If you want to scale horizontally (multiple servers), this version won’t synchronize messages between servers. It’s best suited for small-scale apps or testing where only one WebSocket server is needed.
// ============================================================================= //

// wss.on("connection", (ws) => {   // New client connection

//   ws.on("error", console.error);

//   ws.on("message", (data: string) => {  // Handle incoming messages
//     const parsedData = JSON.parse(data);
//     const inputRoom = parsedData.room;

//     // If a user joins a room, add them to that room
//     if (parsedData.type == "join-room") {
//       if (!roomsList[inputRoom]) {
//         roomsList[inputRoom] = { sockets: [] };
//       }
//       roomsList[inputRoom].sockets.push(ws);
//     }

//     // If it's a chat message, broadcast directly to all sockets in the room
//     if (parsedData.type == "chat") {
//       roomsList[inputRoom]?.sockets.forEach((s) => s.send(data));
//       console.log(data); // Log the message for debugging
//     }
//   });

//   // Send a message to the client confirming connection
//   ws.send("WS Connection established");

// });
