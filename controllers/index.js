const express = require('express');
const router = express.Router();

// Import all routes
const userRoutes = require('./usersController')
const chatroomsRoutes = require('./chatroomsController')
const chitchatRoutes = require ('./chitchatController')
// const ingredientsRoutes = require('./ingredientsController')
// const stepsRoutes = require('./stepsController')


router.get("/", (req, res) => {
    res.send("Welcome")
})


// Use all routes
router.use('/api/users', userRoutes)
router.use('/api/chatrooms', chatroomsRoutes)
router.use('/api/chitchats', chitchatRoutes)
// router.use('/api/ingredients', ingredientsRoutes)
// router.use('/api/steps', stepsRoutes)

module.exports = router;