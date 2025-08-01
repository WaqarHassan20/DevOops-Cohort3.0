import axios from "axios";
import { xReadGroup, xAckBulk } from "redisstream/client";
import { client } from "store/client";

const REGION_ID = process.env.REGION_ID!;
const WORKER_ID = process.env.WORKER_ID!;

if (!REGION_ID) {
    throw new Error("Region not provided");
}
if (!WORKER_ID) {
  throw new Error("Worker Id not provided");
}


async function main() {
  //   while (1) {

  // step:1
  // read from the stream first
  const response = await xReadGroup(REGION_ID, WORKER_ID);
  

  // step:2
  // process the website and store the result in DB
  // TODO : it must be through be a queue in a bulk DB request
  
  if (!response) {
      return;
  } 
  
  let promises = await response.map(({ message }) =>
    fetchWebsite(message.url, message.id)
  );
  await Promise.all(promises);
  console.log(promises.length);


  // step:3
  // acknowledment back that this task has been processed
  xAckBulk(
    REGION_ID, 
    response.map(({ id }) => id)
  );
}
// }

main();

async function fetchWebsite(url: string, websiteId: string ) {
    return new Promise<void>((resolve, reject) => {
      const startTime = Date.now();
      axios
        .get(url)
        .then(async () => {
          const endTime = Date.now();
          await client.websiteTick.create({
            data: {
              response_time_ms: endTime - startTime,
              status: "Up",
              region_id: REGION_ID,
              website_id: websiteId,
            },
          });
          resolve();
        })
        .catch(async () => {
          const endTime = Date.now();
          await client.websiteTick.create({
            data: {
              response_time_ms: endTime - startTime,
              status: "Down",
              region_id: REGION_ID,
              website_id: websiteId,
            },
          });
          resolve();
        });
    });
}
