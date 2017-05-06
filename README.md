# LugBench-API

# Prerequisites

Program | Version
------- | -----------
node    | >= 6.10x
npm     | >= 4.5x

# Clone the repository

```shell=
git clone git@github.com:Lugdunum3D/LugBench-API.git
```

# Installation

This command line below will install all dependencies you need to run the project.
```shell=
npm install
```

# Running the API in *http://localhost:5000*

```shell=
npm start
```

:::info
The default port is 5000. If you want to set a different one for the API to listen, set a environment variable system like this:

```shell=
export PORT=3000
```
:::


# Routes

Routes                       | Description
---------------------------- | -----------
`GET /api/:version/gpus`     | Return an array containing all existing gpus
`GET /api/:version/gpus/:id` | Return a specific gpu with
`PUT /api/:version/gpus`     | Add a new gpu
