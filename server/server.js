const bodyParser = require('body-parser')
    ,express = require('express')
    ,cors = require('cors')
    ,massive = require('massive');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use( cors() );




const port = process.env.PORT
massive(process.env.CONNECTION_STRING).then(db => {
    app.set('db', db)
app.listen(port, console.log(`this server is running on port ${port}.`))
})