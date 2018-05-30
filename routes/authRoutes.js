const passport = require('passport');


module.exports = (app) => {
    //LOGIN WITH GOOGLE PAGE
    app.get('/auth/google', 
      passport.authenticate('google', {
      scope: ['profile', 'email']
      })
    );
    
    //USER CLICKS SIGN IN WITH ACCOUNT AND REDIRECTS TO THIS URL
    app.get('/auth/google/callback', passport.authenticate('google'));

    app.get('/api/current_user', (req,res) => {
        res.send(req.user)
    });

    app.get('/api/logout', (req,res) => {
        req.logout();
        res.send(req.user);
    });
}
