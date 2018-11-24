const mongoose = require('mongoose');

mongoose.Promise = Promise;

mongoose.set('debug', true);

mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost:27017/hotlinks24', {
    keepAlive: true,
    useNewUrlParser: true
});

module.exports.User = require('./user');
module.exports.Hotlink = require('./hotlink');
