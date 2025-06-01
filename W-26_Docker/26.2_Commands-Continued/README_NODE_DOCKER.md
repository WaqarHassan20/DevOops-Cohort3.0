# 🚀 Dockerized Node.js App

This repository contains a basic Docker setup for running a Node.js application using the `node:22-alpine` image.

---

## 📄 Dockerfile Overview

```
FROM node:22-alpine

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 3000

CMD ["node", "index.js"]
```

### 🔍 Explanation

- **FROM node:22-alpine**  
  Uses a lightweight version of Node.js 22 based on Alpine Linux.

- **WORKDIR /app**  
  Sets the working directory inside the container to `/app`.

- **COPY . .**  
  Copies the entire project directory into the container at `/app`.

- **RUN npm install**  
  Installs project dependencies defined in `package.json`.

- **EXPOSE 3000**  
  Informs Docker that the app runs on port 3000.

- **CMD ["node", "index.js"]**  
  Sets the default command to run the Node.js app using `index.js` as the entry point.

---

## 🚀 Usage Instructions

### 🔧 Build the Docker image

```bash
docker build -t my-node-app .
```

### ▶️ Run the container

```bash
docker run -p 3000:3000 my-node-app
```

> This will start the Node.js app and expose it on `http://localhost:3000`.

---

## 📦 Docker Compose (Optional)

If you use Docker Compose, your `docker-compose.yml` might look like:

```yaml
version: '3'
services:
  web:
    build: .
    ports:
      - "3000:3000"
```

Run it with:

```bash
docker compose up
```

---

## 🧼 Cleanup

```bash
docker system prune -a
```
> Remove unused containers, images, and networks to free up space.

---

## 📚 Resources

- [Node.js Official](https://nodejs.org)
- [Docker Documentation](https://docs.docker.com/)