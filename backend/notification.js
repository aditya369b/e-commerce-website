const WebSocket = require('ws');
const options = { port: 3002, };
const redis = require('redis');
const redisClient = redis.createClient();
const redisChannelClient = redis.createClient();


//apis

const wss = new WebSocket.Server(options);

/* Channel Notifications */
redisChannelClient.on('message', (channel, message) => {
    console.log("Channel: ", channel);
    broadcastMessage({
        type: 'UPDATE_MESSAGE',
        notificationMessage: message,
    })
});


/* Item Count Messages  */
redisClient.on('message', (channel, message) => {
    console.log("Message: ", message);
    broadcastMessage(message);
});


redisChannelClient.subscribe('transactionChannel');

const broadcastMessage = (message) => {
    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(message));
        }
    });

};

const updateItemViewerCount = (itemId) => {
    console.log("increasing the view count")
    redisClient.incr(itemId, (err, itemViewCount) => {
        if (err) {
            console.log(err);
        }
        console.log(itemViewCount);
        broadcastMessage({
            type: 'UPDATE_USER_COUNT',
            id: itemId,
            count: itemViewCount,
        })

    });
}
const decreaseItemViewerCount = (itemId) => {
    redisClient.decr(itemId, (err, itemViewCount) => {

        if (err) {
            console.log(err);
        }
        console.log(cachedValue);
        broadcastMessage({
            type: 'UPDATE_USER_COUNT',
            id: itemId,
            count: itemViewCount,
        })
    });
}


wss.on('connection', (ws) => {

    ws.on('message', (message) => {
        const msgObj = JSON.parse(message);
        switch (msgObj.type) {
            case 'CONNECT':
                // client.incr(msgObj.id);
                updateItemViewerCount(msgObj.id, itemCount);
                break;
            case 'DISCONNECT':
                // client.decr(msgObj.id);
                updateItemViewerCount(msgObj.id);
                break;
            case 'ITEM_VIEW_DECREMENT':
                console.log('item inc-view' + msgObj.id);
                decreaseItemViewerCount(msgObj.id);
                break;
            case 'ITEM_VIEW_INCREMENT':
                console.log('item dec-view' + msgObj.id);
                updateItemViewerCount(msgObj.id);
                break;
            default:
                console.log('Message Type not Supported');
        }
    });

    ws.on('close', (e) => {
        console.log("notification-channel-closed")

    });

    ws.on('error', (e) => { });
    console.log("notification-channel-error")

});