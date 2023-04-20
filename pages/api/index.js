
const WebSocket = require('ws');







export default async function handler(req, res) {

  const zkInstance = await connect();


  const wss = new WebSocket.Server({ port: 3333 });
  wss.on('connection', (ws) => {
    ws.send("connected");
  });


  zkInstance.getRealTimeLogs((err, data) => {

    if (err) {
      console.log('Error in registering real time event');
      console.log(err);
    }

    wss.clients.forEach((client) => {
      client.send(client + ' ' + data);
    });

    console.log('Attendance From: ', zkInstance.ip);
    console.log({ Attendance: data });

  });



  res.status(200).json({ message: 'Hello World' });
}
