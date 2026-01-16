const config = require('./config/config');
const connectDB = require('./config/db');
const app = require('./app');

const startServer = async () => {
  try {
    await connectDB();
    app.listen(config.port, () => {
      console.log(`Server running on port ${config.port}`);
    });
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

startServer();