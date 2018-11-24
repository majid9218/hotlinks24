const mongoose = require('mongoose'),
      bcrypt   = require('bcrypt');

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    userName: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profileImageUrl: {
        type: String
    },
    hotLinks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hotlink'
    }]
});

userSchema.pre('save', async function(next){
    try{
        if(!this.isModified('password')){
            return next();
        } 
        let hashedPassword = await bcrypt.hash(this.password, 10);
        this.password = hashedPassword;
        return next();
    }
    catch(err){
        return next(err);
    }
});

userSchema.methods.comparePasswords = async function(candidatePassword, next){
    try{
        let isMatch = await bcrypt.compare(candidatePassword, this.password);
        return isMatch;
    }
    catch(err){
        return next(err);
    }
}

const User = mongoose.model('User', userSchema);
 module.exports = User;