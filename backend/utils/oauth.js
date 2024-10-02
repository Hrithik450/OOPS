const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const AppleStrategy = require("passport-apple").Strategy;
const oauth = require("../models/oauth");
require("dotenv").config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL:
        process.env.GOOGLE_CALLBACK_URL ||
        `http://localhost:7000/auth/google/callback`,
    },
    async (accessToken, refreshToken, profile, done) => {
      const { id, displayName, emails } = profile;
      const email = emails[0].value;

      try {
        let User = await oauth.findOne({ googleId: id });

        if (!User) {
          User = await oauth.create({
            googleId: id,
            username: displayName,
            email: email,
          });

          await User.save();
        }

        done(null, User);
      } catch (err) {
        done(err);
        console.error(err);
      }
    }
  )
);

// passport.use(
//   new AppleStrategy(
//     {
//       clientID: process.env.APPLE_CLIENT_ID,
//       teamID: process.env.APPLE_TEAM_ID,
//       keyID: process.env.APPLE_KEY_ID,
//       privateKeyString: process.env.APPLE_PRIVATE_KEY,
//       callbackURL:
//         process.env.APPLE_CALLBACK_URL ||
//         "http://localhost:7000/auth/apple/callback",
//     },
//     async (res, accessToken, refreshToken, idToken, profile, done) => {
//       const { id, email } = profile;

//       try {
//       let User = await oauth.findOne({ appleId: id });
//         if (!User) {
//           User = await oauth.create({
//             appleId: id,
//             username: email.split("@")[0],
//             email: email,
//           });

//           await User.save();
//         } else {
//           return res.status(400).json({ msg: "User already exists" });
//         }

//         done(null, User);
//       } catch (error) {
//         done(error);
//         console.error(error);
//       }
//     }
//   )
// );

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const User = await oauth.findById(id);
    done(null, User);
  } catch (error) {
    done(error);
    console.error(error);
  }
});
