const express = require('express');
const router = express.Router();
const db = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const checkAuthStatus = request => {
    if (!request.headers.authorization) {
        return false;
    };

    const token = request.headers.authorization.split(" ")[1];
    const loggedInUser = jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
        if (err) {
            return false;
        } else {
            return data;
        };
    });
    return loggedInUser;
}

router.get("/", (req, res) => {
    db.Users.findAll().then(users => {
        res.json(users);
    }).catch(err => {
        console.log(err);
        res.status(500).send("Unable to find users.");
    });
});

router.post("/", (req, res) => {
    db.Users.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        accountName: req.body.accountName,
        password: req.body.password,
        email: req.body.email,
        profileImage: req.body.profileImage
    }).then(newUser => {
        res.json(newUser);
    }).catch(err => {
        console.log(err);
        if (err.errors[0].message === "users.accountName must be unique") {
            return res.status(409).send("Account name is taken, please choose another account name.");
        } else if (err.errors[0].message === "users.email must be unique") {
            return res.status(409).send("Email is already in use.");
        } else {
            res.status(500).send(err);
        };
    });
});

router.post("/login", (req, res) => {
    db.Users.findOne({
        where: {
            email: req.body.email
        }
    }).then(foundUser => {
        if (!foundUser) {
            return res.status(404).send("Unbable to find user")
        };
        if (bcrypt.compareSync(req.body.password, foundUser.password)) {
            const userTokenInfo = {
                email: foundUser.email,
                id: foundUser.id,
                firstName: foundUser.firstName,
                lastName: foundUser.lastName,
                accountName: foundUser.accountName
            };
            const token = jwt.sign(userTokenInfo, process.env.JWT_SECRET, { expiresIn: "2h" });
            return res.status(200).json({ token: token });
        } else {
            return res.status(403).send("Incorrect password, please try again");
        };
    });
});

router.get("/secretProfile", (req, res) => {
    const loggedInUser = checkAuthStatus(req)
    if (!loggedInUser) {
        return res.status(401).send("Invalid token, please try again");
    }
    db.Users.findOne({
        where: {
            id: loggedInUser.id
        }
    }).then(user => {
        res.json(user);
    }).catch(err => {
        console.log(err);
        res.status(500).send(err);
    });
});


module.exports = router;