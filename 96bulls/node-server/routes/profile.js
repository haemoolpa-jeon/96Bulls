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

  const profiles = await Profile.find().sort({ level : "desc", xp : "desc"});
  res.json(profiles);

})

/**
 * Gets the achievements for the profile, atm just returns them all
 */
router.get('/achievements', async (req, res) => {

  const achievements = await Achievement.find();
  res.json(achievements);

})

/**
  Gets a user's profile information
  Will be requested on the user profile page
 */
router.get('/:name', async (req, res) => {

  const { name } = req.params;

  const userProfile = await Profile.findOne({name});
  res.json(userProfile)

})


/**
 * Updates the xp of a user after completing a quiz, checks if 
 * they have leveled up or if they have earnt any achievements
 */
router.post('/',  async (req, res) => {
  const { username, xpGained, questionsAnswered } = req.body;
  
  const userProfile = await Profile.findOne({name: username});
  
  //Add the xp and check for level up
  const newXP = userProfile.xp + xpGained;
  if (newXp > 1000) {
    newXp -= 1000;
    const newProfile = userProfile.update({
      xp: newXp, 
      level: userProfile.level + 1,
      questionsAnswered: userProfile.questionsAnswered + questionsAnswered  
    });
    res.json({newProfile, levelUp: true});
    return;
  } else {
    const newProfile = userProfile.update({
      xp: newXp,
      questionsAnswered: userProfile.questionsAnswered + questionsAnswered 
    });
    res.json({newProfile, levelUp: false});
    return;
  }

})



module.exports = router;