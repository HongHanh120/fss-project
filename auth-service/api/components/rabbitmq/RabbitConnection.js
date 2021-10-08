const amqp = require('amqplib');
const amqp_url = 'amqp://localhost';

const connection = async () => await amqp.connect(amqp_url);

module.exports = connection;