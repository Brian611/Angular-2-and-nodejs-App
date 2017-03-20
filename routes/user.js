const express = require("express");
const router = express.Router();
const User = require("../models/user");
const _ = require('lodash');
const bodyParser = require("body-parser");

router.get("", (req, res) => {
    User.getAllUsers((err, users) => {
        if (err) {
            res.status(500);
            res.json({ success: false, msg: err.errmsg });
        } else {
            if (_.isEmpty(users)) {
                res.status(404);
                res.json({ sucess: false, msg: "Users not found!" });
            } else {
                res.status(200);
                res.json(users);
            }
        }
    });
});

router.get("/user/:id", (req, res) => {
    id = req.params.id;
    User.getUserById(id, (err, user) => {
        if (err) {
            res.status(500);
            res.json({ success: false, msg: err.errmsg });
        } else {
            if (_.isEmpty(user)) {
                res.status(404);
                res.json({ sucess: false, msg: "User not found!" });
            } else {
                res.status(200);
                res.json({ success: true, user: user });
            }
        }
    });
});

router.post("/user", (req, res) => {
    let newUser = User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });
    User.addUser(newUser, (err, user) => {
        if (err) {
            res.status(500);
            res.json({ success: false, msg: err.errmsg });
        } else {
            if (_.isEmpty(user)) {
                res.sendStatus(400);
            } else {
                res.status(201);
                res.json({ success: true, user: user });
            }
        }
    });
});

router.put("/user/:id", (req, res) => {
    id = req.params.id;
    let updatedUser = req.body;
    User.updateUser(id, updatedUser, (err, user) => {
        if (err) {
            res.status(500);
            res.json({ success: false, msg: err.errmsg });
        } else {
            if (_.isEmpty(user)) {
                res.sendStatus(400);
            } else {
                res.status(200);
                res.json({ success: false, user: user });
            }
        }
    });
});

router.delete("/user/:id", (req, res) => {
    id = req.params.id;

    User.deleteUser(id, (err, user) => {
        if (err) {
            res.status(500);
            res.json({ success: false, msg: err.errmsg });
        } else {
            if (_.isEmpty(user)) {
                res.sendStatus(400);
            } else {
                res.status(200);
                res.json({ success: true, user: user });
            }
        }
    });
});

module.exports = router;
