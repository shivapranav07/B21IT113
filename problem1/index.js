const express = require('express');
const axios = require('axios');
const app = express();

const TIMEOUT = 5000; // Increased timeout
const RETRY_LIMIT = 3; // Retry limit

// Store for previous and current states
let previousState = [];
let currentState = [];

// Mapping of types to descriptions
const typeDescriptions = {
  e: 'Even Numbers',
  p: 'Prime Numbers',
  o: 'Odd Numbers'
};

async function fetchData(url, accessToken, retryCount = 0) {
  try {
    const response = await axios.get(url, {
      timeout: TIMEOUT,
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Accept': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
     console.log(error.message);
  }
}

app.get('/numbers/:type', async (req, res) => {
  const { type } = req.params;
  const { url } = req.query;
  const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzIxODg5MzQwLCJpYXQiOjE3MjE4ODkwNDAsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6Ijk0NmQ0ZTVhLTk3ZTEtNDE0MS05ZWVhLTA2ZDU3MTVhNmYwZiIsInN1YiI6ImIyMWl0MTEzQGtpdHN3LmFjLmluIn0sImNvbXBhbnlOYW1lIjoiZ29NYXJ0IiwiY2xpZW50SUQiOiI5NDZkNGU1YS05N2UxLTQxNDEtOWVlYS0wNmQ1NzE1YTZmMGYiLCJjbGllbnRTZWNyZXQiOiJNRGxZakpIUG93UnRHTVd4Iiwib3duZXJOYW1lIjoiU2hpdmFwcmFuYXYiLCJvd25lckVtYWlsIjoiYjIxaXQxMTNAa2l0c3cuYWMuaW4iLCJyb2xsTm8iOiJiMjFpdDExMyJ9.0zj00oSqRLm_QZnrs1PySn9YwemGqvTD5Z2vW_W8Z6Y'; 

  if (!url) {
    return res.status(400).send('URL query parameter is required.');
  }

  if (!typeDescriptions[type]) {
    return res.status(400).send('Invalid type parameter. Use "e" for even, "p" for prime, or "o" for odd.');
  }

  try {
    const data = await fetchData(url, accessToken);

    //  i tried to decode errors by logging this
    console.log('Response Data:', data);
    console.log('Data Type:', typeof data);
    console.log('Is Array:', Array.isArray(data.numbers));

    // Check if the response data contains an array of numbers
    if (!data || !Array.isArray(data.numbers)) {
      return res.status(500).send('Expected an array of numbers in the "numbers" property.');
    }
        //you can also use for loop here instead of map
        const numbers = data.numbers.map(num => {
            if (typeof num !== 'number') {
              return res.status(500).send('Array contains non-numeric values.');
            }
            return num;
          });
          

    // Update previous and current states
    previousState = currentState;
    currentState = filteredCurrentState;

    const filteredCurrentState = currentState.filter(num => !previousState.includes(num));

    // Calculate the average of the filtered current numbers
    const avg = filteredCurrentState.reduce((sum, num) => sum + num, 0) / filteredCurrentState.length;

    const result = {
      type: typeDescriptions[type],
      numbers: filteredCurrentState,
      windowsprevState: previousState,
      windowscurrentState: currentState,
      avg: avg,
    };

    res.json(result);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error fetching numbers.');
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
