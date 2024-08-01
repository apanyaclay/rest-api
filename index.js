require('dotenv').config()
const express = require('express'),
PORT = process.env.PORT || "8080",
app = express(),
http = require('http'),
cors = require('cors'),
mainRouter = require('./app/routes');

app.set('view engine', 'ejs');

app.use(cors({ origin: `http://localhost:${PORT}`}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use((req, res, next)=>{
    console.log(`Log : ${req.method} ${req.url}`)
    next()
})

app.use(mainRouter);

app.set("port", PORT)
const server = http.createServer(app)
server.on("listening", () => console.log("APP IS RUNNING ON http://localhost:" + PORT));
server.listen(PORT);