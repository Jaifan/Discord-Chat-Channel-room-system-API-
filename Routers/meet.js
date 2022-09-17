const express = require('express');
const {createMeet,getAllMeet,addMember,removeMember,getMeet,sendMessage,removeMessage,removeMemberByOwner} = require('../Controllers/meet')
const router = express.Router();

router.route('/').post(createMeet).get(getAllMeet)
router.route('/addMember').post(addMember)
router.route('/:meetid').get(getMeet)
router.route('/:meetid/removeMember').get(removeMember)
router.route('/:meetid/removeMember/:userid').get(removeMemberByOwner)
router.route('/:meetid/sendMessage').post(sendMessage)
router.route('/:meetid/removeMessage/:msgid').get(removeMessage)
module.exports = router