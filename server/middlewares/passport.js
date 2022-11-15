/*const LocalStrategy = require("passport-local").Strategy
const bcrypt = require("bcrypt")


async function initialize(passport, getUserByEmail, getUserById){
    // Function to authenticate users
    const authenticateUsers = async (email, password, done) => {
        // Get users by email
        const user = await getUserByEmail(email)
        console.log(user);
        if (user == null){
            console.log(user);
            return done(null, false, {message: "Inavlid email or password"})
        }
        try {
            if(await bcrypt.compare(password, user.password)){
                console.log(user);
                return done(null, user)
            } else{
                console.log(user);
                return done (null, false, {message: "Inavlid email or password"})
            }
        } catch (e) {
            console.log(e);
            return done(e)
        }
    }

    passport.use(new LocalStrategy(authenticateUsers))
    /*passport.serializeUser((user, done) => done(null, user.id))
    passport.deserializeUser((id, done) => {
        return done(null, getUserById(id))
    })

    passport.serializeUser(function(user, cb) {
        process.nextTick(function() {
          cb(null, { id: user._id, email: user.email, name: user.name });
        });
    });
    passport.deserializeUser(function(user, cb) {
        process.nextTick(function() {
          return cb(null, user);
        });
    });
}

module.exports = initialize*/

const passport = require("passport");
const passportJwt = require("passport-jwt");
const ExtractJwt = passportJwt.ExtractJwt;
const StrategyJwt = passportJwt.Strategy;
const Company = require("../models/company");

passport.use(
  new StrategyJwt(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    },
    async function (jwtPayload, done) {
      try {
        const user = await Company.findOne({ where: { id: jwtPayload.id } });
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

//module.exports = passport;