import dotenv from 'dotenv';
import app from './app.js';
import { connectDatabase } from './utils/db.js';

dotenv.config();

const PORT = process.env.PORT || 5001;
const HOST = process.env.HOST || '127.0.0.1';

connectDatabase()
  .then(() => {
    app.listen(PORT, HOST, () => {
      console.log(`Statistics API running on http://${HOST}:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Database connection failed:', error.message);
    app.listen(PORT, HOST, () => {
      console.log(`Statistics API running without database on http://${HOST}:${PORT}`);
    });
  });
