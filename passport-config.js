/* const SamlStrategy = require('passport-saml').Strategy;


const samlConfig = {
  {
    path: 'http://localhost:8080/login',
    entryPoint: 'https://ti-intrasso.st.com:9031/idp/SSO.saml2',
    issuer: 'passport-saml',
    cert: fs.readFileSync('C:/cert/187C697A9BB.crt', 'utf-8') ,
    signatureAlgorithm: 'sha256'
  },
  function ini(profile, done) {
    findByEmail(profile.email, profile.ID, function(err, user) {
      if (err) {
        return done(err);
      }
      return done(null, user);
    });
  })
);
*/
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')

function initialize (passport, getUserByEmail, getUserById) {
    const authenticateUser = async (email,password,done) => {
        const user = getUserByEmail(email)
        if (user == null) {
            return done(null, false, {message: 'No user with that email'})
        }

    

    try{
        if(await bcrypt.compare(password,user.password)) {
            return done(null, user) 
        } else {
            return done(null, false, {message: 'Password incorrect'})
        }

    } catch (e){
        return done(e)

    }
}
    passport.use(new LocalStrategy({ usernameField: 'email'} , authenticateUser ))
    passport.serializeUser((user,done) => done(null, user.id))
    passport.deserializeUser((id,done) => {
        return done(null,getUserById(id))
    })

}

module.exports = initialize