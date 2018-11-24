const express  = require('express'),
      router   = express.Router({mergeParams: true}),
      {createHotLink, getHotLink, deleteHotLink} = require('../handlers/hotlink');

router.route('/').post(createHotLink);
router.route('/:hotlink_id')
      .get(getHotLink)
      .delete(deleteHotLink);

module.exports = router;