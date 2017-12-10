---
title: Building the LugBench API
menu:
- title: Documentation
  href: /doc
  class: documentation button button-green align-right
---

# Dependencies for Lugbench API
* [NodeJS](https://nodejs.org/en/): a JavaScript runtime built on Chrome's V8 JavaScript engine
* [NPM](https://www.npmjs.com/): a package manager for JavaScript
* [MongoDB](https://www.mongodb.com/what-is-mongodb): a scalable and flexible document database

# Cloning the repository

First, clone the front-end repository:

```
git clone git@github.com:Lugdunum3D/LugBench-API.git
```

# Prerequisites

## MongoDB

First, you may have to create a local database to test on using the following command:

```
mongod --dbpath <wanted_path> --smallfiles
```

:::info
`27017` is the default port but you can set it by running `mongod` with the `--port <port_number>` argument.
:::

## Installing dependencies

Using npm, just run:

```
npm install
```

This command will install the dependencies from the `package.json` file.

# Environnement variables

Add the `MONGODB_URI` environment variable to set the MongoDB url, with the port being the port you set in the above step, or the default port, `27017`.

```
export MONGODB_URI="mongodb://localhost:27017/lugbench-dev"
```

Here the name is completely up to you to choose; Mongo will automatically create the database if it doesn't exist yet.

You can also define a custom port for the API to run on by setting the `PORT` environment variable.

# Launch the project

In command line, you can launch the project with:

```
npm start
```

The API will listen on the port 5000 by default. You can then send requests to the server, e.g.:
```
GET http://localhost:5000/api/v1/gpus
```
