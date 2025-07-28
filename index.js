const express = require('express');
const dotenv = require('dotenv');
const helmet = require('helmet');
const cors = require('cors')
// const csrf = require('csurf');
const cookieParser = require('cookie-parser')
const session = require('./middleware/sessionMiddleware');
const httpLogger = require('./middleware/httpLogger');
const logger = require('./middleware/logger');
const userRouter = require('./routes/user');
const bookRouter = require('./routes/bookStore');
const fileRouter = require('./routes/file');
const streamRouter = require('./routes/stream');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');
const rateLimiter = require('./middleware/rateLimiter');

const port = 3000;

dotenv.config();

connectDB();

//init app
const app = express();

//middleware 
app.use(express.json());

// Log HTTP requests
app.use(httpLogger);

// Example Winston log
logger.info('App started');

app.use(cookieParser());
app.use(session);

// Security middleware
app.use(helmet())
app.use(cors()); // Allow all origins (dev mode)
// For more secure config:
// app.use(cors({
//   origin: ['https://yourfrontend.com'], // allowed domains
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   credentials: true
// }));
app.use(rateLimiter);

// CSRF middleware
// const csrfProtection = csrf({ cookie: { httpOnly: true, sameSite: 'strict' } });
// app.use(csrfProtection);

// app.get('/form', (req, res) => {
//   res.json({ csrfToken: req.csrfToken() });
// });

app.use("/user",userRouter)
// Use book routes
app.use('/books', bookRouter);
app.use('/file', fileRouter);
app.use('/stream', streamRouter);

app.use('/ping', require('./routes/ping'));

//routes
app.get("/", (req, res) => {
    res.send('Hello World');
})

// Error Handler
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server Running On Port: ${port}`)
})

module.exports = app;
