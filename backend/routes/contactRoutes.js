const express = require('express');
const router = express.Router();
const ContactController = require('../controllers/contactController');

router.get('/', ContactController.getContacts);
router.post('/', ContactController.addContact);
router.put('/:id', ContactController.updateContact);
router.delete('/:id', ContactController.deleteContact);

module.exports = router;
