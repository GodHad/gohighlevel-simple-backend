const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5001;
const API_KEY = process.env.API_KEY;

app.use(bodyParser.json());
app.use(cors());

app.get('/contacts', async (req, res) => {
  const { customFieldValue } = req.query;

  try {
    const response = await axios.get('https://rest.gohighlevel.com/v1/contacts', {
        headers: {
            Authorization: `Bearer ${API_KEY}`, // Add the Bearer token
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

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
