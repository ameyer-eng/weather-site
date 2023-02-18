fetchweatherJSON = async function fetchweatherJSON() {
    const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=36.1006&longitude=95.9251&current_weather=true&hourly=temperature_2m,relativehumidity_2m,windspeed_10m');
    const weather = await response.json();
    return weather;
  }

format_weather_data =  function format_weather_data(weather_json){
    let times = weather_json.hourly.time;
    let winds = weather_json.hourly.windspeed_10m;
    let humiditys = weather_json.hourly.relativehumidity_2m;
    let temps = weather_json.hourly.temperature_2m;
    console.log(weather_json.hourly_units);


    let day_indexs = index_by_day(times);
    let days_w_temp = hi_low_avg(day_indexs, temps);
    let days_w_wind = average_windspeed(days_w_temp, winds);
    let days_w_humidity = average_humidity(days_w_wind, humiditys);
    return days_w_humidity;
  }

  
  
  module.exports = {fetchweatherJSON, format_weather_data};
 

   //this function should return an array of objects {'date': XXXXXXX, index_array[]}
   // This will be used to group the API returned data by day
   // So that a page can just show a day at a time
   
   //a large function to call the other functions. I plan to do SYNC as the results may depend on each other
   //function format_API_data(){}
   
   
   function index_by_day(times){
    
      let last_day = null; //for starting
      let  day_index_arr = [];
      let  index_arr = [];
      

      for(let i =0; i<times.length; i++){
          //extract the day from the current item
          let current_day = times[i].substring(8,10);
          //if the day is different start a new array and push the old array onto the return arrays/object...
          if(last_day===null){
                //to deal with the start of the loop            
               last_day = current_day;
          }else if (current_day != last_day){
              //push the last object into the array
              //convert into a javascript object
              let  day_index_obj = {'day': last_day,  'indexs': index_arr};
              day_index_arr.push(day_index_obj);
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
  function hi_low_avg(day_obj_arr, temperatures){

      for(day of day_obj_arr){
        let day_high, day_low, day_avg = null;
        let day_temp_list = [];

        for(index of day.indexs){
            day_temp_list.push(temperatures[index]);
        }

        day_high = c_to_f(Math.max.apply(Math, day_temp_list)).toFixed(0);
        day_low  = c_to_f(Math.min.apply(Math, day_temp_list)).toFixed(0);
        day_avg  = c_to_f(average(day_temp_list)).toFixed(0);

        //add to the object
        day['t-high'] = day_high;
        day['t-low']  = day_low;
        day['t-avg']  = day_avg;
      }
      return day_obj_arr;
  }

    //appends the json data with   {'date' xxxxxx, index_array[], t-hi: [XX, time],  t-low: [XX, time], t-avg:
     //                                                             w-hi: [XX, time],  w-low: [XX, time], w-avg:                                              }
    function average_windspeed(day_obj_arr, winds){
      for(day of day_obj_arr){
        let day_high, day_low, day_avg = null;
        let day_wind_list = [];

        for(index of day.indexs){
            day_wind_list.push(winds[index]);
        }

        day_high = (Math.max.apply(Math, day_wind_list)/1.609).toFixed(0);
        day_low  = (Math.min.apply(Math, day_wind_list)/1.609).toFixed(0);
        day_avg  = (average(day_wind_list)/1.609).toFixed(0);
       // console.log(temperatures);
        //console.log(`high: ${day_high}, low: ${day_low}, avg: ${day_avg}`);
        //add to the object
        day['w-high'] = day_high;
        day['w-low']  = day_low;
        day['w-avg']  = day_avg;
        //console.log(day);
      }
      return day_obj_arr;
    } 

    //appends the average humidity to the JSON objects in the array
    function average_humidity(day_obj_arr, humiditys){
      for(day of day_obj_arr){
        let day_avg = null;
        let day_humidity_list = [];

        for(index of day.indexs){
            day_humidity_list.push(humiditys[index]);
        }


        day_avg  = average(day_humidity_list);
        //add to the object
        day['humidity-avg']  = day_avg;
        //console.log(day);
      }
      return day_obj_arr;
    } 
    


   function average(arr){
      var total = 0;
      for(var i = 0; i < arr.length; i++) {
          total += arr[i];
      }
      var avg = total / arr.length;

      return avg;
   }

   function c_to_f(temp){
    return (9/5)*temp + 32;
   }