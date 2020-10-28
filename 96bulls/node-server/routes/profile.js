const e = require('express');
const express = require('express');
const mongoose = require('mongoose');
const Profile = require('../DB/Profile');
const Achievement = require('../DB/Achievement')
const router = express.Router();


/**
 * Gets all of the users in the database, in order of their score
 * This is for the leaderboard route
 */
router.get('/all', async (req, res) => {

  const profiles = await Profile.find().sort({ level: "desc", xp: "desc" });

  //Get achievements for each profile
  let adjustedProfiles = [];
  for (let i = 0; i < profiles.length; i++) {
    const trophyList = await Achievement.find({level: { $lte: profiles[i].level }, questions: { $lte: profiles[i].questionsAnswered }});
    adjustedProfiles.push({
      name: profiles[i].name,
      level: profiles[i].level,
      xp: profiles[i].xp,
      questionsAnswered: profiles[i].questionsAnswered,
      degree: profiles[i].degree,
      avatarURL: profiles[i].avatarURL,
      trophyList
    });
  }

  res.json(adjustedProfiles);

})

/**
 * Gets the achievements for the profile, atm just returns them all
 */
router.get('/achievements/:name', async (req, res) => {

  //first need to get users name
  const { name } = req.params;
  const user = await Profile.findOne({name});
  const achievements = await Achievement.find({level: { $lte: user.level }, questions: { $lte: user.questionsAnswered }});
  res.json(achievements);

})

/**
  Gets a user's profile information
  Will be requested on the user profile page
 */
router.get('/:name', async (req, res) => {

  const { name } = req.params;

  const userProfile = await Profile.findOne({ name });
  res.json(userProfile)

})

router.post('/updateimg', async (req, res) => {

  const { imgURL } = req.body;

  let userProfile = await Profile.findOne({ name: "User2" });
  userProfile = await userProfile.update({ avatarURL: imgURL });

  res.sendStatus(200);

})

router.post('/get-achievements', async (req, res) => {
  const {levelUp, newLevel, oldQuestions, newQuestions} = req.body;
  console.log(levelUp, newLevel, oldQuestions, newQuestions);
  let achievements = [];
  if (levelUp) {
    const newAchievement = await Achievement.findOne({level: newLevel});
    if (newAchievement != null) achievements.push(newAchievement);
  }
  const newAchievement = await Achievement.findOne({questions: { $gte: oldQuestions, $lte: newQuestions }})
  if (newAchievement != null) achievements.push(newAchievement);
  console.log(achievements);
  res.json(achievements);
})

/**
 * Updates the xp of a user after completing a quiz, checks if 
 * they have leveled up or if they have earnt any achievements
 */
router.post('/xp', async (req, res) => {
  console.log(req.body);
  let { username, xpGained, questionsAnswered } = req.body;
  xpGained = parseInt(xpGained);

  const userProfile = await Profile.findOne({ name: username });
  //Add the xp and check for level up
  let newXP = userProfile.xp + xpGained;

  if (newXP > 1000) {
    newXP -= 1000;
    const newProfile = await Profile.updateOne( {name: username}, {
      xp: newXP,
      level: userProfile.level + 1,
      questionsAnswered: userProfile.questionsAnswered + questionsAnswered + 1
    });
    res.json({ newProfile, levelUp: true });
    return;
  } else {
    const newProfile = await Profile.updateOne( {name: username}, {
      xp: newXP,
      questionsAnswered: userProfile.questionsAnswered + questionsAnswered + 1
    });
    res.json({ newProfile, levelUp: false });
    return;
  }

})



module.exports = router;
