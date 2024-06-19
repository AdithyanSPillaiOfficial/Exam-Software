const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const socketIo = require('socket.io');
const verify = require('./handlers/verify');
const login = require('./handlers/login');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: '*', // specify the frontend origin
    methods: ['GET', 'POST']
  }
});

var systemNameIndex = 0;

// Serve static files from the "public" directory
app.use(express.static('public'));
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());




// Set up a simple route
app.get('/', (req, res) => {
  //res.sendFile(__dirname + '/public/index.html');
  res.json({ status: 'OK' });
});

// Handle socket connections
io.on('connection', (socket) => {

  socket.on('registerSystem', () => {
    systemNameIndex++;
    const systemname = 'C' + systemNameIndex;
    socket.emit('systemregistered', systemname);
    console.log('a system connected, Name : ' + systemname);
  })

  // Handle disconnections
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  // Handle custom events
  // socket.on('systemregistered', (msg) => {
  //   console.log('message: ' + msg);
  //   io.emit('chat message', msg); // Broadcast the message to all clients
  // });
});


app.post('/verify',verify);
app.post('/login', login);

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
