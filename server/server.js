const jsonServer = require("json-server");
const auth = require("json-server-auth");
const server = jsonServer.create();
// const router = jsonServer.router("db.json");
const path = require("path");
var express = require('express')
const router = jsonServer.router(path.join(__dirname, "database/db.json"));
server.use('/static', express.static(path.join(__dirname, 'public')))

const middlewares = jsonServer.defaults();
const port = process.env.PORT || 3000;

server.db = router.db;

server.use(middlewares);
server.use(auth);
server.use(router);

server.listen(port);

