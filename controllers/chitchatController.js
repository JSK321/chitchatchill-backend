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
// router to get ALL messages in every chatroom (not used currently)
router.get("/", (req, res) => {
    db.ChitChats.findAll({

    }).then(chitchat => {
        res.json(chitchat);
    }).catch(err => {
        console.log(err);
        res.status(500).send("Unable to find chat logs");
    });
});
// router to find all chat messages in chatroom 
router.get("/chatRoom/:ChatRoomId", (req, res) => {
    db.ChitChats.findAll({
        where: {
            ChatRoomId: req.params.ChatRoomId
        }
    }).then(messages => {
        res.json(messages);
    }).catch(err => {
        console.log(err);
        res.status(500).send("Unable to find messages");
    });
});
// router to find one specific message in chatroom
router.get("/message/:id", (req, res) => {
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
// router to post a message in chatroom
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
// router to update a specific message in chatroom
router.put("/message/:id", (req, res) => {
    const loggedInUser = checkAuthStatus(req)
    if (!loggedInUser) {
        return res.status(401).send("Please login first")
    };
    db.ChitChats.findOne({
        where: {
            id: req.params.id
        }
    }).then(foundMessage => {
        if (loggedInUser.id === foundMessage.UserId) {
            db.ChitChats.update({
                message: req.body.message
            },
                {
                    where: {
                        id: foundMessage.id
                    }
                }).then(updatedMessage => {
                    res.json(updatedMessage);
                }).catch(err => {
                    console.log(err);
                    res.status(500).send("Unable to update message");
                })
        } else {
            return res.status(401).send("Not your message!");
        };
    });
});

module.exports = router