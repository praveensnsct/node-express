const {
  MONGO_DB_HOST,
  MONGO_DB_PORT,
  MONGO_DB_NAME,
} = process.env;

// connection string used for simple connection access
const connectionString = `mongodb://${MONGO_DB_HOST}:${MONGO_DB_PORT}/${MONGO_DB_NAME}?authSource=admin`;

// mongo connection options
const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
  keepAlive: true,
  bufferMaxEntries: 0, // and MongoDB driver buffering
};

module.exports = { connectionString, options };
