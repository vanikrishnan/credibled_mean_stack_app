const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');
console.log('in routes')

router.post('/createUser', UserController.create);
router.put('/updateUser', UserController.update);
router.post('/fetchUser', UserController.fetchUserByID);
router.get('/userList', UserController.fetchUsers )

module.exports = router;