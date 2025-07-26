import { createClient } from "redis";

const client = await createClient()
  .on("error", (error) => {
    console.log(error);
  })
  .connect();

type websiteEvent = { url: string; id: string };

async function xAdd({ url, id }: websiteEvent) {
  await client.xAdd("betteruptime:website", "*", {
    url,
    id,
  });
}

export async function xAddBulk(websites: websiteEvent[]) {
  for (let i = 0; i < websites.length; i++) {
    const website = websites[i];
    if (website) {
      await xAdd({
        url: website.url,
        id: website.id,
      });
    }
  }
}