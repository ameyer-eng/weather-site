 async function fetchMoviesJSON() {
    const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current_weather=true&hourly=temperature_2m,relativehumidity_2m,windspeed_10m');
    const movies = await response.json();
    return movies;
  }
 
  //let dog_json;
  fetchMoviesJSON().then(movies => {
   movies; // fetched movies
     console.log(movies);
     //dog_json = movies;
     //onsole.log(Object.keys(dog_json));
   });
