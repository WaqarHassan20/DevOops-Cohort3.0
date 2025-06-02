## Manual Installation
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


## Docker Installation
- install docker
- create a network to talk both containers : postgres and backend : `docker network create user_project`
- start postgres
     - `docker run --network user_project --name postgres -e POSTGRES_PASSWORD=mysecretpassword -d -p 5432:5432 postgres`
- build the image : `docker build --network=host -t user-project`
- run the image : `docker run -e DATABASE_URL=postgresql://postgres:mysecretpassword@postgres:5432/postgres --network user_project -p 3000:3000 user_project`


## Docker compose Installation steps
- Install the docker, docker compose
- Run `docker-compose up`
- 