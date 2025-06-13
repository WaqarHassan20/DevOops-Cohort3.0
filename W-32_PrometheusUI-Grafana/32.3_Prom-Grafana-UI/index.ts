import client from "prom-client";
import express from "express";
import { Middleware } from "./Middleware";

const app = express();

app.use(Middleware);

app.get("/cpu", async (req, res) => {
  await new Promise((s) => setTimeout(s, Math.random() * 2500));

  res.json({
    message: "CPU endpoint", 
  });
});

app.get("/user", (req, res) => {
  res.json({
    message: "User endpoint",
    User: {
      name: "John Doe",
      age: 25,
    },
  });
});

app.post("/user", (req, res) => {
  
    const user = req.body;    
    res.json({
      ...user,
      id: 1,
    });

});

app.get("/metrics", async (req, res) => {
  const metrices = await client.register.metrics();
  console.log(client.register.contentType);
  res.set("Content-Type", client.register.contentType);
  res.end(metrices); 
});



app.listen(3000, () => {
  console.log("Server started listening on port 3000");
});
