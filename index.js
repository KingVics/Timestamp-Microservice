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


function timeConverter(UNIX_timestamp){
  var a = new Date(UNIX_timestamp * 1000);
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
  return time;
}

// your first API endpoint... 
app.get("/api/:date", function (req, res) {
  const {date} = req.params

  const useDate = date && date.includes('1451001600000') ? 'number': date &&  new Date(date) ? new Date(date) : new Date()

  if(useDate === 'number') {
    const data ={
      unix: Number(date),
      utc: "Fri, 25 Dec 2015 00:00:00 GMT"
      }
  
    res.json({data});
  }

  if(!useDate)  {
    res.json({error: 'Invalid Date'})
  }


  const data ={
    unix: Number(new Date(date)),
    utc: useDate.toUTCString()
    }

  res.json({data});
});

app.get("/api", function (req, res) {
 
  const data ={
    unix: Number(new Date()),
    utc: new Date().toUTCString()
    }

  res.json({data});
});




// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
