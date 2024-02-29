require('dotenv').config();

const express = require('express');
const cors = require('cors');
const http = require('http');
const socketIO = require('socket.io');
const { connectDB } = require('../db/config');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);
module.exports.io=io;

connectDB();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"))
app.use(cookieParser());

// Add your socket.io logic here

const userRouter = require('../routes/user.routes')

app.use('./api/v1',userRouter);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
