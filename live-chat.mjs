import AWS from 'aws-sdk';

const ENDPOINT = process.env.WEBSOCKET_ENDPOINT.substr(6); //remove wss://
const client = new AWS.ApiGatewayManagementApi({endpoint: ENDPOINT});
const names = {}; 

const sendToOne = async (id, body)=>{

    try{
        await client.postToConnection({
            'ConnectionId' : id,
            'Data': Buffer.from(JSON.stringify(body)),
        }).promise();
    }
    catch(error){ console.error(' sendToOne : ' + error );}
    
};

const sendToAll = async (ids, body)=>{
    const all = ids.map(i => sendToOne(i, body));
    return Promise.all(all);
};

export const handler = async(event) => {
    
    if(event.requestContext){
        const connectionId = event.requestContext.connectionId;
        const routeKey = event.requestContext.routeKey;
        let body ={};
        try{
            if(event.body){
                body = JSON.parse(event.body);
            }
            console.log(' BODY : '+body);
        }catch(error){
            console.error(` event.requestContext : ` + error);
        }
        // console.log('ID : ' + connectionId);
        // console.log('routeKey : ' + routeKey);
        
        switch(routeKey){
            case '$connect':
                
                break;
                
            case '$disconnect':
                await sendToAll(Object.keys(names), { systemMessage : `${names[connectionId]} had left the chat`});
                delete names[connectionId];
                await sendToAll(Object.keys(names), { members : Object.values(names)});
                break;
                
            case '$default':
                
                break;
                
            case 'setName':
                names[connectionId] = body.name;
                console.log('connectionId : ' + connectionId + 'Name' + body.name);
                await sendToAll(Object.keys(names), { members : Object.values(names)});
                await sendToAll(Object.keys(names), { systemMessage : `${names[connectionId]} had joint the chat`});
                break;
                
            case 'sendPublic':
                await sendToAll([connectionId], { publicMessage : `${body.message}`} );
                break;
                
            case 'sendPrivate':
                const to = Object.keys(names).find(key => names[key] === body.to);
                await sendToOne(to, { privateMessage : `${names[connectionId]}, ${body.message}}`} );
                break;
                
            default:
                
        }
    }
    // TODO implement
    const response = {
        statusCode: 200,
        body: JSON.stringify('Hello from live-chat-app'),
    };
    return response;
};
