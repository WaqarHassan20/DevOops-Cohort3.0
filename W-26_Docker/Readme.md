j# Docker README

## Table of Contents

- [Table of Contents](#table-of-contents)
- [Introduction](#introduction)
- [What is Docker?](#what-is-docker)
- [Why Use Docker?](#why-use-docker)
- [Docker Architecture](#docker-architecture)
- [Key Components](#key-components)
- [Docker Installation](#docker-installation)
  - [On Ubuntu:](#on-ubuntu)
  - [On macOS and Windows:](#on-macos-and-windows)
- [Docker Basic Commands](#docker-basic-commands)
- [Dockerfile](#dockerfile)
  - [Example:](#example)
- [Docker Compose](#docker-compose)
  - [Example `docker-compose.yml`:](#example-docker-composeyml)
- [Docker Hub](#docker-hub)
- [Volumes and Networking](#volumes-and-networking)
- [Security Best Practices](#security-best-practices)
- [Conclusion](#conclusion)

---

## Introduction

Docker is an open-source platform that automates the deployment, scaling, and management of applications using containerization.

## What is Docker?

Docker allows developers to package applications with all their dependencies into a standardized unit called a **container**. This ensures consistency across different environments.

## Why Use Docker?

* **Portability**: Works uniformly across different platforms.
* **Isolation**: Each container is isolated from others.
* **Efficiency**: Lightweight compared to virtual machines.
* **Scalability**: Easily scales across clusters with Docker Swarm or Kubernetes.

## Docker Architecture

* **Docker Client**: CLI used to interact with Docker Daemon.
* **Docker Daemon**: The engine that builds, runs, and manages containers.
* **Docker Images**: Read-only templates to create containers.
* **Docker Containers**: Runnable instances of images.
* **Docker Registry**: Storage for images (like Docker Hub).

## Key Components

* **Images**: Blueprint of a container.
* **Containers**: Instances of images.
* **Volumes**: Persistent data storage.
* **Networks**: Communication bridge between containers.

## Docker Installation

### On Ubuntu:

```bash
sudo apt update
sudo apt install docker.io
sudo systemctl enable docker
sudo systemctl start docker
```

### On macOS and Windows:

Download and install Docker Desktop from [https://www.docker.com/products/docker-desktop](https://www.docker.com/products/docker-desktop)

## Docker Basic Commands

```bash
docker --version                  # Check Docker version
docker pull <image>              # Pull image from Docker Hub
docker images                    # List images
docker run <image>               # Run container
docker ps                        # List running containers
docker stop <container_id>       # Stop a container
docker rm <container_id>         # Remove a container
docker rmi <image_id>            # Remove an image
```

## Dockerfile

A Dockerfile is a script that contains instructions to build a Docker image.

### Example:

```Dockerfile
FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["node", "index.js"]
```

## Docker Compose

Docker Compose is a tool for defining and managing multi-container Docker applications using a YAML file.

### Example `docker-compose.yml`:

```yaml
version: '3.8'
services:
  web:
    build: .
    ports:
      - "3000:3000"
  db:
    image: mongo
    ports:
      - "27017:27017"
```

## Docker Hub

Docker Hub is a public registry to host and share Docker images.

* Browse at: [https://hub.docker.com/](https://hub.docker.com/)
* Use `docker push <username>/<repo>` to upload your images.

## Volumes and Networking

* **Volumes**: `docker volume create data_volume`
* **Bind Mounts**: `-v $(pwd):/app`
* **Networks**: `docker network create mynet`

## Security Best Practices

* Use official images.
* Minimize the base image.
* Regularly update containers.
* Avoid running as root inside containers.
* Scan images for vulnerabilities.

## Conclusion

Docker revolutionizes software development by simplifying deployment and environment management. It’s an essential tool for modern DevOps and development workflows.

---

For more, visit the official docs: [https://docs.docker.com/](https://docs.docker.com/)