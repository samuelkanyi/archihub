const LocalStrategy = require('passport-local')
const {
    UserModel
} = require('../models')
const bcrypt = require('bcryptjs')

module.exports = passport => {
    passport.use(new LocalStrategy((username, password, done) => {
        UserModel.findOne({username: username}, (err, user) => {
            if (err) {
                console.log(err);
                
                return done(err)}
            if (!user) {
                return done(null, false, {message: "incorrect username"})
            }
            bcrypt.compare(password, user.password, (err, success)=>{
                if(err) { 
                    console.log(err);
                    return done(err) }
            })
            
            console.log(user);
            
            return done(null, user)
        })
    }))
}