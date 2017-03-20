const express = require("express");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

const User = module.exports = mongoose.model("User", userSchema);

module.exports.getAllUsers = (callback) => {
    query = {};
    User.find(query, callback).sort({ field: 'asc', createdAt: -1 }); //sort descending order
};
module.exports.getUserById = (id, callback) => {
    query = { _id: mongoose.Types.ObjectId(id) };
    User.findOne(query, callback);
};

module.exports.addUser = (newUser, callback) => {
    bcrypt.genSalt(10, (err, salt) => {
        if (err) throw err;
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = salt;
            newUser.save(callback);
        });
    });
};
module.exports.updateUser = (id, updatedUser, callback) => {
    query = { _id: mongoose.Types.ObjectId(id) };
    User.findOneAndUpdate(query, { $set: updatedUser }, { new: true, upsert: true }, callback);
};

module.exports.deleteUser = (id, callback) => {
    query = { _id: mongoose.Types.ObjectId(id) };
    User.findOneAndRemove(query, callback);
};