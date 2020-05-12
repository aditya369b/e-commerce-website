const KafkaConsumer = require('./KafkaConsumer');

const consumer = new KafkaConsumer(['myTopic', 'myOtherTopic']);

consumer.on('message', (message) => {
  // console.log(message);
  console.log('New item has been read');
  setTimeout(() => {
      console.log('Processing has completed', message.offset);
  }, 5000);
});

consumer.connect();