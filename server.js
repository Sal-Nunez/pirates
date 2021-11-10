const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors({credentials: true, origin: 'http://localhost:3000'}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
require('./server/config/mongoose.config')
require('./server/routes/user.routes')(app)
require('dotenv').config()
const cookieParser = require('cookie-parser');
app.use(cookieParser())
require('./server/routes/pirate.routes')(app)
require('./server/routes/pirate.routes')
app.listen(8000, () => console.log('The Server is doing its thang on port 8000'))