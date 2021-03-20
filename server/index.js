const express = require("express");
const app = express();
const port = 5000;
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');

//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

//application/json
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

const mongoose_connect = require('mongoose');
const config = require('./config/key');

mongoose_connect.connect(config.mongoURI, {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log("MongoDB connect success")).catch(err => console.log(err))

app.use('/api/users', require('./routes/users'));



app.listen(port, () => {
    console.log('Init app listen on port ' + port);
})