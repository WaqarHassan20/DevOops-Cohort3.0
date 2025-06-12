// Import the 'cluster' module to enable multi-process parallelism
import cluster from "cluster";

// Import the 'os' module to get system information like number of CPU cores
import os from "os";

// Define the number you want to sum up to (from 0 to total - 1)
const total = 10_000_000_000; // 10 billion

// Set the number of worker processes you want to use
// You can use os.cpus().length to automatically use all available cores
const numWorkers = 4;

// Divide the total range into equal-sized chunks for each worker
const chunkSize = Math.floor(total / numWorkers);

// Check if the current process is the primary (master) process
if (cluster.isPrimary) {
  // This variable will store the final total sum from all workers
  let totalSum = 0;

  // Counter to track how many workers have finished their tasks
  let received = 0;

  // Record the start time to measure execution duration
  const startTime = Date.now();

  // Create 'numWorkers' child processes
  for (let i = 0; i < numWorkers; i++) {
    // Define the start and end of the range for this worker
    const start = i * chunkSize;
    // Ensure the last worker includes any leftover numbers
    const end = i === numWorkers - 1 ? total : (i + 1) * chunkSize;

    // Fork a worker process and pass its assigned range via environment variables
    const worker = cluster.fork({ START: start, END: end });

    // Set up a message listener to receive partial sums from the worker
    worker.on("message", (msg) => {
      // Add this worker's partial sum to the total sum
      totalSum += msg.partialSum;

      // Increment the received counter
      received++;

      // If all workers have responded, print the total result
      if (received === numWorkers) {
        const endTime = Date.now(); // Record end time

        // Display final result and time taken
        console.log(`Total Sum: ${totalSum}`);
        console.log(`Time Taken: ${endTime - startTime} ms`);
      }
    });
  }

// If this is a worker process (not the primary)
} else {
  // Read the assigned range from environment variables
  const start = parseInt(process.env.START || "0"); // Start of the range
  const end = parseInt(process.env.END || "0"); // End of the range

  // Variable to store the sum for this range
  let partialSum = 0;

  // Perform the summation loop (CPU-intensive)
  for (let i = start; i < end; i++) {
    partialSum += i;
  }

  // Send the partial sum back to the primary process
  if (process.send) {
    process.send({ partialSum });
  }

  // Exit the worker process cleanly
  process.exit();
}
