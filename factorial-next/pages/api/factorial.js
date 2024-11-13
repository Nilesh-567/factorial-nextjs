// pages/api/factorial.js
import { calculateFactorial, initializeDatabase, insertNumber } from '../../lib/db';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { number } = req.body;

    // Initialize the database and create the table if not exists
    const initStatus = await initializeDatabase();
    if (initStatus.status === 'error') {
      return res.status(500).json({ message: 'Error initializing database', error: initStatus.message });
    }

    // Calculate factorial
    const result = await calculateFactorial(number);
    if (result.error) {
      return res.status(400).json({ message: result.error });
    }

    // Insert the number into the database
    const insertStatus = await insertNumber(number);
    if (insertStatus.status === 'error') {
      return res.status(500).json({ message: 'Error inserting number', error: insertStatus.message });
    }

    res.status(200).json({
      factorial: result,
      connectionStatus: initStatus.message,
      insertStatus: insertStatus.message,
    });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
