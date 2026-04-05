const passport = require('passport');
const User = require('../models/User');

var GoogleStrategy = require('passport-google-oauth20').Strategy;

const logiWithGoogle = () => {
    passport.use(new GoogleStrategy({
    clientID: process.env.IDGOOGLE,
    clientSecret: process.env.SECRETGOOGLE,
    callbackURL: "http://localhost:4000/auth/google/redirect"
  },
  function(accessToken, refreshToken, profile, cb) {
    console.log(profile)
    const userData = {
      googleId: profile._json.sub,
      firstName: profile._json.givenName,
      lastName: profile._json.familyName,
      picture: profile._json.picture,
      email: profile._json.email
    };
    User.findOne({ email: userData.email })
      .then((existingUser) => {
        if (existingUser) {
          if (!existingUser.googleId) {
            existingUser.googleId = userData.googleId;
            return existingUser.save();
          }
          return existingUser;
        } else {
          return User.create({
            googleId: userData.googleId,
            email: userData.email,
          });
        }
      })
      .then((user) => {
        return cb(null, user);
      })
      .catch((err) => {
        console.error("Auth Error:", err);
        return cb(err, null);
      });
  }
));

}

module.exports = {logiWithGoogle}