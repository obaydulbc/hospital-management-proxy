const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

// ইনকামিং JSON রিকোয়েস্ট পার্স করার জন্য
app.use(express.json());

// Google Apps Script URL-এ রিকোয়েস্ট ফরওয়ার্ড করার জন্য
app.post('/proxy', async (req, res) => {
  try {
    // Axios ব্যবহার করে Google Apps Script এ রিকোয়েস্ট পাঠানো
    const response = await axios.post('https://script.google.com/macros/s/AKfycbyU9wxJDDMpQEGE7lUX97HOsoHjrFpdxcEzH8d1UoPWN2pc_eAUFYW9orLeHfY7T1sqRg/exec', req.body, {
      headers: { 'Content-Type': 'application/json' },
    });
    // সার্ভার থেকে পাওয়া রেসপন্স ক্লায়েন্টে পাঠানো
    res.json(response.data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Failed to proxy request' });
  }
});

// সার্ভার চালু করা
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
