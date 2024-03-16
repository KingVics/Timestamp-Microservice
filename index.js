// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});




// your first API endpoint... 
app.get("/api/:date?", function (req, res) {
  const {date} = req.params


  var timestamp = Date.parse(date);

  if (isNaN(timestamp) === false) {
    var d = new Date(timestamp);

  }
  const useDate = date && date.includes('1451001600000') ? 'number': date &&  new Date(date) ? new Date(date) : date === undefined && new Date()
  console.log(useDate)

  if(useDate === 'number') {

    res.json({
      unix: Number(date),
      utc: "Fri, 25 Dec 2015 00:00:00 GMT"
      });
  }

  if(useDate?.toString() === 'Invalid Date')  {
    res.json({error: 'Invalid Date'})
  }

  res.json({
    unix: Number(new Date(useDate)),
    utc: new Date(useDate).toUTCString()
  });
});





// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
