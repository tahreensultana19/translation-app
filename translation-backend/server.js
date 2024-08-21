// const express = require('express');
// const { Pool } = require('pg');
// const bodyParser = require('body-parser');
// const cors = require('cors');

// const app = express();
// const port = process.env.PORT || 5000;

// // Middleware
// app.use(cors());
// app.use(bodyParser.json());

// // Database connection
// const pool = new Pool({
//   user: "db_hssz_user",
//   host: "dpg-cqqhmaggph6c738bv33g-a",
//   database: "db_hssz",
//   password: "AB47q4LOYCAM9R8JKQxBwq0uqaFVh1KJ",
//   port: 5432,
// });

// // Function to create the table if it doesn't exist
// const createTableIfNotExists = async () => {
//   const createTableQuery = `
//     CREATE TABLE IF NOT EXISTS translations (
//       id SERIAL PRIMARY KEY,
//       original_message TEXT NOT NULL,
//       translated_message TEXT NOT NULL,
//       language VARCHAR(50) NOT NULL,
//       model VARCHAR(50) NOT NULL,
//       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
//     );
//   `;

//   try {
//     await pool.query(createTableQuery);
//     console.log('Table "translations" is ready.');
//   } catch (error) {
//     console.error('Error creating table:', error);
//   }
// };

// // Create the table when the server starts
// createTableIfNotExists();

// // Route for handling POST requests
// app.post('/api/translations', async (req, res) => {
//   const { original_message, translated_message, language, model } = req.body;
//   if (!original_message || !translated_message || !language || !model) {
//     res.status(400).json({ error: 'Missing required fields' });
//     return;
//   }

//   try {
//     const result = await pool.query(
//       'INSERT INTO translations (original_message, translated_message, language, model) VALUES ($1, $2, $3, $4) RETURNING *',
//       [original_message, translated_message, language, model]
//     );
//     res.status(201).json(result.rows[0]);
//   } catch (error) {
//     console.error('Database insertion error:', error);
//     res.status(500).json({ error: 'Database insertion error' });
//   }
// });

// // Start the server
// app.listen(port,"0.0.0.0", () => {
//   console.log(`Server is running on port ${port}`);
// });
// const express = require('express');
// const { Pool } = require('pg');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const DeepL = require('deepl-node'); // Import DeepL library
// const { Configuration, OpenAIApi } = require("openai"); // Import OpenAI library

// const app = express();
// const port = process.env.PORT || 5000;

// // Middleware
// app.use(cors());
// app.use(bodyParser.json());

// // Database connection
// const pool = new Pool({
//   user: "db_g1nc_user",
//   host: "dpg-cqqhmaggph6c738bv340-a",
//   database: "db_g1nc",
//   password: "S47FmwkrBEJtlbSLAOBvMDW9BDU7EOv5",
//   port: 5432,
// });

// // DeepL authentication
// const deepl = new DeepL(process.env.DEEPL_AUTH_KEY); // Assuming you have DEEPL_AUTH_KEY in your .env file

// // OpenAI authentication
// const configuration = new Configuration({
//   apiKey: process.env.OPENAI_API_KEY, // Assuming you have OPENAI_API_KEY in your .env file
// });
// const openai = new OpenAIApi(configuration);

// // Function to create the table if it doesn't exist
// const createTableIfNotExists = async () => {
//   const createTableQuery = `
//     CREATE TABLE IF NOT EXISTS translations (
//       id SERIAL PRIMARY KEY,
//       original_message TEXT NOT NULL,
//       translated_message TEXT NOT NULL,
//       language VARCHAR(50) NOT NULL,
//       model VARCHAR(50) NOT NULL,
//       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
//     );
//   `;

//   try {
//     await pool.query(createTableQuery);
//     console.log('Table "translations" is ready.');
//   } catch (error) {
//     console.error('Error creating table:', error);
//   }
// };

// // Create the table when the server starts
// createTableIfNotExists();

// // Route for handling POST requests
// app.post('/api/translations', async (req, res) => {
//   const { original_message, language, model } = req.body;
//   if (!original_message || !language || !model) {
//     res.status(400).json({ error: 'Missing required fields' });
//     return;
//   }

//   try {
//     let translated_message;
//     if (model === 'deepl') {
//       // Use DeepL for translation
//       const result = await deepl.translateText(original_message, language);
//       translated_message = result.text;
//     } else if (model === 'openai') {
//       // Use OpenAI for translation
//       const response = await openai.createChatCompletion({
//         model: "gpt-3.5-turbo", // Or another OpenAI model
//         messages: [
//           { role: "system", content: `Translate the following text into ${language}: ${original_message} `},
//         ],
//       });
//       translated_message = response.data.choices[0].message.content.trim();
//     } else {
//       // Handle other models or send an error response
//       res.status(400).json({ error: 'Invalid model specified' });
//       return;
//     }

//     // Insert translation data into the database
//     const result = await pool.query(
//       'INSERT INTO translations (original_message, translated_message, language, model) VALUES ($1, $2, $3, $4) RETURNING *',
//       [original_message, translated_message, language, model]
//     );
//     res.status(201).json(result.rows[0]);
//   } catch (error) {
//     console.error('Database insertion error:', error);
//     res.status(500).json({ error: 'Database insertion error' });
//   }
// });

// // Start the server
// app.listen(port, '0.0.0.0', () => {
//   console.log(`Server is running on port ${port}`);
// });


const express = require('express');
const { Pool } = require('pg');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Database connection
const pool = new Pool({
  user: "db_hssz_user",
  host: "dpg-cqqhmaggph6c738bv33g-a",
  database: "db_hssz",
  password: "AB47q4LOYCAM9R8JKQxBwq0uqaFVh1KJ",
  port: 5432,
});

// Function to create the table if it doesn't exist
const createTableIfNotExists = async () => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS translations (
      id SERIAL PRIMARY KEY,
      original_message TEXT NOT NULL,
      translated_message TEXT NOT NULL,
      language VARCHAR(50) NOT NULL,
      model VARCHAR(50) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  try {
    await pool.query(createTableQuery);
    console.log('Table "translations" is ready.');
  } catch (error) {
    console.error('Error creating table:', error);
  }
};

// Create the table when the server starts
createTableIfNotExists();

// Route for handling POST requests
app.post('/api/translations', async (req, res) => {
  const { original_message, translated_message, language, model } = req.body;
  if (!original_message || !translated_message || !language || !model) {
    res.status(400).json({ error: 'Missing required fields' });
    return;
  }

  try {
    const result = await pool.query(
      'INSERT INTO translations (original_message, translated_message, language, model) VALUES ($1, $2, $3, $4) RETURNING *',
      [original_message, translated_message, language, model]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Database insertion error:', error);
    res.status(500).json({ error: 'Database insertion error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});