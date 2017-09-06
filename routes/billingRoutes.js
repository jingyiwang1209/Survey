const keys = require('../config/key');
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require('../middlewares/requireLogin');

module.exports = app => {
    app.post("/api/stripe",requireLogin, async (req, res) => {
        const charge = await stripe.charges.create({
            amount: 500,
            currency: "usd",
            source: req.body.id, // obtained with Stripe.js
            description: "$5 for 5 credits"
        });
        // here is the user model we added using passport and cookie-session when user is logged in!
        req.user.credits += 5;
        // we always want to use the latest user which is from user model!
        const user = await req.user.save();
        res.send(user);
    });
};