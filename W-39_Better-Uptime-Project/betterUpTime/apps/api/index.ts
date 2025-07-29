import express from "express"
import jwt from "jsonwebtoken";
const app = express();
import cors from "cors";
import { client } from "store/client";
import { AuthInput } from "./types";
import { authMiddleware } from "./middleware";

app.use(express.json());
app.use(cors());

app.post("/user/signup", async (req, res) => {
  const parsedData = AuthInput.safeParse(req.body);
  if (!parsedData.success) {
    res.status(400).send({
      message: "Invalid Input Data for Sign Up",
      Error: parsedData.error.format(),
    });
    return;
  }

  try {
    const user = await client.user.create({
      data: {
        password: parsedData.data.password,
        username: parsedData.data.username,
      },
    });

    res.json({
      Message: "User created successfully",
      UserId: user.id,
    });
  } catch (error) {
    console.log(error);
     res.status(403).send({
       message: "Error Occured in creating User",
     });
  }
});

app.post("/user/signin", async (req, res) => {
   const parsedData = AuthInput.safeParse(req.body);
  if (!parsedData.success) {
    res.status(400).send({
      message: "Invalid Input Data for Sign Up",
      Error: parsedData.error.format(),
    });
    return;
  }

  const user = await client.user.findFirst({
    where: {
      username: parsedData.data.username,
    },
  });

  if (parsedData.data.password != user?.password) {
     res.status(403).send({
       message: "Password incorrect error",
     });
     return;
  }

  let token = jwt.sign(
    {
      sub: user.id,
    },
    process.env.JWT_SECRET!
  );

  res.json({
    Token: token,
  });

});

app.post("/website", authMiddleware, async (req, res) => {
  
  const url = req.body.url;

  try {
    if (!url) {
      return res.status(411).json({ error: "URL is required" });
    }

    const website = await client.website.create({
      data: {
        url: url,
        timeAdded: new Date(),
        userId: req.userId,
      },
    });

    res.json({
      Website: url,
      Id: website.id,
    });
  } catch (error) {
    console.error("Error creating website:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/status/:websiteId", authMiddleware, async (req, res) => {

  const { websiteId } = req.params;

  const website = await client.website.findFirst({
    where: {
      userId: req.userId,
      id: websiteId,
    },
      include: {
        ticks: {
          orderBy: [{ createdAt: "desc" }],
          take: 10,
        },
      },
  });

  if (!website) {
    res.status(409).json({
      message: "Website not found",
    });
    return;
  }

  res.json({
    website,
  });
});

app.get("websites",authMiddleware,async (req, res) => {

  const websites = await client.website.findMany({
    where: { userId: req.userId },
  });

  res.json({
    websites,
  });

});

app.listen(process.env.PORT || 3001, () => {
  console.log("Server is listening on given port");
});
