# Live chat application with AWS WebSocket API
This repository contains code to create a live chat application with the AWS WebSocket API. 

The `serverless.yml` file creates the websocket API, `RouteSelectionExpression` and all `routes` on AWS and passes the created endpoint to the lambda function via an `environment variable`.

This websocket contains the three predefined routes `($connect, $disconnect, $default)` as well as three more custom routes. They are `setName, sendPublic and sendPrivate`.
