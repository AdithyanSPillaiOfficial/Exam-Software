const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const socketIo = require('socket.io');
const verify = require('./handlers/verify');
const login = require('./handlers/login');
const examdetails = require('./handlers/examdetails');
const fetchquestion = require('./handlers/fetchquestion');
const saveAnswer = require('./handlers/saveAnswer');
const getanswers = require('./handlers/getanswers');
const getexams = require('./handlers/adminHandlers/getexams');
const adminlogin = require('./handlers/adminHandlers/adminlogin');
const getsessiondetails = require('./handlers/getsessiondetails');
const userverify = require('./handlers/adminHandlers/userverify');
const adminfetchquestion = require('./handlers/adminHandlers/adminfetchquestion');

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
const connectedSystems = {}
io.on('connection', (socket) => {

  socket.on('registerSystem', () => {
    systemNameIndex++;
    const systemname = 'C' + systemNameIndex;
    const examname = 'Please Verify User'
    const sendObj = {systemname : systemname,examname : examname};
    connectedSystems[socket.id] = {name : systemname, alloted : false};
    socket.emit('systemregistered', sendObj);
    console.log('a system connected, Name : ' + systemname + ' ID : ' + socket.id);
  })

   // Handle disconnections
   socket.on('disconnect', () => {
    const disconnectedSystem = connectedSystems[socket.id];
    if (disconnectedSystem) {
      console.log(`System disconnected: Name: ${disconnectedSystem['name']}, ID: ${socket.id}`);
      delete connectedSystems[socket.id]; // Remove the mapping
    } else {
      console.log(`Unknown user disconnected: ID: ${socket.id}`);
    }
  });


  // Handle custom events
  // socket.on('systemregistered', (msg) => {
  //   console.log('message: ' + msg);
  //   io.emit('chat message', msg); // Broadcast the message to all clients
  // });
});

// client API
app.post('/verify',verify);
app.post('/login', login);
app.post('/examdetails', examdetails);
app.post('/fetchquestion', fetchquestion);
app.post('/saveanswer', saveAnswer);
app.post('/getanswers', getanswers);
app.post('/getsessiondetails', getsessiondetails);

//server API
app.post('/admin/getexams', getexams);
app.post('/admin/adminlogin', adminlogin);
app.post('/admin/userverify', userverify);
app.post('/admin/fetchquestion', adminfetchquestion);

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
