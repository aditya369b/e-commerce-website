const WebSocket = require('ws');
const options = {port: 3002,};
const redis = require('redis');
const client = redis.createClient();
//apis

const wss = new WebSocket.Server(options);

client.subscribe('transactionChannel');

client.on('message', (channel, message) => {
    console.log("Message: ",message);
    broadcastMessage(message);
});

const broadcastMessage = (message) => {
        wss.clients.forEach((client) => {
            if(client.readyState === WebSocket.OPEN){
                client.send(JSON.stringify(message));
            }
        });
    };

const updateItemViewerCount = (itemId, itemCount) => {
    broadcastMessage({
        type: 'UPDATE_VIEW_COUNT',
        id: itemId,
        count: itemCount,
    })
}

wss.on('connection' , (ws) => {

    ws.on('message', (message) => {
        const msgObj = JSON.parse(message);
        let itemCount = client.get(msgObj.id);
        switch(msgObj.type){
            case 'CONNECT':
                client.incr(msgObj.id);
                updateItemViewerCount(msgObj.id, itemCount+1);
                break;
            case 'DISCONNECT':
                client.decr(msgObj.id);
                updateItemViewerCount(msgObj.id, itemCount-1);
                break;
            default:
                console.log('Message Type not Supported');
        }
    });

    ws.on('close', () => {});

    ws.on('error', (e) => {});

});