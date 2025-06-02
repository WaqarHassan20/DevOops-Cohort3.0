import { PrismaClient } from "./generated/prisma";
const prismaClient = new PrismaClient();
import express from "express";
const app = express()

app.post("/", async (req, res) => {
  const newUser = await prismaClient.user.create({
    data: {
      name: Math.random().toString(36).substring(2, 15),
      password: Math.random().toString(36).substring(2, 15),
    },
  });
  res.json({
    message: "User, created successfully!",
    User: newUser,
  });
});
 
app.get("/", async (req, res) => {
  const users = await prismaClient.user.findMany();
  res.json({
    message: "Users fetched successfully!",
    User: users,
  });
});


app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
   