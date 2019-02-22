var numberOfCities = 9;
var cities = [];

function hello(){

}

function setup(){
    createCanvas(600 , 600)
    for (var i = 0; i<numberOfCities; i++){
        v = createVector(random(height) , random(width));
        cities[i] = v;
    }
}


function draw(){
    
    background(0);
    
    fill(255);
    
    for (var i=0; i<cities.length; i++){
        ellipse(cities[i].x , cities[i].y , 12 , 12);
    }
}