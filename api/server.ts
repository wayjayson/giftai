/**
 * local server entry file, for local development
 */
import dotenv from 'dotenv';
dotenv.config();

import app from './app.js';

const PORT = process.env.PORT || 3001;

if (!process.env.DEEPSEEK_API_KEY) {
  console.warn('⚠️  Warning: DEEPSEEK_API_KEY is missing in environment variables!');
}

const server = app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server ready on port ${PORT}`);
  // eslint-disable-next-line no-console
  console.log(`API Key configured: ${process.env.DEEPSEEK_API_KEY ? 'Yes' : 'No'}`);
});

/**
 * close server
 */
process.on('SIGTERM', () => {
  // eslint-disable-next-line no-console
  console.log('SIGTERM signal received');
  server.close(() => {
    // eslint-disable-next-line no-console
    console.log('Server closed');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  // eslint-disable-next-line no-console
  console.log('SIGINT signal received');
  server.close(() => {
    // eslint-disable-next-line no-console
    console.log('Server closed');
    process.exit(0);
  });
});

export default app;