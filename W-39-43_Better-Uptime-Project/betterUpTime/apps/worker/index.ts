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
      console.log("No response from stream");
      return;
  } 
  
  console.log("Raw response from stream:", response);
  console.log("Number of messages in response:", response.length);
  
  // Log each message details
  response.forEach((item, index) => {
    console.log(`Message ${index + 1}:`, {
      id: item.id,
      message: item.message
    });
  });
  
  let promises = await response.map(({ message }) =>
    fetchWebsite(message.url, message.id)
  );
  await Promise.all(promises);
  console.log("Processed", promises.length, "websites");


  // step:3
  // acknowledment back that this task has been processed
  const ackIds = response.map(({ id }) => id);
  console.log("Acknowledging IDs:", ackIds);
  xAckBulk(
    REGION_ID, 
    ackIds
  );
  console.log("Acknowledgment completed");
}
// }

main();

async function fetchWebsite(url: string, websiteId: string ) {
    return new Promise<void>(async (resolve, reject) => {
      console.log(`Processing website: ${url} (ID: ${websiteId})`);
      
      // First, check if the website still exists
      const website = await client.website.findUnique({
        where: { id: websiteId }
      });
      
      // If website doesn't exist (was deleted), skip processing
      if (!website) {
        console.log(`Website ${websiteId} not found in database, skipping...`);
        resolve();
        return;
      }

      console.log(`Website ${websiteId} found, checking status...`);
      const startTime = Date.now();
      axios
        .get(url)
        .then(async () => {
          const endTime = Date.now();
          const responseTime = endTime - startTime;
          console.log(`Website ${url} is UP (${responseTime}ms)`);
          
          await client.websiteTick.create({
            data: {
              response_time_ms: responseTime,
              status: "Up",
              region_id: REGION_ID,
              website_id: websiteId,
            },
          });
          resolve();
        })
        .catch(async (error) => {
          const endTime = Date.now();
          const responseTime = endTime - startTime;
          console.log(`Website ${url} is DOWN (${responseTime}ms):`, error.message);
          
          await client.websiteTick.create({
            data: {
              response_time_ms: responseTime,
              status: "Down",
              region_id: REGION_ID,
              website_id: websiteId,
            },
          });
          resolve();
        });
    });
}
