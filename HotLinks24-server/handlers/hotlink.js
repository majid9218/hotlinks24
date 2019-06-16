const db = require('../models');
const metascraper = require('metascraper')([
    require('metascraper-description')(),
    require('metascraper-image')(),
    require('metascraper-title')(),
    ]);
const got = require('got');


exports.createHotLink = async function(req, res, next){
    try{

        let {body: html, url} = await got(req.body.link);
        let metadata = await metascraper({html, url});
        
        const text = typeof(req.body.text) == 'string' ? req.body.text : '';
        const link = typeof(req.body.link) == 'string' ? req.body.link : 'https://example.com/';
        const title = typeof(metadata.title) == 'string' ? metadata.title : '';
        const description = typeof(metadata.description) == 'string' ? metadata.description : '';
        const image = typeof(metadata.image) == 'string' ? metadata.image : 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Color_icon_white.svg/800px-Color_icon_white.svg.png';
        
        let newHotLink = await db.Hotlink.create({
            text: text,
            link: link,
            title: title,
            description: description,
            image: image,
            user: req.params.id
        });
        let user = await db.User.findById(req.params.id);
        user.hotLinks.push(newHotLink.id);
        await user.save();                         

        let createdHotLink = await db.Hotlink.findById(newHotLink._id).populate('user', {
            userName: true,
            profileImageUrl: true
        });
        return res.status(200).json(createdHotLink);
    }
    catch(err){
        next(err);
    }
}

exports.getHotLink = async function(req, res, next){
    try{
        let hotLink = await db.Hotlink.findById(req.params.hotlink_id);
        return res.status(200).json(hotLink);
    }
    catch(err){
        next(err);
    }
}

exports.deleteHotLink = async function(req, res, next){
    try{
        let hotLink = await db.Hotlink.findById(req.params.hotlink_id);
        await hotLink.remove();
        return res.status(200).json(hotLink);
    }
    catch(err){
        next(err);
    }
}
