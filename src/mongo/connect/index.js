/* eslint-disable no-console */
import mongoose from 'mongoose';
import configuration from '../configure';

export default () => {
  console.log(configuration.connectionString, configuration.options)
  mongoose.connect(configuration.connectionString, configuration.options, (err) => {
    if (err) {
      console.error('Error in connection', err);
      throw err;
    }
    console.log('Database Connection established');
  });
};
