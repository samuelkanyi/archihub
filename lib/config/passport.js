const LocalStrategy = require('passport-local')
const {
    UserModel
} = require('../models')
const bcrypt = require('bcryptjs')

module.exports = passport => {
    passport.use(new LocalStrategy((username, password, done) => {
        UserModel.findOne({
            where:{
                username:username
            }
        }).then(user =>{
            
            if (!user) { return done(null, false); }
            bcrypt.compare(password, user.password, (err, success)=>{
                
                if(err) {return done(err) }
                if(success ==false){return done(null, false)}
            })
            return done(null, user)
        }).catch(err =>done(err))
    }))
}