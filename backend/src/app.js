require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const passport = require("passport")
const cookieParser = require('cookie-parser');
const errorHandler = require("./middlewares/errorHandeling.middleware");
const authRoutes = require('./routers/auth.route');
const scamDetectRoutes = require("./routers/scan.route")
const repostScamRoutes = require("./routers/repost.route")
const {setupGoogleAuth} = require("./services/oAuth.service")
const rateLimiterMiddleware = require("./middlewares/rateLimiter.middleware")
const helmet = require("helmet")
const path = require("path")

const app = express();

app.use(morgan('dev'));
app.use(cors({
    origin: "http://localhost:5173",
    methods: ["POST", "GET", "DELETE"],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}))
app.use(helmet());
app.use(express.json());
app.use(cookieParser());
app.use(rateLimiterMiddleware.globalRateLimit);
app.use(passport.initialize());

setupGoogleAuth()

app.use('/api/auth', authRoutes);
app.use('/api/scan', scamDetectRoutes);
app.use("/api/repost", repostScamRoutes)
app.use(express.static(path.join(__dirname, "../public/dist")))

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/dist", "index.html"))
})

app.use(errorHandler);

module.exports = app;