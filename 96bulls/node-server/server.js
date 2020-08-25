
const express = require('express');
const app = express();
const connectDB = require('./DB/Connection');

connectDB();

app.use(express.json());

const userRoutes = require('./routes/user');
const User = require('./DB/User');
app.use('/user', userRoutes);


const port = 4000;
app.listen(port, () => {
  console.log(`Server started on ${port}`);
})

const test = async () => {
  let userModel = new User({username: "Jesse", password: "Password1!"});
  await userModel.save();
}

test();
