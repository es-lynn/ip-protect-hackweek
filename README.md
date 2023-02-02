# IProtect

[![compile](https://github.com/es-lynn/ip-protect/actions/workflows/compile.yml/badge.svg)](https://github.com/es-lynn/ip-protect/actions/workflows/compile.yml)
[![test](https://github.com/es-lynn/ip-protect/actions/workflows/test.yml/badge.svg)](https://github.com/es-lynn/ip-protect/actions/workflows/test.yml)
[![build](https://github.com/es-lynn/ip-protect/actions/workflows/build.yml/badge.svg)](https://github.com/es-lynn/ip-protect/actions/workflows/build.yml)

# Requirements

- nvm
- node v16.8
- yarn v1.22
- Docker Desktop

# Setup

1. `yarn setup`
2. modules/backend
   1. Copy .env.sample to .env
   1. `yarn db:setup`
   2. `yarn db:start`
   3. `yarn db:seed`
3. modules/frontend
   1. Copy /env/.env.sample to /env/.env.local
   2. `yarn start`

# Updating APIs

Whenever you make changes to the API on the backend, the interface on the frontend also needs to be updated. The project uses a combination of Swagger to generate the OpenAPI specifications, and swagger-typescript-api to generate the frontend client.

1. Make changes to API
2. Start your server and navigate to localhost:4000/swagger/docs
3. Test your API and ensure it's running correctly
4. Navigate to `modules/frontend` and run `yarn build:api-client`
5. The frontend API client should contain the new endpoint