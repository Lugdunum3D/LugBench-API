# LugBench-API

## Table of contents
- [Continuous integration](#continuous-integration)
- [Prerequisites](#prerequisites)
- [Clone the repository](#clone-the-repository)
- [Installation](#installation)
- [Run the API](#run-the-api)
- [Routes](#routes)

# Continuous integration

### restify-api
[![CircleCI](https://circleci.com/gh/Lugdunum3D/LugBench-API/tree/restify-api.svg?style=shield)](https://circleci.com/gh/Lugdunum3D/LugBench-API/tree/restify-api)

# Prerequisites

Program | Version
------- | -----------
node    | >= 6.10x
npm     | >= 4.5x

# Clone the repository

```
git clone https://github.com/Lugdunum3D/LugBench-API.git
```

# Installation

This command line below will install all dependencies you need to run the project.

```bash
npm install
```

# Run the API

To start the API, type the command lines below.

```
export AUTH_TOKEN="your_auth_token"
npm start
```

**Note**: The default port is 5000. If you want to set a different one for the API to listen, set a environment variable system like this:

```bash
export PORT=3000
```

# Routes

Routes                       | Description
---------------------------- | -----------
`GET /api/:version/gpus`     | Return an array containing all existing gpus
`GET /api/:version/gpus/:id` | Return a specific gpu with a specific id
`PUT /api/:version/gpus`     | Add a new gpu

Details for a Gpu can be found [here](./v1/models/gpu.js)