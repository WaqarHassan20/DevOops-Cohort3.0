## 1- Manual Installation
- Install the node js
- clone the repository
- npm install
- start the db locally 
    -  go to neon.tech or
    -  use the docker command :`  docker run -e POSTGRES_PASSWORD=mysecretpassword -d -p 5432:5432 postgres` 
- change the .env file and update your credentials
- npx prisma migrate
- npx prisma generate
- npm run build
- npm run start


## Manual Installation explanation

To manually install the project, first install Node.js to enable JavaScript runtime and package management. Clone the repository using Git and run npm install to install dependencies. Set up a PostgreSQL database either by creating one on neon.tech or by running it locally with Docker: docker run -e POSTGRES_PASSWORD=mysecretpassword -d -p 5432:5432 postgres. Next, update the .env file with your correct database credentials. Apply database migrations using npx prisma migrate dev and generate the Prisma client with npx prisma generate. Finally, build the project using npm run build and start the server with npm run start.



## 2- Docker Installation
- install docker
- create a network to talk both containers : postgres and backend : `docker network create user_project`
- start postgres
     - `docker run --network user_project --name postgres -e POSTGRES_PASSWORD=mysecretpassword -d -p 5432:5432 postgres`
- build the image : `docker build --network=host -t user-project`
- run the image : `docker run -e DATABASE_URL=postgresql://postgres:mysecretpassword@postgres:5432/postgres --network user_project -p 3000:3000 user_project`


## Docker Installation explanation

To install using Docker, first install Docker for your operating system. Once installed, create a custom Docker network to allow the Postgres and backend containers to communicate by running: docker network create user_project. Next, start a PostgreSQL container connected to this network using the command:
docker run --network user_project --name postgres -e POSTGRES_PASSWORD=mysecretpassword -d -p 5432:5432 postgres.
Then, build your backend Docker image with the command:
docker build --network=host -t user-project .
(ensure you are in the root directory with the Dockerfile).
Finally, run your backend container, passing the correct database connection string via the DATABASE_URL environment variable and attaching it to the same Docker network:
docker run -e DATABASE_URL=postgresql://postgres:mysecretpassword@postgres:5432/postgres --network user_project -p 3000:3000 user_project.
This will start your app on http://localhost:3000 and connect it to the Postgres service running inside Docker.



## 3- Docker compose Installation steps
- Install the docker, docker compose
- Run `docker-compose up` : old command syntax
- Run `docker compose up` : new command syntax


## Docker compose Installation steps explanation

To install using Docker Compose, first install both Docker Engine and Docker Compose (note that Compose is now included by default in recent Docker versions). Once installed, ensure your project contains a valid docker-compose.yml file that defines both the backend and database services. Then, start all defined containers by running either docker-compose up (legacy syntax) or the modern version docker compose up (recommended for newer Docker versions). This command builds and starts all containers, automatically connecting them in a shared network defined in the Compose file. The application will be available at http://localhost:3000 or another port you’ve specified in the Compose config.