import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcrypt';
import AccountModel from '../models/account';

export default async () => {
  passport.use(new LocalStrategy({ 
    usernameField: 'username', 
    passwordField: 'password', 
    session: true 
  }, async (username, password, done) => {
    try {
      const user = await AccountModel.findOne({ username });
      if(!user) {
        done(null, false);
      }
      const compared = await bcrypt.compare(password, user.password);
      if(!compared) {
        done(null, false);
      }
      done(null, user);
    } catch(error) {
      done(error);
    }
  }));

  passport.serializeUser((user, done) => {
    done(null, user.username);
  });
  passport.deserializeUser(async (username, done) => {
    try {
      const user = await AccountModel.findOne({ username });  
      done(null, user);
    } catch(error) {
      done(error);
    }
  });
}