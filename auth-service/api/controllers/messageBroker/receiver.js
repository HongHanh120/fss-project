const createConnection = require('../../components/rabbitmq/RabbitConnection');

function listenMessageFromQueue(queue, channel) {
    return new Promise((resolve, reject) => {
        channel.consume(queue, (msg) => {
            resolve(JSON.parse(msg.content));
        }, { noAck: true });
    });
}

module.exports = async function consumeMessage (req, res) {
    let connection, channel;
    try {
        connection = await createConnection();
        channel = await connection.createChannel();

        const exchange = 'logs';
        const exchange_type = 'fanout';
        const queue = 'queue_logs'

        await channel.assertExchange(exchange, exchange_type, {
            durable: false,
        });

        await channel.assertQueue(queue, {
            durable: false,
        });

        await channel.bindQueue(queue, exchange, '');
        const msg = await listenMessageFromQueue(queue, channel);
        console.log(" [x] %s", msg.toString());
        res.send({ message: msg });
    } catch (err) {
        res.send({ message: err.message });
    } finally {
        await channel.close();
        await connection.close();
    }
}