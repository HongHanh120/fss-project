const createConnection = require('../../components/rabbitmq/RabbitConnection');

module.exports =  async function publishMessage (req, res) {
    let connection, channel;
    try {
        connection = await createConnection();
        channel = await connection.createChannel();

        const exchange = 'logs';
        const exchange_type = 'fanout';
        const message = 'Hello world';

        await channel.assertExchange(exchange, exchange_type, {
            durable: false
        });
        await channel.publish(exchange, '', Buffer.from(JSON.stringify(message)));
        console.log(" [x] Sent %s", message);
        res.send({ message: 'Success' });
    } catch (err) {
        res.send({ message: err.messgae });
    } finally {
        await channel.close();
        await connection.close();
    }
}