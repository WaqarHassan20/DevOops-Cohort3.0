# Prometheus, Node App, and Grafana UI - Docker Compose Setup

This project demonstrates how to run a Node.js application, Prometheus, and Grafana UI together using Docker Compose.

## Prerequisites
- Docker installed ([Install Docker](https://docs.docker.com/get-docker/))
- Docker Compose installed ([Install Docker Compose](https://docs.docker.com/compose/install/))

## Getting Started

1. **Clone the repository** (if you haven't already):
   ```zsh
   git clone <your-repo-url>
   cd W-32_PrometheusUI-Grafana/32.3_Prom-Grafana-UI/
   ```

2. **Start all services (Node app, Prometheus, Grafana) with Docker Compose:**
   ```zsh
   docker compose up --build
   ```
   This command will build and start all three containers:
   - **node-app**: Your Node.js application
   - **prometheus**: Monitoring system
   - **grafana**: Visualization UI

3. **Access the services:**
   - **Node App**: [http://localhost:3000](http://localhost:3000) (or the port defined in your `docker-compose.yml`)
   - **Prometheus**: [http://localhost:9090](http://localhost:9090)
   - **Grafana**: [http://localhost:3001](http://localhost:3001) (default Grafana port, check your compose file)

4. **Stop the services:**
   Press `Ctrl+C` in the terminal, then run:
   ```zsh
   docker compose down
   ```

## Configuration
- You can modify `Prometheus.yml` to change Prometheus scrape targets.
- Update the Node app or Grafana configuration as needed in their respective files.

## About `Prometheus.yml`
- The `Prometheus.yml` file is the main configuration file for Prometheus.
- It defines scrape targets (the endpoints Prometheus will collect metrics from), scrape intervals, and other settings.
- By default, it is set up to scrape metrics from the Node.js app and any other services you specify.
- To add or remove targets, edit the `scrape_configs` section in `Prometheus.yml`.
- After making changes, restart the Prometheus container for the new configuration to take effect.

## Notes
- Make sure ports `3000`, `9090`, and `3001` are available on your machine.
- Default Grafana login: `admin` / `admin` (change after first login).

---
For more details, see the `docker-compose.yml` and `Prometheus.yml` files in this directory.
