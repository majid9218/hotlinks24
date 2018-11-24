const jwt = require('jsonwebtoken'),
      db  = require('../models');

exports.signin = async function(req, res, next){
    try{
    //find user
    let user = await db.User.findOne({
        email: req.body.email
    });
    let {id, userName, profileImageUrl} = user;
    //compare password
    let isMatch = await user.comparePasswords(req.body.password);
    //is match
    if(isMatch){
        let token = jwt.sign({
            id,
            userName
        }, process.env.SECRET_KEY);

        return res.status(200).json({
            id,
            userName,
            profileImageUrl,
            token
        });
    } else{
        return next({
            status: 400,
            message: 'invlid email or password'
        });
    }

    } catch(err){
        next({
            status: 400,
            message: 'invalid email or password'
        })
    }
    
}

exports.signup = async function(req, res, next){
    try{
        //create new user in the db
        let user = await db.User.create(req.body);
        let {id, userName, profileImageUrl} = user;
        //signing token by jwt
        let token = jwt.sign(
            {
                id,
                userName
            }, 
            process.env.SECRET_KEY);
        // returning json
        return res.status(200).json({
            id,
            userName,
            profileImageUrl,
            token
        });
    }
    catch(err){
        if(err.code===11000){
            err.message = 'email or username is taken!'
        }
        next({
            status: 400,
            message: err.message
        });
    }
}