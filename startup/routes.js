const express = require("express");
const deviceRoute = require("../Routes/deviceRoute");
const ccInfoRoute = require("../Routes/ccInfoRoute");
module.exports = function(app){
    app.use(express.json());
    app.use("/api/device", deviceRoute);
    app.use("/api/ccinfo", ccInfoRoute);
}

