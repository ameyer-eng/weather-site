const express = require('express');
const router = express.Router();

//get the images from the dog api
async function fetchimagesJSON(url_2_fetch) {
    const response = await fetch(url_2_fetch);
    const images = await response.json();
    return images.message;
}
 
router.get('/', function(req, res, next) {
    if(req.query.breed){
        fetch_url_str = `https://dog.ceo/api/breed/${req.query.breed}/images`;
        fetchimagesJSON(fetch_url_str).then(images => {
            images; // fetched images
            //console.log(images)
            dog_json = images;
            image_list = dog_json.slice(1, 20);
            console.log(image_list);
            res.render('images', {
                title: req.query.breed,
                images: image_list
            });
        });
    }else{
        res.render('images', {title: 'NO IMAGES FOUND!'})
    }

  });




module.exports = router;