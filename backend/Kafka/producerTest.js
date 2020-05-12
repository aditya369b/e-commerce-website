const KafkaProducer = require('./KafkaProducer.js');

const producer = new KafkaProducer('myTopic');

producer.connect(() => {
  console.log('connected to kafka!');
  setInterval(() => {
    producer.send('Hello world!');
  }, 3000);
});