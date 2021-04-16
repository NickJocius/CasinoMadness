const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const fs = require('fs');
const path = require("path");

require('dotenv').config();

// app
const app = express();

// db
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(() => console.log('DB connected'));

// middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

//routes middleware
fs.readdirSync('./routes').map((r) => app.use("/api", require('./routes/' + r)));

// production serve static assets
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}


// port
const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Listening on ${port}`);
})
