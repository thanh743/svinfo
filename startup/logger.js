// logger.js
const morgan = require('morgan'); // Optional: morgan is a popular logging middleware

module.exports = function(app){
    app.use(morgan('dev'));
    app.use((req, res, next) => {
        console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
        next();
    });
};