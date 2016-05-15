var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', function(err, conn) {
    if (err) {
        console.log(err);
        return;
    }
    conn.createChannel(function(err, ch) {
        var q = 'worker1';

        ch.assertQueue(q, {
            durable: false
        });
        ch.sendToQueue(q, new Buffer('Hello World!'));
        console.log(" [x] Sent 'Hello World!'");
    });
    setTimeout(function() {
        conn.close();
        process.exit(0);
    }, 500);
});


amqp.connect('amqp://localhost', function(err, conn) {
    conn.createChannel(function(err, ch) {
        var queue = 'worker1';

        ch.assertQueue(queue, {
            durable: false
        });
        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);
        ch.consume(queue, function(msg) {
            console.log(" [x] Received %s", msg.content.toString());
        }, {
            noAck: true
        });
    });
});