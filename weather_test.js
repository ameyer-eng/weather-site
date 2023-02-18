const weather = require('./weather_api.js');



weather.fetchweatherJSON().then(data => {
     let blah =  format_weather_data(data); 
    console.log(blah);
    });

