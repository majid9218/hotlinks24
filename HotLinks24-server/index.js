require('dotenv').config();

const express      = require('express'),
      app          = express(),
      bodyParser   = require('body-parser'),
      cors         = require('cors'),
      PORT         = process.env.PORT || 8081,

      errorHandler = require('./handlers/error'),
      authRoutes   = require('./routes/auth'),
      hotLinkRoutes   = require('./routes/hotlink'),
      {signinRequired, ensureCorrectUser} = require('./middleware/auth'),
      db = require('./models'),
      jwt = require('jsonwebtoken');

app.use(cors());
app.use(bodyParser.json());

//All routes goes here!

app.get('/api/hotlinks', async function(req, res, next){
    try{
        let hotLinks = await db.Hotlink.find().sort({createdAt: 'desc'}).limit(5).skip(5 * req.query.page).populate('user', {
            userName: true,
            profileImageUrl: true
        });
        res.status(200).json(hotLinks);
    }
    catch(err){
        next(err);
    }
});

app.use('/api/auth', authRoutes);
app.use('/api/users/:id/hotlinks', 
        signinRequired, 
        ensureCorrectUser, 
        hotLinkRoutes);

app.put('/api/users/:id/edit', 
        signinRequired, 
        ensureCorrectUser,  
        async function(req, res, next){
            try{
            let user = await db.User.findByIdAndUpdate(req.params.id, 
                {userName: req.body.userName, profileImageUrl: req.body.profileImageUrl},
                {new: true},
                 function(err, result){
                     if(err){
                        if(err.code===11000){
                            err.message = 'Username is taken!'
                        }
                        next({
                            status: 400,
                            message: err.message
                        });
                     } 
                     else{
                        let {id, userName, profileImageUrl} = result;
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
                     }

                 });
            }
            catch(err){
                if(err.code===11000){
                    err.message = 'Username is taken!'
                }
                next({
                    status: 400,
                    message: err.message
                });
            }
        }
);

app.use(function(req, res, next){
    let err = new Error('Error 404: Page Not Found!');
    err.status = 404;
    next(err);
});

app.use(errorHandler);

app.listen(PORT, function(){
    console.log(`server started on PORT: ${PORT}`);
});