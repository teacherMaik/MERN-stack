const mongoose = require('mongoose');

const connectDB = async () => {

  try {
    
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`Mongo BD connected ${conn.connection.host}`.cyan.underline);
    console.log(`Mongo BD id ${conn.connection.id}`.cyan.underline);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDB;