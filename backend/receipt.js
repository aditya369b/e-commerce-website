const KafkaConsumer = require('./KafkaConsumer');

const consumer = new KafkaConsumer(['myTopic', 'myOtherTopic']);
    // req.body is received. ALl transaction logic here
consumer.on('message', (message) => {
  // console.log(message);
  console.log('New item has been read');

  params = message.value;

    // All receipt logic


});

consumer.connect();
