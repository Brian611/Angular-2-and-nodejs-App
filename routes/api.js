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

router.get('/contact/:name', (req, res) => {
    let bname = req.params.name;

    Contact.getContactByName(bname, (err, contact) => {
        if (err) {
            res.status(400);
            res.header({ Accept: "application/json" });
            res.json({ success: false, msg: err });
        } else {

            if (contact.length == 0) {
                res.status(404);
                res.header({ Accept: "application/json" });
                res.json({ success: false, msg: "Contact not found!" });
            } else {
                res.status(200);
                res.header({ Accept: "application/json" });
                res.json({ success: true, contact: contact });
            }
        }
    });
});

router.put('/contact/:id', (req, res) => {
    let id = req.params.id;
    let updatedContact = req.body;

    Contact.updateContact(id, updatedContact, (err, contact) => {
        if (err) {
            res.status(400);
            res.header({ Accept: "application/json" });
            res.json({ success: false, msg: err });
        } else {
            if (contact) {
                res.status(200);
                res.header({ Accept: "application/json" });
                res.json({ success: true, contact: contact });
            } else {
                res.status(404);
                res.header({ Accept: "application/json" });
                res.json({ success: true, msg: "Contact not found!" });
            }
        }
    });
});
module.exports = router;