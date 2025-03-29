const pool = require('../db');

const ContactModel = {
    // Fetch all contacts
    async getAllContacts(limit, offset, search) {
        const query = `SELECT * FROM contacts
            WHERE name ILIKE $1 OR email ILIKE $1
            ORDER BY name ASC
            LIMIT $2 OFFSET $3`;
        const values = [`%${search}%`, limit, offset];
        const { rows } = await pool.query(query, values);
        return rows;
    },

    // Fetch contact by email or name
    async getContactByEmailOrName(email, name) {
        const query = 'SELECT * FROM contacts WHERE email = $1 OR name = $2';
        const values = [email, name];
        const { rows } = await pool.query(query, values);
        return rows[0];
    },

    // Add new contact to the database
    async addContact(name, email) {
        const query = 'INSERT INTO contacts(name, email) VALUES($1, $2) RETURNING *';
        const values = [name, email];
        const { rows } = await pool.query(query, values);
        return rows[0];
    },

    // Delete contact by ID
    async deleteContact(id) {
        const query = 'DELETE FROM contacts WHERE id = $1';
        await pool.query(query, [id]);
    },

    // Update contact's name and email by ID
    async updateContact(id, name, email) {
        const query = 'UPDATE contacts SET name = $1, email = $2 WHERE id = $3 RETURNING *';
        const values = [name, email, id];
        const { rows } = await pool.query(query, values);
        return rows[0];
    },
};

module.exports = ContactModel;
