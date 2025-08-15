import { createClient } from "redis";

async function main() {
  let client = await createClient()
    .on("error", (error) => {
      console.log(error);
    })
    .connect();

  const res = await client.xReadGroup(
    "dubai",
    "dubai-1",
    {
      key: "betteruptime:website",
      id: ">",
    },
    {
      COUNT: 2,
    }
  );

  //@ts-ignore
  console.log(res[0].messages);
  client.destroy();
}

main()