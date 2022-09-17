require('express-async-errors');
const path = require('path');
const dbConnect = require('./DB/db');
const AuthSystem = require('./Routers/auth');
const MeetSystem = require('./Routers/meet');
const notFound = require('./Middlewares/notFound');
const errorsHandle = require('./Middlewares/errorsHandle');
const authMiddleware = require('./Middlewares/authMiddleware');
const express = require('express');

//App Initialzaed!
const baseApiUrl = '/api/v1';
const app = express();


// Security Feature
const helmet = require('helmet');
const cors = require('cors');
const xssClean = require('xss-clean');
const rateLimiter = require('express-rate-limit');

//middleware
app.set('trust proxy', 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  })
);
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xssClean());

//App Routes
app.get('/', (req,res)=> {
    res.sendFile(path.join(__dirname, '/index.html'))
  });
app.use(`${baseApiUrl}/auth`,AuthSystem);
app.use(`${baseApiUrl}/meetroom`,authMiddleware,MeetSystem);

//Error Handling
app.use(notFound);
app.use(errorsHandle);

//Database Coonection
dbConnect();

const start = () => {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, console.log(`Server is listening on port ${PORT}...`));
}

start();