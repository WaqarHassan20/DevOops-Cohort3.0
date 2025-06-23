import client from "prom-client";

export const requestCounter = new client.Counter({
  name: "http_requests_counter",
  help: "Total number of http requests",
  labelNames: ["method", "route", "status_code"],
});

export const activeRequestGuage = new client.Gauge({
  name: "active_requests",
  help: "Number of active requests",
});

export const httpRequestDurationMicroseconds = new client.Histogram({
  name: "http_request_duration_microseconds",
  help: "Duration of HTTP requests in microseconds",
  labelNames: ["method", "route", "status_code"],
  buckets: [0, 1, 5, 50, 100, 200, 500, 800, 1000, 5000, 8000, 10000],
});
