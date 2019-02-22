const numberOfCities = 8;

const cities = [];

var bestPath = 0;

var city = {
        lar  :0,
        long :0,
}


function chooseToStart(){
    
}

function grasp(){

}

function swap(a , i , j){
        var temp = a[i];
        a[i] = a[j];
        a[j] = temp;
}

//ELECTION OF RESTRICTED CANDIDATES LIST
function bestPathFinder(bPath , path){
    if (path < bPath){
        return path;
    }
    return bPath
}

function calculateDistance(cities){
        var distance = 0;
        for (var i = 0 ;i < cities.length -1; i++){
            distance = distance + dist(cities[i].x , cities[i].y , cities[i+1].x , cities[i+1].y ) 
        } 
        return distance
}


function setup(){
    createCanvas(600 , 600)
    for (var i = 0; i<numberOfCities; i++){
        v = createVector(random(height) , random(width));
        cities[i] = v;
    }
}

function draw(){
    
    frameRate(2)
    background(0);
    fill(255);
    
    for (var i=0; i<cities.length; i++){
        ellipse(cities[i].x , cities[i].y , 6 , 6);
    }

    stroke(255);
    strokeWeight(2);
    
    beginShape();
    noFill();
    
    for (var i=0; i<cities.length; i++){
        vertex(cities[i].x , cities[i].y );
    }
    
    endShape();
    
    bestPath = bestPathFinder(bestPath , calculateDistance(cities));
    console.log(bestPath);
    var i = floor(random(cities.length));
    var j = floor(random(cities.length));

    swap(cities , i , j)
}






