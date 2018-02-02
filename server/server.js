require('dotenv').config();
const bodyParser = require('body-parser')
  , express = require('express')
  , cors = require('cors')
  , massive = require('massive')
  , controller = require('../src/controller')
  , stripe = require('stripe')(process.env.SECRET_KEY)
  , passport = require('passport')
  , session = require('express-session')
  , Auth0Strategy = require('passport-auth0')
  , path = require('path')


const app = express();
app.use(express.static(__dirname + '/../build'));
app.use(bodyParser.json());
app.use(cors());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());


// -------------------AUTH0----------------------
passport.use(new Auth0Strategy({
  domain: process.env.AUTH_DOMAIN,
  clientID: process.env.AUTH_CLIENT_ID,
  clientSecret: process.env.AUTH_CLIENT_SECRET,
  callbackURL: process.env.AUTH_CALLBACK_URL,
  scope: 'openid profile'
}, function (accessToken, refresjToken, extraParams, profile, done) {
  let { _json } = profile;

  let { displayName, user_id, picture } = profile;
  const db = app.get('db')

  db.find_user(user_id).then(function (user) {
    // console.log(user)
    if (!user[0]) {
      db.create_user([
        displayName,
        'test@email.com',
        picture,
        user_id
      ]).then(user => {
        return done(null, user[0].id)
      }).catch(console.Error)
    } else {
      return done(null, user[0].id)
    }
  }).catch(console.Error)

}))

passport.serializeUser((id, done) => {
  done(null, id);
})
passport.deserializeUser((id, done) => {
  app.get('db').find_session_user(id).then(function (user) {
    return done(null, user[0])
  }).catch(console.Error)
})

// ----------------auth0 end points--------
app.get('/auth', passport.authenticate('auth0'));
app.get('/auth/callback', passport.authenticate('auth0', {
  successRedirect: '/#/private',
  failureRedirect: '/#/calandar'
}));
app.get('/auth/me', (req, res) => {
  if (!req.user) {
    res.status(404).send(false);
  } else {
    res.status(200).send(req.user);
  }
})

app.get('/auth/logout', function (req, res) {
  req.logOut();
  res.redirect('/')
})

app.get('/auth/authorized', (req, res) => {
  if (!req.user) {
    return res.status(403).send(false)
  } else {
    return res.status(200).send(req.user);
  }
})





// ------------------calandar---------------------

app.get('/api/avalable', controller.getAvalable);

app.get('/api/avalable/test', function (req, res, next) {
  var time = req.query.date
  console.log(time)
  const db = req.app.get('db');
  db.test([time]).then(events => {
    res.status(200).send(events)
  })
})

app.delete('/api/delete', controller.delete);

app.get('/api/avalable/addTime', controller.addTime);

app.get('/api/avalable/addOffice', controller.addOffice);






// ------------------stripe--------------------
app.post('/api/payment', function (req, res, next) {
  //convert amount to pennies
  const amountArray = req.body.amount.toString().split('');
  const pennies = [];
  for (var i = 0; i < amountArray.length; i++) {
    if (amountArray[i] === ".") {
      if (typeof amountArray[i + 1] === "string") {
        pennies.push(amountArray[i + 1]);
      } else {
        pennies.push("0");
      }
      if (typeof amountArray[i + 2] === "string") {
        pennies.push(amountArray[i + 2]);
      } else {
        pennies.push("0");
      }
      break;
    } else {
      pennies.push(amountArray[i])
    }
  }
  const convertedAmt = parseInt(pennies.join(''));

  const charge = stripe.charges.create({
    amount: convertedAmt, // amount in cents, again
    currency: 'usd',
    source: req.body.token.id,
    description: 'Test charge from react app'
  }, function (err, charge) {
    if (err) return res.sendStatus(500)
    return res.sendStatus(200);
    // if (err && err.type === 'StripeCardError') {
    //   // The card has been declined
    // }
  });
});















const port = process.env.SERVER_PORT
massive(process.env.CONNECTION_STRING).then(db => {
  app.set('db', db)
  app.listen(port, console.log(`this server is running on port ${port}.`))
})
