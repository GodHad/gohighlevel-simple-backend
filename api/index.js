const express = require('express');
const app = express();
const axios = require('axios');
const API_KEY = process.env.API_KEY;

app.get('/api/contacts', async (req, res) => {
    try {
        const { customFieldValue } = req.query;
        const response = await axios.get('https://rest.gohighlevel.com/v1/contacts', {
            headers: {
                Authorization: `Bearer ${API_KEY}`, 
            },
        });
    
        const filteredContacts = response.data.contacts.find(contact => {
            return contact.customField.some(field => field.value === customFieldValue);
        });
        res.json(filteredContacts);
    } catch (error) {
        console.error('Error fetching contacts:', error);
        res.status(500).send('Failed to fetch contacts');
    }
});

module.exports = app;