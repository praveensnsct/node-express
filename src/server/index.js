/* eslint-disable no-console */
import 'universal-dotenv/register';
import app from '../app';

// read environment variables
const {
  DEV_PORT = 5000,
  DEV_HOSTNAME = 'localhost',
} = process.env;

// Check for environment variables before starting server
if (!DEV_PORT || !DEV_HOSTNAME) {
  throw new Error('Unable to identify DEV_PORT or DEV_HOSTNAME. Check environment variables.');
}

// start server at given DEV_HOSTNAME and DEV_PORT
app.listen(DEV_PORT, DEV_HOSTNAME, () => {
  console.log(`App now running on http://${DEV_HOSTNAME}:${DEV_PORT}`);
  console.log('Ctrl + C to stop');
});
