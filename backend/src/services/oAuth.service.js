const passport = require('passport');
const { Strategy: GoogleStrategy } = require('passport-google-oauth20');
const User = require("../models/user.model");

const setupGoogleAuth = () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: 'https://scamshield-8x1s.onrender.com/api/auth/google/callback', // Ensure this matches your route
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const email = profile.emails[0].value;
          const googleId = profile.id;

          // 1. Pehle check karo kya is Google ID se koi user hai?
          let user = await User.findOne({ googleId });

          if (!user) {
            // 2. Agar Google ID nahi hai, toh check karo kya is EMAIL se koi manual user hai?
            user = await User.findOne({ email });

            if (user) {
              // 3. Agar same email wala user mil gaya, toh usme Google ID link kar do (Merge)
              user.googleId = googleId;
              // Agar avatar ya username update karna chahte ho toh yahan kar sakte ho
              if (!user.avatar) user.avatar = profile.photos[0].value;
              await user.save();
            } else {
              // 4. Agar na Google ID mili na Email, tab naya user banao
              user = await User.create({
                googleId: googleId,
                username: profile.displayName,
                email: email,
                avatar: profile.photos[0].value,
                // OAuth users ke liye password set karne ki zaroorat nahi hoti
              });
            }
          }

          return done(null, user);
        } catch (err) {
          return done(err, null);
        }
      }
    )
  );
};

module.exports = { setupGoogleAuth };