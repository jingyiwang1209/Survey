const passport = require('passport');
// app server forwarded our client request to:
// https://accounts.google.com/o/oauth2/v2/auth?
// response_type=code&
// redirect_uri=http%3A%2F%2Flocalhost%3A5000%2Fauth%2Fgoogle%2Fcallback&
// scope=profile%20email&
// client_id=7612868381-g38drdnptsp8brmbslec2bs5o94giagu.apps.googleusercontent.com

module.exports = (app) => {
    app.get(
        "/auth/google",
        passport.authenticate("google", {
            scope: ["profile", "email"]
        })
    );

    app.get(
        "/auth/google/callback",
        passport.authenticate("google"),
        (req, res) => {
            res.redirect("/surveys");
        }
    );


// passport is working with Express
    app.get("/api/current_user", (req, res)=> {
        res.send(req.user);
    });
// passport remove the id in the cookie by req.logout()
// so res.send(req.user) return an empty page
    app.get("/api/logout", (req, res)=>{
        req.logout();
        res.redirect("/");
    });
};