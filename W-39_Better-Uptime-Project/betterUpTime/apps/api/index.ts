import express from "express"
const app = express();
import { client } from "store/client";

app.use(express.json());

app.post("/website", async (req, res) => {
  const url = req.body.url
  const website = await client.website.create({
    data: {
      url: url,
      timeAdded: new Date(),
    },
  });

  res.json({
    Website:url,
    Id: website.id 
  })
});

app.post("/status:websiteId", (req, res) => {});

app.listen(process.env.PORT || 3001, () => {
  console.log("Server is listening on given port");
});