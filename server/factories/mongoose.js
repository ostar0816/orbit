const mongoose = require('mongoose');

require('mongoose-bignumber');

const util = require('util');
const debug = require('debug')('server:mongo');

module.exports = async function() {
  const host = process.env.MONGO_HOST || 'localhost';
  const port = process.env.MONGO_PORT || 27017;
  const db = process.env.MONGO_DB || 'orbit-net';
  const mongoUri = `mongodb://${host}:${port}/${db}`;

  if (process.env.MONGO_DEBUG) {
    mongoose.set('debug', (collectionName, method, query, doc) => {
      debug(`${collectionName}.${method}`, util.inspect(query, false, 20), 20);
    })
  }

  try {
    await mongoose.connect(mongoUri, {
      promiseLibrary: require('bluebird'),
      useNewUrlParser: true,
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.group('MongoDB connection error');
    console.error(`unable connect to database: ${mongoUri}`);
    console.error(error);
    console.groupEnd();
    process.exit(1);
  }
};
