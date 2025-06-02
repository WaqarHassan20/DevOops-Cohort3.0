## Manual Installation

- Install the node js
- clone the repository
- npm install
- start the db locally 
    -  go to neon.tech or
    -  use the docker command :  docker run -e POSTGRES_PASSWORD=mysecretpassword -d -p 5432:5432 postgres 
- change the .env file and update your credentials
- npx prisma migrate
- npx prisma generate
- npm run build
- npm run start
  
## Docker Installation


## Docker compose Installation steps