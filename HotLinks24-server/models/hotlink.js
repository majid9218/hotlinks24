const mongoose = require('mongoose'),
      User     = require('./user'),
      ttl      = require('mongoose-ttl');

require('mongoose-type-url');


hotLinkSchema = mongoose.Schema({
    text: {
        type: String,
        required: true,
        maxLength: 80
    },
    link: {
        type: mongoose.SchemaTypes.Url,
        required: true,
        unique: true
    },
    title: '',
    description: '',
    image: '',
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'User'
    }
}, {timestamps: true});

hotLinkSchema.pre('remove', async function(next){
    try{
    let user = await User.findById(this.user);
    user.hotLinks.remove(this.id);
    await user.save()
    return next();
    } catch(err){
        next(err);
    }
});

hotLinkSchema.plugin(ttl, { ttl: 86400000 });

const Hotlink = mongoose.model('Hotlink', hotLinkSchema);

module.exports = Hotlink;