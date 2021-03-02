const express = require('express');
const router = express.Router();
const db = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const checkAuthStatus = request => {
    if (!request.headers.authorization) {
        return false
    }

    const token = request.headers.authorization.split(" ")[1]
    const loggedInUser = jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
        if (err) {
            return false
        } else {
            return data
        }
    })
    return loggedInUser
}

router.get("/", (req,res) => {
    db.Users.findAll().then(users => {
        res.json(users)
    }).catch(err => {
        console.log(err)
        res.status(500).send("Unable to find users.")
    })
})

module.exports = router