const path = require('path');
const express = require('express');
const helmet = require('helmet');
const session = require("express-session")
const KnexSessionStore = require("connect-session-knex")(session)

const usersRouter = require('./users/users-router.js');
const authRouter = require('./auth/auth-router.js');

const server = express();

const config = {
  name:"sessionId",
  secret: "keep it secret, keep it safe",
  cookie:{
    maxAge: 1000 * 60 * 60,
    secure:false,
    httpOnly: true
  },
  resave:false,
  saveUnitialized:false
}

server.use(express.static(path.join(__dirname, '../client')));
server.use(helmet());
server.use(express.json());
server.use(session(config))

server.use('/api/users', usersRouter);
server.use("/api/auth", authRouter);

server.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client', 'index.html'));
});

server.use('*', (req, res) => {
  res.status(404).json({ message: 'not found!' })
});

module.exports = server;
