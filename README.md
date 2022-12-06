# IProtect

[![compile](https://github.com/es-lynn/ip-protect/actions/workflows/compile.yml/badge.svg)](https://github.com/es-lynn/ip-protect/actions/workflows/compile.yml)

# Requirements

- nvm
- node v16.8
- yarn v1.22
- Docker Desktop

# Setup

1. `yarn setup`
2. modules/backend
   1. `yarn db:setup`
   2. `yarn db:start`
   3. `yarn db:seed`
3. modules/frontend
   1. `yarn start`
