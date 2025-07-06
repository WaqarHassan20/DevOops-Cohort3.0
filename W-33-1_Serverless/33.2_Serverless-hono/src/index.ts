import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'



const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.get("/mentor",(c)=>{
  return c.json({
    Mentor: "Mentor is Harkirat Singh",
  });
})

app.get("/user",(c)=>{
  return c.json({
    Mentor: "User is Waqar Ul Hassan",
  });
})

// ======================================== //
// ======================================== //

app.post("/api/v1/signup", async (c) => {
  
  const prismaClient = new PrismaClient({
    // @ts-ignore
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  
  const body = await c.req.json();

  const user = await prismaClient.user.create({
    data: {
      name: body.name,
      email: body.email,
      password: body.password,
    },
  });
  
  return c.json({
    id: user.id,
  });
});

app.post("/api/v1/signin", (c) => {
  return c.json({
    message: "Signin endpoint !",
  });
});

app.post("/api/v1/todo", (c) => {
  return c.json({
    message: "Post todo endpoint !",
  });
});

app.get("/api/v1/todo", (c) => {
  return c.json({
    message: "Get todo endpoint !",
  });
});

export default app
