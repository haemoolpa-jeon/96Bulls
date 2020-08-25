const mongoose = require('mongoose');

const URI = 'mongodb+srv://deco3800:deco3800@cluster0.2vlgs.mongodb.net/DECO3800?retryWrites=true&w=majority';

const connectDB = async () => {
  try {
    await mongoose.connect(URI, {
      useUnifiedTopology: true, 
      useNewUrlParser: true
    });
  } catch (error) {console.log(error);}
  
  console.log("Database has been connected");
}

module.exports = connectDB;