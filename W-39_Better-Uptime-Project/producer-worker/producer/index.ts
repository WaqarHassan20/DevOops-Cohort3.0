import { createClient } from "redis";

async function main(){
  const client = await createClient({})
    .on("error", (error) => {
      console.log("Redis client error", error);
    })
    .connect();

const res = await client.xAdd("betteruptime:website", "*", {
    url: "facebook.com",
      id: "1",
    });

    console.log(res);
    client.destroy();
}

main();


// This is the default url either pass or not in client doesn't matter 
// url:"redis://default:redispw@localhost:6379"