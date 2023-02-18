const express = require('express');
const router = express.Router();

//get the breeds from the dog api
async function fetchBreedsJSON() {
    const response = await fetch('https://dog.ceo/api/breeds/list/all');
    const breeds = await response.json();
    return breeds.message;
}
 

  fetchBreedsJSON().then(breeds => {
    breeds; // fetched breeds
    //console.log(breeds);
    dog_json = breeds;
    breed_list = Object.keys(dog_json);
    router.get('/', function(req, res, next) {
        //Calculate directly in this server
        res.render('breeds', {
            breed: breed_list
        });
    });
  });






module.exports = router;