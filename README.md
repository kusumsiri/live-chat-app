# Live chat application with WebSocket API
This repository contains code to create a live chat application with the AWS WebSocket API. 

The `serverless.yml` file creates the websocket API, _'RouteSelectionExpression'_ and all _'routes'_ on AWS and passes the created endpoint to the lambda function via an `environment variable`.

This websocket contains the three predefined routes _($connect, $disconnect, $default)_ as well as three more custom routes. They are _setName, sendPublic and sendPrivate_.

The lambda function uses a layer for 'aws-sdk'. You must add your own layer ARN in the lambda code.
