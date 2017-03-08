const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Contact = require("../models/contact");

router.get("/contacts", (req, res) => {
    Contact.getAllContacts((error, contacts) => {
        if (error) {
            res.status(500);
            res.json({ success: false, msg: error });
        } else {
            if (contacts) {
                res.status(200);
                res.header({ Accept: "application/json" });
                res.json({ success: true, contacts: contacts });
            } else {
                res.status(404);
                res.json({ success: false, msg: "Error : Contacts unavailable" });
            }

        }
    });
});

router.post('/contact', (req, res) => {
    let newContact = Contact({
        name: req.body.name,
        surname: req.body.surname,
        cellNo: req.body.cellNo
    });

    Contact.addContact(newContact, (error, contact) => {
        if (error) {
            res.status(400);
            res.json({ success: false, msg: error });
        } else {
            res.status(201);
            res.json({ success: true, contact: contact });
        }
    });
});

module.exports = router;