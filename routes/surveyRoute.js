const _ = require("lodash");
const Path = require("path-parser");
// integrated module in npm
const { URL } = require("url");

const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const requireCredits = require("../middlewares/requireCredits");
const Mailer = require("../services/Mailer");
const surveyTemplate = require("../services/emailTemplates/surveyTemplate");

const Survey = mongoose.model("surveys");

module.exports = app => {
  app.get("/api/surveys", requireLogin, async (req, res) => {
    const surveys = await Survey.find({ _user: req.user.id }).select({
      recipients: false
    });
    res.send(surveys);
  });

  app.post("/api/surveys/delete/:surveyId", requireLogin, async (req, res) => {
    await Survey.findByIdAndRemove({ _id: req.params.surveyId });
    const surveys = await Survey.find({ _user: req.user.id }).select({
      recipients: false
    });

    res.send(surveys);
  });

  app.get("//api/surveys/:surveyId/:choice", (req, res) => {
    res.send("Thank you very much for your feedback!");
  });

  app.post("/api/surveys/webhooks", (req, res) => {
    const p = new Path("/api/surveys/:surveyId/:choice");

    // refer to chain function in lodash documentation.Each chain automatically passes its value to the next chain!!!
    _.chain(req.body)
      .map(event => {
        const pathname = new URL(event.url).pathname;
        // p.test(pathname):{surveyId:'5748292490002a', choice:'yes'} or null
        const match = p.test(pathname);
        if (match) {
          return {
            email: event.email,
            surveyId: match.surveyId,
            choice: match.choice
          };
        }
      })
      .compact() // remove all undefined events like the one without url(event: bounce instead of click) and the one with different url like localhost:5000
      .uniqBy("email", "surveyId") // remove duplicate event: with duplicate email and surveyId
      .each(event => {
        Survey.updateOne(
          {
            _id: event.surveyId,
            recipients: {
              $elemMatch: { email: event.email, responded: false }
            }
          },
          {
            $set: { "recipients.$.responded": true },
            $inc: { [event.choice]: 1 },
            lastResponded: Date.now()
          }
        ).exec();
      })
      .value();
    // It's better send some back otherwise sendgrid may think it fail sending request to you
    res.send({});
  });

  app.post("/api/surveys", requireLogin, requireCredits, async (req, res) => {
    const { title, subject, body, recipients } = req.body;

    const survey = new Survey({
      title,
      subject,
      body,
      recipients: recipients.split(",").map(email => ({ email: email.trim() })),
      _user: req.user.id,
      dateSent: Date.now(),
    });

    // place to send email using Mailer instance
    const mailer = new Mailer(survey, surveyTemplate(survey));

    try {
      await mailer.send();
      await survey.save();
      req.user.credits -= 1;
      const user = await req.user.save();

      res.send(user);
    } catch (error) {
      res.status(422).send({ error: error });
    }
  });
};