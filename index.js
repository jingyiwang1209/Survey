// so far the nodejs only supports commonjs module
const express = require('express');
const app = express();

app.get('/',(req, res)=>{
    res.send({hi:'there'});
});

// if there is an env variable that has been defined by heroku, go ahead
// and sign that variable to PORT, otherwise by default just use the value of 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT);
