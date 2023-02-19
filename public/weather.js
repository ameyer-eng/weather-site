//initialization 
let KEEP_RUNNING = false; //don't animate anything yet
let canvas_resize_count = null;
let width_conversion, height_conversion, radial_conversion = null;
let current_view_w = window.innerWidth;
let current_view_h = window.innerHeight;
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

let main_object_list = [];
////////////////////////////////////////////////////////////////////////////

class star_generator{
    constructor(){
        this.star_list = [];
    }

    fill_sky =()=>{
        for(let i=0; i<200; i++){
            var random_x = Math.floor(Math.random()*current_view_w);
            var random_y= Math.floor(Math.random()*current_view_h);
            var random_size = Math.floor(Math.random()*3);
      
            main_object_list.push(new Star(random_x, random_y, random_size))
        }
    }
}

class Star{
    constructor(x_origin, y_origin, initial_size) {
        this.x = x_origin;
        this.y = y_origin;
        this.initial_size = initial_size;
        this.velocity = [-0.25, 0.25];
      }
    
    move =() =>
    {
        //check to see if star if off the screen
        if(this.y < 0){
            this.y = current_view_h;
        }
        if(this.x > current_view_w){
            this.x = 0;
        }

        this.y += this.velocity[0];
        this.x += this.velocity[1]; 
    }
    
    draw =()=>
    {
        ctx.strokeStyle = "white";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(this.x + 0, this.y + 0, this.initial_size, 0, 2 * Math.PI);
        ctx.stroke();
    }
    



}

//add listener for resize
window.addEventListener('resize', resize_canvas, false);

resize_canvas();

let starz = new star_generator();

starz.fill_sky();

setInterval(() => {
    Update();
  }, 80)

// 0) start by ensuring the page has loaded
// if(document.readyState === 'ready' || document.readyState === 'complete') {

//     resizeCanvas();
// } 


// 1) start by ensuring the dimensions of the canvas are set to the window size and Z-index is set properly

function resize_canvas(){
    //check to make sure it's the first time this function has been called
    if(canvas_resize_count===null){
        KEEP_RUNNING = false;
        var current_view_w = window.innerWidth;
        var current_view_h = window.innerHeight;
        let width_conversion = 1;       //initial scale
        let height_conversion = 1;
        let radial_conversion = 1;
        document.getElementById('myCanvas').width = current_view_w;
        document.getElementById('myCanvas').height = current_view_h;
        //add to the count
        canvas_resize_count = 0;
        KEEP_RUNNING = true;
        //re-draw everything
        draw_gradient();

   
    }else{
        //assign the old variables so they can be used to calculate the change
        let old_view_w = current_view_w;
        let old_view_h = current_view_h;
        current_view_w = window.innerWidth;
        current_view_h = window.innerHeight;

        width_conversion = (current_view_w/old_view_w);
        height_conversion = (current_view_h/old_view_h);

        //for radial we need to calculate the old and new radius
        //for scaling radial objects such as bubbles
        old_canvas_radius = Math.sqrt(old_view_w**2 + old_view_h**2);
        current_radius = Math.sqrt(current_view_w**2 + current_view_h**2);
        //assign the new conversion
        radial_conversion = current_radius/old_canvas_radius;
        //change the canvas
        document.getElementById('myCanvas').width = current_view_w;
        document.getElementById('myCanvas').height = current_view_h;
        //add to the count
        canvas_resize_count = 0;
        KEEP_RUNNING = true;
        //re-draw everything
        draw_gradient();
    }

}


function draw_gradient(){
    var my_gradient = ctx.createLinearGradient(0, 0, 0, current_view_h);
    my_gradient.addColorStop(0, 'black');
    my_gradient.addColorStop(0.1,'#0c0a3b');
    my_gradient.addColorStop(0.2,'#200a45');
    my_gradient.addColorStop(0.5,'#270345');
    my_gradient.addColorStop(0.75,'#570350');
    my_gradient.addColorStop(0.9,'#993c02');
    my_gradient.addColorStop(1, "#e88409");
    ctx.fillStyle = my_gradient;
    ctx.fillRect(0, 0, current_view_w, current_view_h);
    console.log('gradient drawn')
}


// // 3) calculate a  'conversion'






// // 4) modify the 'bubble' generator from purple octopus to be a 'star generator'   Stars are just a circular gradient of color






 

// // 6) use a gradient for the background
// // 7) run an update function that runs a draw function
function Update()
{
       //clear the screen for updates
       ctx.fillStyle = "black";
       ctx.fillRect(0, 0, c.width, c.height);


 
     //DRAW BACKGROUND FIRST
     draw_gradient();   
        
    for(const item of main_object_list) {
            item.move();
            item.draw();
    } 
// // 8) make sure the stars get deleted when they are off the screen
//         //remove bubbles that are off the screen
//                 for(var i=0; i<main_object_list.length; i++){
//                     if(main_object_list[i].y < 0 || main_object_list[i].x > 1500||main_object_list[i].x < 0 || main_object_list[i].exists == false){
//                         main_object_list.splice(i,1);
//                     }
//                  } 
}






// //Pause the animation
// KEEP_RUNNING = false;

// //and recalculate the variables.

// //modify all velocities by the conversion scaler all the time (time units don't change...only distance ones)


// new_canvas_radius = original_canvas_radius; //just to initialize


// // 10) throw a shooting star in there every once and awhile
// class random_shooting_star{
//     constructor(){}
// }

// class rando_star_GENeRATOR{
//     constructor(){}
// }


// // 11) MAYBE add a function to SLOWLY fade the background colors (in a mood light effect sorta way)

// class gradient{
//     constructor(blah....blahsdalkfjas;lkdfjlaksdjf)
//     {
//         this.color_arr = [];
//     }
//     draw(){

//     }
// }
