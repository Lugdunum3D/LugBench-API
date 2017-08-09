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

Routes                | Description
--------------------- | -----------
`GET /devices`        | Return an array containing all existing devices
`GET /devices/:id`    | Return a specific device with a specific id
`POST /devices`       | Add a new device
`GET /scenarios`      | Return an array containing all existing scenarios
`GET /scenarios/:id`  | Return a specific scenario with a specific id
`GET /scores`         | Return an array containing all existing scores
`GET /scores/:id`     | Return a specific score with a specific id
`POST /scores`        | Add a new score

Details for a device can be found [here](./models/device.js)
Details for a scenario can be found [here](./models/scenario.js)
Details for a score can be found [here](./models/score.js)
