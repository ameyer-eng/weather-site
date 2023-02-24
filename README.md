# weather-site

This is a basic weather website that uses a weather API to display the weather to the user. 

# How does it work?

It uses Node.js and Handlebars view engine and a weater API.   The API works by receiving a LAT and LONG in a fetch request.  It will return the requested information
to Node.  It converts the response into an array of JSON objects, one for each returned day.

The array of JSON objects is given to the view logic.  It generates a small HTML table inside of a <div> for each day. It uses Handlebars to generate the HTML
and to iterate over each day in the day and extract it's value (such as temperature) and it displays that to the user. 

# HTML-canvas background

I wanted to experiment with adding an HTML canvas background with some 'shooting stars.'  I am experimenting with making the HTML canvas work well on mobile devices and 
CSS styling and positioning. 

This is a WIP feature.  I would like to create different animated backgrounds corresponding to the different states of weather.  Depending on the weather code received by the 
api for the day, the weather app will show a background corresponding to the weather conditions. 
