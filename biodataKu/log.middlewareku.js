const { request, response } = require("express");

function logger(request, response, next) {
    console.log(`Ada request yang masuk dari ${request.url}`);
    
    next();
}

module.exports = {logger};

