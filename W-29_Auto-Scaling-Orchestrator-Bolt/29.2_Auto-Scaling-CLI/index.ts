import { AutoScalingClient, SetDesiredCapacityCommand } from "@aws-sdk/client-auto-scaling";

const client = new AutoScalingClient({
  region: "us-west-2", // Replace with your desired region
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY || "",
    secretAccessKey: process.env.AWS_ACCESS_SECRET || "",
  },
});


const command = new SetDesiredCapacityCommand({
  AutoScalingGroupName: "my-auto-scaling-group", // Replace with your Auto Scaling group name
  DesiredCapacity: 3, // Replace with your desired capacity
}); 


const response = await client.send(command);
console.log(response);

// This file holds the dummy data, to run this file make sure you have filled the data with your real credentials and Auto Scaling group name.