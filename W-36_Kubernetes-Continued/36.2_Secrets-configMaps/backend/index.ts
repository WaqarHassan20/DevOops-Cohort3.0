require('dotenv').config({ path: './secret/.env' });
import express from "express"
const app = express();

console.log(process.env.DATABASE_URL);
console.log(process.env.PORT);

app.get("/",(req,res)=>{
    res.json({
      DataBase: process.env.DATABASE_URL,
      PORT: process.env.PORT,
    });
})

app.listen(process.env.PORT,()=>{
    console.log("Server is running on port ",process.env.PORT);
})