 async function fetchweatherJSON() {
    const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current_weather=true&hourly=temperature_2m,relativehumidity_2m,windspeed_10m');
    const weather = await response.json();
    return weather;
  }
 
  //let dog_json;
  fetchweatherJSON().then(weather => {
      weather; // fetched weather
      let times = weather.hourly.time;
      let day_indexs = index_by_day(times);
     
     console.log(Object.keys(weather));
    // console.log(weather.hourly.time[0].substring(8,10));
     //console.log(weather.hourly.time[66]);
     console.log(day_indexs);

   });

   //this function should return an array of objects {'date': XXXXXXX, index_array[]}
   // This will be used to group the API returned data by day
   // So that a page can just show a day at a time
   
   //a large function to call the other functions. I plan to do SYNC as the results may depend on each other
   function format_API_data(){}
   
   
   function index_by_day(times){
    
      let last_day = null; //for starting
      let  day_index_arr = [];
      let  index_arr = [];
      //let  day_index_obj = {'day': null,  'indexs': []};

      for(let i =0; i<times.length; i++){
          //extract the day from the current item
          let current_day = times[i].substring(8,10);
          //if the day is different start a new array and push the old array onto the return arrays/object...
          if(last_day===null){
                //to deal with the start of the loop            
               last_day = current_day;
          }else if (current_day != last_day){
              //push the last object into the array
              day_index_arr.push(index_arr);
              //re-initialize the object for the new day
              index_arr = [];
              last_day = current_day;
          }else if (current_day === last_day){
              //add the index to the day index object
              index_arr.push(i)
          }else{
              //some sort of error occured
              console.log(`Error at day ${current_day} at date-time ${times[i]} at index ${i}.`)
        }

      }//end for
    
    return day_index_arr;

   }// end index_by_day




   //appends the json data with   {'date' xxxxxx, index_array[], t-hi: [XX, time],  t-low: [XX, time], t-avg:}
   //function hi_low_avg(day array of objects){}

    //appends the json data with   {'date' xxxxxx, index_array[], t-hi: [XX, time],  t-low: [XX, time], t-avg:
     //                                                             w-hi: [XX, time],  w-low: [XX, time], w-avg:                                              }
   // function average_windspeed(day array of objects){} 

    //appends the average humidity to the JSON objects in the array
    //function average_humidity(){}


   