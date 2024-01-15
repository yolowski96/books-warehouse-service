import app from './server-setup';
import { initializeDatabase } from './db';


const dbName = process.env.DATABASE_NAME || 'books';
const port = 3000;

initializeDatabase(dbName)
  .then(() => {
    console.log('Database initialized');

    app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error('Error initializing database:', err);
  });
