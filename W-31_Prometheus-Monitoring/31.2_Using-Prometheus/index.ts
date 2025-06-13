// Importing required types from Express and the Prometheus client
import type { Request, Response, NextFunction } from "express";
import client from "prom-client"; // Prometheus client library
import express from "express";

const app = express(); // Creating an Express application instance

// ---------------------- METRICS SETUP ---------------------- //

// Counter metric to count the total number of HTTP requests
const requestCounter = new client.Counter({
  name: "http_requests_counter",                // Unique metric name
  help: "Total number of http requests",        // Description shown in Prometheus
  labelNames: ["method", "route", "status_code"] // Labels to categorize data
});

// Gauge metric to track how many requests are currently being handled
const activeRequestGuage = new client.Gauge({
  name: "active_requests",         // Unique metric name
  help: "Number of active requests" // Description
});

// Histogram to track the duration of HTTP requests (in microseconds)
const httpRequestDurationMicroseconds = new client.Histogram({
  name: "http_request_duration_microseconds",  // Unique metric name
  help: "Duration of HTTP requests in microseconds", // Description
  labelNames: ["method", "route", "status_code"],    // Dimensions to filter/group by
  buckets: [0, 1, 5, 50, 100, 200, 500, 800, 1000, 5000, 8000, 10000], // Duration buckets (ms)
});

// ---------------------- MIDDLEWARE ---------------------- //

// This middleware collects metrics for each HTTP request
function Middleware(req: Request, res: Response, next: NextFunction) {
  // Exclude /metrices route to avoid infinite loop during Prometheus scraping
  if (req.path !== "/metrices") {
    activeRequestGuage.inc(); // Increase active request count
  }

  const startTime = Date.now(); // Capture start time of the request

  // Hook into the response finish event (when response is fully sent)
  res.on("finish", () => {
    const endTime = Date.now(); // Capture end time
    const duration = endTime - startTime; // Calculate total request duration

    console.log(`Request took ${duration}ms`); // Log how long the request took

    // Increment the request counter with relevant labels
    requestCounter.inc({
      method: req.method,                       // GET, POST, etc.
      route: req.route?.path || req.path,       // Resolved route or raw path
      status_code: String(res.statusCode),      // Convert status code to string
    });

    // Decrease active request count (if not /metrices)
    if (req.path !== "/metrices") {
      activeRequestGuage.dec();
    }

    // Observe the duration of the request for histogram metric
    httpRequestDurationMicroseconds.observe(
      {
        method: req.method,
        route: req.route?.path || req.path,
        status_code: String(res.statusCode),
      },
      duration // Observe the time in milliseconds
    );
  });

  next(); // Move to the next middleware or route
}

// ---------------------- ROUTES ---------------------- //

app.use(Middleware); // Register middleware globally

// /cpu endpoint simulates a CPU task by delaying for a random time (up to 1s)
app.get("/cpu", async (req, res) => {
  await new Promise((s) => setTimeout(s, Math.random() * 1000)); // Random delay

  res.json({
    message: "CPU endpoint", // Response sent after simulated delay
  });
});

// /users endpoint simply returns a JSON message
app.get("/users", (req, res) => {
  res.json({
    message: "Users endpoint", // Normal response
  });
});

// /metrices endpoint exposes all collected metrics to Prometheus
app.get("/metrices", async (req, res) => {
  const metrices = await client.register.metrics(); // Collect all metrics as text
  console.log(client.register.contentType);         // Log content type for debugging
  res.set("Content-Type", client.register.contentType); // Set correct content type
  res.end(metrices); // Send the metrics to Prometheus
});

// ---------------------- SERVER START ---------------------- //

app.listen(3000, () => {
  console.log("Server started listening on port 3000"); // Log that server is running
});
