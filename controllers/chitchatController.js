const express = require('express');
const router = express.Router();
const db = require('../models');
const jwt = require('jsonwebtoken');

const checkAuthStatus = request => {
    if (!request.headers.authorization) {
        return false;
    }
    const token = request.headers.authorization.split(" ")[1];

    const loggedInUser = jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
        if (err) {
            return false;
        } else {
            return data;
        };
    });
    console.log(loggedInUser);
    return loggedInUser;
};

router.get("/", (req, res) => {
    db.ChitChats.findAll({

    }).then(chitchat => {
        res.json(chitchat);
    }).catch(err => {
        console.log(err);
        res.status(500).send("Unable to find chat logs");
    });
});

router.get("/:id", (req,res) => {
    db.ChitChats.findOne({
        where: {
            id: req.params.id
        }
    }).then(result => {
        res.json(result);
    }).catch(err => {
        console.log(err);
        res.status(500).send("Unable to find message");
    });
});

router.post("/", (req, res) => {
    const loggedInUser = checkAuthStatus(req)
    if (!loggedInUser) {
        return res.status(401).send("Please login first")
    }
    db.ChitChats.create({
        message: req.body.message,
        ChatRoomId: req.body.ChatRoomId,
        UserId: loggedInUser.id
    }).then(result => {
        res.json(result);
    }).catch(err => {
        console.log(err);
        res.status(500).send("Unable to create new chitchat message");
    });
});

module.exports = router