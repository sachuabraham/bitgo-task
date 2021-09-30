# BitGo Task

The task is to find the top transactions in a particular bitcoin block ordered by their ancestor counts

## Project structure

```
├── README.md
├── index.ts
├── package.json
├── src
│   ├── bitcoin_apis.ts
│   ├── constants.ts
│   ├── find_ancestors.ts
│   ├── types.ts
│   └── utils
│       └── rest_api_caller.ts
├── tsconfig.json
└── yarn.lock
```
## Prerequisites
```sh
- nodejs 12 +
- yarn
```

## Before running

The project needs some optional environment variables defined to run. Have a .env file created and placed at the root of the directory with the appropriate values. kindly note, there is no need for quotes for env. 

```sh
TOP_ENTRIES=20
BLOCK_NUMBER=680002
```

## How To Run

```sh
yarn install
yarn run build
yarn run start
```

## Using docker

```bash
docker build . -t <container-name>
docker run --name <give-name> --env-file=.env <container-name>
```





