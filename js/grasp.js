const numberOfCities = 20;
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
    return Math.floor(Math.random()*rcl.length);
}

//construct the solution phase 
function constructionPhase(cities){
    const solutionPath = [];
    var initialCity = cities[0];
    solutionPath.push(cities[0]);

    //delete the starting city
    cities.shift();
    var rcl = [];

    while(initialCity != null){
        //calculate min and max 
        const min = calculateMin(initialCity , cities);
        const max = calculateMax(initialCity , cities);    
        
        //calculate alpha cost 
        const alphaCost = min + alpha*(max - min);
        rcl = [];
        
        //restricted candidate list 
        for(var i = 0;i<cities.length;i++){
            const cost = calculateCost(initialCity , cities[i]);
            console.log("calculated cost ",cost);
            if(cost < alphaCost){
                rcl.push({city:cities[i], index:i });
                console.log("selected cost ",cost);
            }
        }
        
        console.log("restricted candidate list" , rcl);
        var randomIndex = randomSelection(rcl);
        console.log("selected random index from rcl " , randomIndex);
        solutionPath.push(rcl[randomIndex].city);
        console.log("selected city : ",rcl[randomIndex].city);  
        cities.splice(rcl[randomIndex].index - 1 , 1);
        console.log("les cités restante : " , cities);
        console.log("path list" , solutionPath);
        
        rcl = [];
        
        //get the index of the city removed from the city list
        if(cities.length == 0){
            initialCity = null;
        }else {
            initialCity = solutionPath[solutionPath.length-1];
        }
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
        vertex(cities[0].x , cities[0].y);
        vertex(cities[1].x , cities[1].y);
    
    
    endShape();

}






