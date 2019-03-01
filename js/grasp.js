const numberOfCities = 8;
const alpha = 0.4;

const cities = [];

var bestPath = 0;



function calculateDistance(cities){
    var distance = 0;
    
    for (var i = 0 ;i < cities.length -1; i++){
        distance = distance + dist(cities[i].x , cities[i].y , cities[i+1].x , cities[i+1].y ) 
    } 
    
    return distance
}

function calculateCost(initialCity , city){
    const distance = dist(initialCity.x , initialCity.y , city.x , city.y)
    return distance;
}

function calculateMin(initialCity , cities){
    
    var min = calculateCost(initialCity, cities[0]);
    for(var i = 1 ; i < cities.length ; i++){
        const cost = calculateCost(initialCity , cities[i]);
        if (cost < min){
            min = cost;
        }
    }
    return min;

}

function calculateMax(initialCity , cities){
    
    var max = calculateCost(initialCity , cities[0]);
    for(var i = 1 ; i < cities.length ; i++){
        const cost = calculateCost(initialCity , cities[i]);
        if (cost > max){
            max = cost;
        }
    }
    return max;

}

//select randomly from the rcl
function randomSelection(rcl){
    const item = rcl[Math.floor(Math.random()*rcl.length)];
    return item;
}

//construct the solution phase 
function constructionPhase(cities){
    const solutionPath = []
    
    solutionPath.push(cities[0]);
    //delete the starting city
    cities.shift();
    
    while(cities.length !=0){
        //calculate min and max 
        const min = calculateMin(initialCity , cities);
        const max = calculateMax(initialCity , cities);    
        //calculate alpha cost 
        const alphaCost = min + alpha*(max - min);
        var rcl = [];
        //restricted candidate list 
        for(var i = 0;i<cities.length;i++){
            const cost = calculateCost(initialCity , cities[i]);
            console.log("calculated cost ",cost)
            if(cost < alphaCost){
                rcl.push(cities[i]);
                console.log("selected cost ",cost)
            }
            
        }
        console.log(rcl);
        
        solutionPath.push(randomSelection(rcl));
    }
    return solutionPath;
}

function setup(){
    createCanvas(600 , 600)
   
    for (var i = 0; i<numberOfCities; i++){
        v = createVector(random(height) , random(width));
        cities[i] = v;
    }
    
    constructionPhase(cities);
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
    
    
    
    endShape();

}






