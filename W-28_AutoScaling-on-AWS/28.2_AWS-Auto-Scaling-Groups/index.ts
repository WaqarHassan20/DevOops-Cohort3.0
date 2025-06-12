import os from "os"
import express from "express"

export const app = express()

app.get("/", (req, res) => {

    res.json({ message: "Hello world from landing page" });

});


app.get("/cpu",(req,res)=>{

    for (let i = 0; i < 1000000000; i++) {
      Math.random();
    }
    
    res.json({ message: "Hello world from CPU endpoint" });

})



app.get("/host",(req,res)=>{

    res.send(os.hostname());
})