 async function fetchweatherJSON() {
    const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current_weather=true&hourly=temperature_2m,relativehumidity_2m,windspeed_10m');
    const weather = await response.json();
    return weather;
  }
 
  //let dog_json;
  fetchweatherJSON().then(weather => {
   weather; // fetched weather
     //console.log(weather);
     
     console.log(Object.keys(weather));
     console.log(weather.hourly.time[0]);
     console.log(weather.hourly.time[66]);

   });

   //this function should return an array of objects {'date': XXXXXXX, index_array[]}
   // This will be used to group the API returned data by day
   // So that a page can just show a day at a time
   
   //a large function to call the other functions. I plan to do SYNC as the results may depend on each other
   function format_API_data(){}
   
   
   function index_by_day(times){
    
    let last_day = null; //for starting
    for(const i =0; i<times.length; i++){
      //extract the day from the current item

      //if the day is different start a new array and push the old array onto the return arrays/object...

      //if the day is the same skip...

      //if error throw a useful message
    }

   }

   //appends the json data with   {'date' xxxxxx, index_array[], t-hi: [XX, time],  t-low: [XX, time], t-avg:}
   function hi_low_avg(day array of objects){}

    //appends the json data with   {'date' xxxxxx, index_array[], t-hi: [XX, time],  t-low: [XX, time], t-avg:
     //                                                             w-hi: [XX, time],  w-low: [XX, time], w-avg:                                              }
    function average_windspeed(day array of objects){} 

    //appends the average humidity to the JSON objects in the array
    function average_humidity(){}


   