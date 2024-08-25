FROM imbios/bun-node:latest-iron-alpine

WORKDIR /app
COPY . .

RUN bun i
RUN bun run build

EXPOSE 3000

CMD ["bun", "start"]
