require('dotenv').config();
const bodyParser = require('body-parser')
    ,express = require('express')
    ,cors = require('cors')
    ,massive = require('massive')
    ,controller = require('../src/controller')
    ,stripe = require('stripe')(process.env.SECRET_KEY)


const app = express();
app.use(bodyParser.json());
app.use( cors() );



// ------------------calandar---------------------

app.get('/api/avalable', controller.getAvalable);

app.get('/api/avalable/test', function(req,res,next) {
  var time = req.query.date
  console.log(time)
  const db = req.app.get('db');
  db.test([time]).then(events => {
    res.status(200).send(events)
})
})







// ------------------stripe--------------------
app.post('/api/payment', function(req, res, next){
    //convert amount to pennies
    const amountArray = req.body.amount.toString().split('');
    const pennies = [];
    for (var i = 0; i < amountArray.length; i++) {
      if(amountArray[i] === ".") {
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
  }, function(err, charge) {
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