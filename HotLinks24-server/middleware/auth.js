require('dotenv').load();
const jwt = require('jsonwebtoken');

exports.signinRequired = function(req, res, next){
    try{
        let token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, process.env.SECRET_KEY, function(err, decoded){
            if(decoded){
                return next();
            } else{
                return next({
                    status: 201,
                    message: 'Please, Login first!'
                })
            }
        });
    }
    catch(err){
        return next({
            status: 201,
            message: 'Please, Login first!'
        })
    }
}

exports.ensureCorrectUser = function(req, res, next){
    try{
        let token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, process.env.SECRET_KEY, function(err, decoded){
            if(decoded && decoded.id === req.params.id){
                return next();
            } else{
                return next({
                    status: 401,
                    message: 'You are unautherized!'
                })
            }
        })
    }
    catch(err){
        return next({
            status: 401,
            message: 'You are unautherized!'
        })
    }
}