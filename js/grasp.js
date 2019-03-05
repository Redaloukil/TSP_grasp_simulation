const numberOfCities = 10;
const alpha = 0.4;

var cities = [];

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
    return Math.floor(Math.random()*rcl.length);
}

//construct the solution phase 
function constructionPhase(cities){
    var solutionPath = [];
    var initialCity = cities[0];
    solutionPath.push({x:cities[0].x , y:cities[0].y , z :cities[0].z});
    

    //delete the starting city
    cities.shift();
    var rcl = [];
    var counter = cities.length -1;
    while(counter > 0){
        
        //calculate min and max     
        const min = calculateMin(initialCity , cities);
        const max = calculateMax(initialCity , cities);    
        
        //calculate alpha cost 
        const alphaCost = min + alpha*(max - min);
        rcl = [];
        
        //restricted candidate list 
        for(var i = 0; i<cities.length ;i++){

            const cost = calculateCost(initialCity , cities[i]);
            
            if(cost < alphaCost){
                rcl.push({city:{x:cities[i].x , y:cities[i].y , z:cities[i].z} , index:i });
            }
        
        }
        
        console.log("restricted candidate list" , rcl);
        
        var randomIndex = randomSelection(rcl);
        
        console.log("selected random index from rcl " , randomIndex);
        solutionPath.push({x:rcl[randomIndex].city.x , y:rcl[randomIndex].city.y , z:rcl[randomIndex].city.z});

        console.log("selected city : ",{x:rcl[randomIndex].city.x , y:rcl[randomIndex].city.y , z:rcl[randomIndex].city.z});  

        cities.splice(rcl[randomIndex].index , 1);
        console.log("path list" , solutionPath);
        
        rcl = [];
        
        counter--;
    }
    
    return solutionPath;
    
}

function setup(){
    createCanvas(600 , 600)
   
    for (var i = 0; i<numberOfCities; i++){
        v = createVector(random(height) , random(width));
        cities[i] = v;
    }
    
    cities = constructionPhase(cities);
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
        vertex(cities[i].x , cities[i].y);
    }   
    
    
    endShape();

    cities = constructionPhase(cities)

}






