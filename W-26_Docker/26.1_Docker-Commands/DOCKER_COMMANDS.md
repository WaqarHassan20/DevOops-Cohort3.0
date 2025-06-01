# 🐳 Docker Basic Commands Guide

This guide provides a list of basic Docker commands, along with short explanations and examples. It's ideal for beginners getting started with containerization using Docker.

---

## 🔧 Check Docker Installation

```bash
docker --version
```
> ✅ Verifies Docker is installed and displays the installed version.

```bash
docker compose version
```
> ✅ Shows the Docker Compose version if installed.

---

## 🧱 Docker Image Commands

### 🔹 Pull an image from Docker Hub

```bash
docker pull nginx
```
> 📥 Downloads the official Nginx image from Docker Hub.

---

### 🔹 Build an image from a Dockerfile

```bash
docker build -t myapp .
```
> 🏗️ Builds an image named `myapp` using the Dockerfile in the current directory.

---

### 🔹 List all local images

```bash
docker images
```
> 📋 Displays all Docker images stored locally.

---

### 🔹 Remove an image

```bash
docker rmi myapp
```
> 🗑️ Deletes the image named `myapp`.

---

## 📦 Docker Container Commands

### 🔹 Run a container

```bash
docker run nginx
```
> 🚀 Runs a container using the `nginx` image.

---

### 🔹 Run with interactive terminal

```bash
docker run -it ubuntu sh
```
> 🛠️ Starts an Ubuntu container and gives you an interactive shell.

---

### 🔹 Run with port mapping

```bash
docker run -p 3000:3000 myapp
```
> 🌐 Maps port 3000 from container to host, allowing external access.

---

### 🔹 List running containers

```bash
docker ps
```
> 📋 Shows containers currently running.

---

### 🔹 List all containers (including stopped)

```bash
docker ps -a
```
> 📋 Shows all containers, including those that are stopped.

---

### 🔹 Stop a container

```bash
docker stop myapp-container
```
> 🛑 Gracefully stops a running container.

---

### 🔹 Remove a container

```bash
docker rm myapp-container
```
> ❌ Deletes a stopped container.

---

## 📂 Volumes and Mounts

### 🔹 Create a volume

```bash
docker volume create myvolume
```
> 💾 Creates a named volume for persistent data.

---

### 🔹 Mount a volume in a container

```bash
docker run -v myvolume:/app/data myapp
```
> 📁 Mounts the named volume into the container at `/app/data`.

---

### 🔹 Bind mount a host directory

```bash
docker run -v $(pwd):/app myapp
```
> 📂 Mounts the current host directory into the container for local development.

---

## ⚙️ Docker Compose Commands

### 🔹 Start services

```bash
docker compose up
```
> 🔧 Builds and runs all services defined in `docker-compose.yml`.

---

### 🔹 Start in detached mode

```bash
docker compose up -d
```
> 🧳 Runs all services in the background.

---

### 🔹 Stop and clean up

```bash
docker compose down
```
> 🧹 Stops and removes all containers, networks, and volumes created by `up`.

---

## 🧼 System Cleanup Commands

### 🔹 Remove all stopped containers

```bash
docker container prune
```
> 🧹 Frees space by removing stopped containers.

---

### 🔹 Remove unused images

```bash
docker image prune
```
> 🧼 Cleans up unused Docker images.

---

### 🔹 Remove everything (⚠️ DANGEROUS)

```bash
docker system prune -a
```
> ⚠️ Removes **all** unused data: containers, images, volumes, networks.

---

## 📚 Helpful Resources

- 🔗 [Docker Documentation](https://docs.docker.com/)
- 🔗 [Docker Hub](https://hub.docker.com/)

---

> ✅ Tip: Always use `.dockerignore` to prevent unnecessary files (like `node_modules`, `.git`, etc.) from being copied into images.




# Interview Questions

- what are the layers in docker ? steps of dockerfile are called as layers
- How to optimize the docker image ? By using the cached file/layers
- 