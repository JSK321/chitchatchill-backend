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
    db.ChatRooms.findAll({

    }).then(rooms => {
        res.json(rooms);
    }).catch(err => {
        console.log(err);
        res.status(500).send("Unable to find chat rooms");
    });
});

router.get("/:id", (req, res) => {
    db.ChatRooms.findOne({
        where: {
            id: req.params.id
        }
    }).then(foundChatRoom => {
        res.json(foundChatRoom)
    }).catch(err => {
        console.log(err)
        res.status(500).send("Unable to find chat room")
    })
})

router.post("/", (req, res) => {
    db.ChatRooms.create({
        roomName: req.body.roomName
    }).then(newChatRoom => {
        res.json(newChatRoom);
    }).catch(err => {
        console.log(err)
        res.status(500).send("Unable to create new chat room");
    });
});

module.exports = router;