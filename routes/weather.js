const express = require('express');
const router = express.Router();
const weather = require('../weather_api.js');



 

 
    router.get('/', function(req, res, next) {
      
      weather.fetchweatherJSON().then(data => {
        let blah =  format_weather_data(data); 
       console.log(blah);
          res.render('weather', {
            day: blah
            });
       });
    }
  );






module.exports = router;