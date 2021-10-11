const createConnection = require('../../../api/components/rabbitmq/RabbitConnection');

const amqp = require('amqplib');
require('should');

const exchange = 'exchangeTest';
const exchange_type = 'fanout';
const queue = 'queueTest';
const msg = 'Hello World';

function listenMessageFromQueue(queue, channel) {
    return new Promise((resolve, reject) => {
        channel.consume(queue, (msg) => {
            resolve(JSON.parse(msg.content));
        }, { noAck: true });
    });
};

describe('Testing RabbitMQ', function() {
    // it('Sending message to RabbitMQ Server', async function() {
    //     let connection, channel;
    //     connection = await createConnection();
    //     channel = await connection.createChannel();

    //     await channel.assertExchange(exchange, exchange_type, {
    //         durable: false,
    //     });
    //     await channel.publish(exchange, '', Buffer.from(JSON.stringify(msg)));
    //     console.log(" [x] Sent %s", msg);

    //     await channel.close();
    //     await connection.close();
    // });

    it('Receiving message from RabbitMQ Server', async function() {
        let connection, channel;
        connection = await createConnection();
        channel = await connection.createChannel();

        await channel.assertExchange(exchange, exchange_type, {
            durable: false,
        });
        await channel.publish(exchange, '', Buffer.from(JSON.stringify(msg)));
        console.log(" [x] Sent %s", msg);

        await channel.close();
        await connection.close();

        connection = await createConnection();
        channel = await connection.createChannel();

        await channel.assertExchange(exchange, exchange_type, {
            durable: false,
        });
        await channel.assertQueue(queue, {
            durable: false,
        });

        await channel.bindQueue(queue, exchange, '');
        const result = await listenMessageFromQueue(queue, channel);
        console.log(" [x] Received %s", result.toString());
        if(result != msg) {
            return new Error(
                `Should return exactly ${msg} from queueTest in RabbitMQ Server. ` + 
                `But instead, got message ${result}.`
            );
        }
        
        await channel.close();
        await connection.close();
    });
})