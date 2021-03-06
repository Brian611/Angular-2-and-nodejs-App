const express = require("express");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const contactSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    cellNo: {
        type: Number,
        required: true,
        unique: true
    }
});

const Contact = module.exports = mongoose.model('Contact', contactSchema);

module.exports.getAllContacts = (callback) => {
    query = {};
    Contact.find(query, callback);
};
module.exports.getContactById = (id, callback) => {
    query = { _id: mongoose.Types.ObjectId(id) };
    Contact.findOne(query, callback);
}
module.exports.addContact = (newContact, callback) => {
    newContact.save(callback);
};

module.exports.getContactByName = (name, callback) => {
    query = { name: name };
    Contact.find(query, callback);
};

module.exports.updateContact = (id, updatedContact, callback) => {
    Contact.findByIdAndUpdate(id, { $set: updatedContact }, { upsert: true, new: true }, callback);
};

module.exports.deleteContact = (id, callback) => {
    Contact.findByIdAndRemove(id, callback);
};