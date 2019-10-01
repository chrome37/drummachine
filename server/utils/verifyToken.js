const passport = require('passport');
const JwtStrategy = require('passport-jwt');
const ExtractJwt = JwtStrategy.ExtractJwt;
const config = require('config');


const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.secret,
    session: false
}

passport.use(new JwtStrategy(options, (jwtPayload, done) => {
    if (jwtPayload === undefined || jwtPayload.sub === undefined || jwtPayload.email === undefined) {
        return done('Invalid JWT Payload', false);
    } else {
        return done(null, true);
    }
}));

module.exports = passport