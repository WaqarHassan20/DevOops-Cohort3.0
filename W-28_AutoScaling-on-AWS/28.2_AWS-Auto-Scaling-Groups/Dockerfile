FROM oven/bun:1

WORKDIR /app

COPY ./bun.lock ./bun.lock
COPY ./package.json ./package.json

COPY . .

RUN bun install

EXPOSE 3000

CMD [ "bun", "run", "bin.ts"]