const net = require('net');

module.exports = { sendMessage };

function sendMessage(message, callback) {
  const client = net.createConnection({ port: 16050 }, () => {
    client.write(message);
  });

  client.on('data', (data) => {
    client.destroy();
    callback(data.toString());
  });
}


