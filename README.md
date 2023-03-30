# Live chat application with AWS WebSocket API
This repository contains code to create a live chat application with the AWS WebSocket API. 

The `serverless.yml` file creates the websocket API, `RouteSelectionExpression` and all `routes` on AWS and passes the created endpoint to the lambda function via an `environment variable`.
