# FameFaked

## How To Start Application - Need Docker

If you do not have docker compose (or docker-compose) it is necessary to spin up client, server and DB so please download that first.

`cd famefaked`

`docker compose up --build`

## How To Seed DB

In a new terminal while docker containers are running:

`cd famefaked`

`cd server`

`npm run docker:seed`
