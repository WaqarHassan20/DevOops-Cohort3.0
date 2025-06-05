FROM oven/bun:1

WORKDIR /usr/src/app

# First, copy only package.json files for better caching
COPY ./package.json ./package.json
COPY ./apps/ws/package.json ./apps/ws/package.json
COPY ./packages/db/package.json ./packages/db/
COPY ./packages/eslint-config/package.json ./packages/eslint/
COPY ./packages/typescript-config/package.json ./packages/typescript-config/

# Copy lockfile and config
COPY ./bun.lock ./bun.lock
COPY ./turbo.json ./turbo.json

# Install dependencies
RUN bun install

# Copy source code after dependencies are installed
COPY ./packages ./packages
COPY ./apps/ws ./apps/ws

RUN apt-get update -y && apt-get install -y openssl

RUN bun run db:generate
# To generate the prisma client

EXPOSE 8081

# Command to run the backend
CMD ["bun", "run", "start:ws"]