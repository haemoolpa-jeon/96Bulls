
const express = require('express');
const app = express();
const connectDB = require('./DB/Connection');

connectDB();

app.use(express.json());

const profileRoutes = require('./routes/profile');
app.use('/profile', profileRoutes);
const quizRoutes = require('./routes/quiz');
app.use('/quiz', quizRoutes);
const Profile = require('./DB/Profile');
const Achievement = require('./DB/Achievement');


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

const fillAchievements = async () => {
  let achievement1 = new Achievement({name: "Quick Quizzer", description: "Answered 10 quiz questions correctly in under 20 seconds", imageURL: "medal.png"});
  let achievement2 = new Achievement({name: "Question Veteran", description: "Congratulations, you have answered 50 questions throughout your time here", imageURL: "gold.png"});
  let achievement3 = new Achievement({name: "Level Up", description: "You've achieved level 2! You're no rookie anymore.", imageURL: "ribbon.png"});
  await achievement1.save();
  await achievement2.save();
  await achievement3.save();
}

// fillAchievements();
// test();


