const ContactModel = require('../models/contactModel');

const ContactController = {
    async getContacts(req, res) {
        try {
            const { limit = 10, offset = 0, search = '' } = req.query;
            const contacts = await ContactModel.getAllContacts(parseInt(limit), parseInt(offset), search);
            res.json(contacts);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching contacts' });
        }
    },

    async addContact(req, res) {
        try {
            const { name, email } = req.body;
            if (!name || !email) return res.status(400).json({ message: 'Name and email are required' });

            const existing = await ContactModel.getContactByEmailOrName(email, name);
            if (existing) return res.status(409).json({ message: 'Contact with same name or email exists' });

            const newContact = await ContactModel.addContact(name, email);
            res.status(201).json(newContact);
        } catch (error) {
            res.status(500).json({ message: 'Error adding contact' });
        }
    },

    async deleteContact(req, res) {
        try {
            const { id } = req.params;
            await ContactModel.deleteContact(id);
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: 'Error deleting contact' });
        }
    },

    async updateContact(req, res) {
        try {
        const { id } = req.params;
        const { name, email } = req.body;
        const existing = await ContactModel.getContactByEmailOrName(email, name);
        if (existing && existing.id != id) return res.status(409).json({ message: 'Another contact with same name or email exists' });

        const updated = await ContactModel.updateContact(id, name, email);
            res.json(updated);
        } catch (error) {
            res.status(500).json({ message: 'Error updating contact' });
        }
    },
};

module.exports = ContactController;
