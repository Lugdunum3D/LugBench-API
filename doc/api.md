---
title: LugBench API Reference
menu:
- title: Documentation
  href: /doc
  class: documentation button button-green align-right
---


# API documentation

## List of endpoints

Method | Route              | Description
-------|------------------- | -------------------------------------------------------------
GET    | `/api/v1/gpus`     | Returns all GPUs present in the database.
GET    | `/api/v1/gpus/:id` | Returns the GPU with the id ":id" if present in the database.
PUT    | `/api/v1/gpus`     | Add or edit a GPU if present in the database.

:::info
The details of the object to pass in the payload is available [online on the API's repository](https://github.com/Lugdunum3D/LugBench-API/blob/dev/v1/models/gpu/index.js "Mongoose Schema").
The object has to be formatted in json.
:::

## Response codes
Here is the response codes returned by the back-end.

Response code | Description
------------- | -----------------------------------------------------------------------
200           | Success - Request returned without any problem.
201           | Creation success - Object inserted in the database without any problem.
400           | Bad request - Some headers or fields are missing.
500           | Server error - Please open an issue or contact us.

## Unit tests

Our API is covered by unit tests. We will use [Mocha](https://mochajs.org/), a feature-rich JavaScript testing framework running on Node.js.
All creation and retrieving of data are tested.
