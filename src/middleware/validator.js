'use strict';

function validator(req, res, next) {
    
    let validUserName = /^[a-zA-Z]+$/
    if (!validUserName.test(req.query.name)) {errorHandler()}

    next();

}

module.exports = validator;