const express = require('express')
const session = require('express-session')
const todo = require('../utils/todo.js')
const user = require('../utils/user.js')
const Redis = require('ioredis')
const redis = new Redis()
const router = express.Router();



async function test() {
	await redis.set('test', 'lol')
	const val = await redis.get('test')
	console.log(val)
}

test().catch((err) => {
	console.log('Error: ', err)
})


router.post('/', (req, res, next) => {
    var username = req.body.username
    var password = req.body.password
    user.insertIntoUsers(username, password).then((result) => {
        user.getUsers().then((result) => {
            res.redirect('/login')
        })
    })
})

router.get('/register', (req, res, next) => {
    res.render('user/edit')
})

module.exports = router