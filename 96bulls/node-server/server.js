
const express = require('express');
const app = express();
const connectDB = require('./DB/Connection');

connectDB();

app.use(express.json());

const profileRoutes = require('./routes/profile');
const Profile = require('./DB/Profile');
app.use('/profile', profileRoutes);


const port = 4000;
app.listen(port, () => {
  console.log(`Server started on ${port}`);
})

const test = async () => {
  let userProfile1 = new Profile({name: "User1", level: 0, xp: 0, questionsAnswered: 0, degree: "Bachelor of IT", avatarURL: 'man.png'});
  let userProfile2 = new Profile({name: "User2", level: 1, xp: 200, questionsAnswered: 0, degree: "Bachelor of IT", avatarURL: 'man.png'});
  let userProfile3 = new Profile({name: "User3", level: 1, xp: 100, questionsAnswered: 0, degree: "Bachelor of IT", avatarURL: 'man.png'});
  let userProfile4 = new Profile({name: "User4", level: 2, xp: 0, questionsAnswered: 0, degree: "Bachelor of IT", avatarURL: 'man.png'});
  await userProfile1.save();
  await userProfile2.save();
  await userProfile3.save();
  await userProfile4.save();
}

// test();
