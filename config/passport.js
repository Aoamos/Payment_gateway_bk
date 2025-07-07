const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');
const createWallet = require('../services/walletService')

module.exports = function(passport){
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_ID,
        clientSecret: process.env.GOOGLE_SECRET,
        callbackURL: '/auth/google/callback'
    },
async (accessToken, refreshToken, profile, done) =>{
    try{
        const email = profile.emails && profile.emails.length > 0 ? profile.emails[0].value : null;
        if(!email) {
            return done(new Error('No email found in Google profile'));
        }

        let user = await User.findOne ({ googleId: profile.id });
        if(!user) {
            user = await User.create({
                googleId: profile.id,
                name: profile.displayName,
                email: email,
                accessToken,
                refreshToken
            });
            await createWallet(user._id); // Create wallet for new user
        }else{
            user.accessToken = accessToken;
            user.refreshToken = refreshToken;
            await user.save();
        }

        done(null, user);
    } catch (err){
        done(err, null)
    }
}));

// serialize user to seeion
passport.serializeUser((user, done) =>{
    done(null, user.id);
});

// Deserialize user from session
passport.deserializeUser(async (id, done) => {
    try{
        const user = await user.findById(id);
        done(null, user);
    }catch(err){
        done(err, null)
    }
});
};