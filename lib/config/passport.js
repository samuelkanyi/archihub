const LocalStrategy = require('passport-local')
const {
    UserModel
} = require('../models')

module.exports = passport => {
    passport.use(new LocalStrategy((username, password, done) => {
        UserModel.findOne({
            username: username
        }, (err, user) => {
            if (err) {
                return done(err)
            }
            if (!user) {
                return done(null, false, {
                    message: "incorrect username"
                })
            }
            return done(null, user)
        })
    }))
}