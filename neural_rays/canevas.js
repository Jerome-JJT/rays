
var canvas = document.getElementById("canevas");
var c = canvas.getContext('2d');

document.getElementById("canevas").width = 800;
document.getElementById("canevas").height = 800;

/*
var mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
};

var BreakException = {};*/



var terrainObjects;
var objectivesObjects;
var displayObjects;



let stop = 0;
let creditLeft = 1000;

let players;
//let colors = ["red", "orange", "lime", "cyan", "yellow", "slateblue", "magenta", "beige", "maroon", "green"];
//let colors = ["red", "lime", "lime", "lime", "lime", "cyan", "cyan", "cyan", "cyan", "magenta"];

//let nbWinners = 2;
let winners = [];
let champion = null;
let championScore = 0;
let championEntropy = 0;


let startPos = new Point(70, 380);
let startAngle = 0;


let generator;
let iteration = 0;
let counter = 0;
let displayPlayers;

//let seed;

//seed = "bla"+Math.random(0,100000);
//seed = "bla0.5521950982158644"; //Change input
//seed = "bla0.42343403151903425"; //GENIUS

//document.getElementById("displaySeed").value = seed;


function setup()
{
  /*document.getElementById("playersShowcase").innerHTML = "";

  players.forEach((player, num) => {
    document.getElementById("playersShowcase").innerHTML += "<div id='play"+num+"' style='background-color: "+colors[num]+"; height: 40px; width: 100%; border: 3px solid white'></div><br>";
  });*/


  winners = [];
  champion = null;
  document.getElementById("champText").value = "";
  document.getElementById("weightsOutput").value = "";
}


function init() {

  //Load terrain from functions

  //plan = terrain1();
  plan = terrain2();
  terrainObjects = plan.terrain;
  //objectivesObjects = plan.objectives.reverse();
  objectivesObjects = plan.objectives;


  //Set random
  //generator = pseudoRandom(seed);
  //console.log(seed);


  players = [];

  for(let i = 0; i < 100; i++) {
    pl = new Player(startPos.x, startPos.y, startAngle, "white", [...objectivesObjects]);
    pl.negatives = objectivesObjects.slice(-1);

    //If use brain seeds
    if(false)
    {
      pl.brain.weights = brain3()[0];
      pl.brain.biais = brain3()[1];

      players.push(pl);
      break;
    }
    else
    {
      pl.brain.genWeight();
      players.push(pl);
    }
  }


  setup();
}

function replay()
{
  if(champion != null)
  {
    counter = 0;

    iteration+=1;
    document.getElementById("iteration").value = iteration;
    //let champion = Object.assign({}, players[winner]);


    let champWeights = players[champion].brain.weights;
    let champBiais = players[champion].brain.biais;

    //generator = pseudoRandom("bla"+Math.random(0,100000));


    players = [];

    //pc = new Player(startPos.x, startPos.y, startAngle, colors[0], [...objectivesObjects]);
    //pc.brain.setWeight(JSON.parse(championBrain));
    //players.push(pc);
    let entropyRate = Math.floor(championEntropy/4)%50;

    let bigBrain = Math.max(0.1, Math.pow(10, (entropyRate/50)-1.00001));
    let lowBrain = Math.min(0.1, 1/(entropyRate*20));

    for(let i = 0; i < 90; i++) {
      pl = new Player(startPos.x, startPos.y, startAngle, "white", [...objectivesObjects]);
      pl.negatives = objectivesObjects.slice(-1);

      if(i == 0)// 0
      {
        pl.color = "red";
        pl.mission = "origin";
        pl.brain.weights = arrcopy(champWeights);
        pl.brain.biais = arrcopy(champBiais);
      }
      else if(i < 10)
      {
        pl.color = "cyan";
        pl.mission = "random";
        pl.brain.genWeight();
      }
      else if(i < 20)
      {
        pl.color = "lime";
        pl.mission = "low5";
        pl.brain.muteWeight(arrcopy(champWeights), arrcopy(champBiais), lowBrain, 5);
      }
      else if(i < 30)
      {
        pl.color = "lime";
        pl.mission = "low20";
        pl.brain.muteWeight(arrcopy(champWeights), arrcopy(champBiais), lowBrain, 20);
      }
      else if(i < 40)
      {
        pl.color = "lime";
        pl.mission = "low50";
        pl.brain.muteWeight(arrcopy(champWeights), arrcopy(champBiais), lowBrain, 50);
      }
      else if(i < 50)
      {
        pl.color = "lime";
        pl.mission = "low100";
        pl.brain.muteWeight(arrcopy(champWeights), arrcopy(champBiais), lowBrain, 100);
      }
      else if(i < 60)
      {
        pl.color = "magenta";
        pl.mission = "big5";
        pl.brain.muteWeight(arrcopy(champWeights), arrcopy(champBiais), bigBrain, 5);
      }
      else if(i < 70)
      {
        pl.color = "magenta";
        pl.mission = "big20";
        pl.brain.muteWeight(arrcopy(champWeights), arrcopy(champBiais), bigBrain, 20);
      }
      else if(i < 80)
      {
        pl.color = "magenta";
        pl.mission = "big50";
        pl.brain.muteWeight(arrcopy(champWeights), arrcopy(champBiais), bigBrain, 50);
      }
      else if(i < 90)
      {
        pl.color = "magenta";
        pl.mission = "big100";
        pl.brain.muteWeight(arrcopy(champWeights), arrcopy(champBiais), bigBrain, 100);
        //console.log(JSON.stringify(pl.brain.weights));
      }
      else
      {
        pl.brain.genWeight();
      }

      players.push(pl);
    }


    setup();
    stop = 0;
    myanimate();
  }
}






function myanimate() {
  counter+=1;
  document.getElementById("counter").value = counter;
  document.getElementById("time").value = getTime();

  showPlayers = document.getElementById("showPlayers").checked;

  if(showPlayers)
  {
    c.clearRect(0, 0, c.canvas.width, c.canvas.height);
    c.fillStyle = "black";
    c.fillRect(0, 0, canvas.width, canvas.height);
  }


  displayObjects = [];


  objectives.forEach(item => {
    displayObjects.push(item);
  });
  terrainObjects.forEach(item => {
    displayObjects.push(item);
  });



  players.forEach((player, num) => {
    if(player.alive)
    {
      //Create player rays
      result = player.cast(terrainObjects);
      if(result.closest < player.collider)
      {
        player.alive = false;
      }

      if(player.lastObjective != null)
      {
        last = player.cast([player.lastObjective]);
        if(last.closest > player.collider*4)
        {
          player.negatives.push(player.lastObjective);
          player.lastObjective = null;
        }
      }

      if(player.objectives.length > 0)
      {
        check = player.cast([player.objectives[0]]);
        if(check.closest < player.collider)
        {
          player.lastObjective = player.objectives.shift();
          player.survivor+=9800;
        }
      }
      else
      {
        winners.push({score: player.survivor, index: num});

        player.alive = false;
      }

      if(player.negatives.length > 0)
      {
        penality = player.cast(player.negatives.slice(-2));
        if(penality.closest < player.collider)
        {
          player.alive = false;
          player.survivor = 0;
        }
      }


      //Display rays
      result.rays.forEach(item => {
        displayObjects.push(item);
      });


      //Display player
      displayObjects.push(new Cluster(playerTriangle(player.pos, player.angle), "green", "white", 1));
      displayObjects.push(new Circle(player.pos.x, player.pos.y, 8, player.color, "white", 1));


      player.useBrain([
        result.rays[0].len,
        result.rays[1].len,
        result.rays[2].len,
        result.rays[3].len,
        result.rays[4].len,
        result.rays[5].len,
        result.rays[6].len]);
      //player.brain.displayW();
    }

    //document.getElementById("disp7").innerHTML = document.getElementById("disp7").innerHTML + "<br><br>" + player.command;
  });

  if(showPlayers)
  {
    //Display on canvas
    displayObjects.forEach(item => {
      item.update();
    });
  }


  //Ending function
  if(stop == 0 && players.every(elem => elem.alive == false))
  {
    stop = 1;

    //Get best player
    let bestScore = -Infinity;
    let bestIndex = -1;
    players.forEach((player, num) => {
      if(player.survivor > bestScore)
      {
        bestScore = player.survivor;
        bestIndex = num;
      }
    });
    winners.push({index: bestIndex, score: bestScore});

    //Get best player
    let champScore = Infinity;
    let champIndex = -1;
    winners.forEach(winner => {
      if(winner.score < champScore)
      {
        champScore = winner.score;
        champIndex = winner.index;
      }
    });
    champion = champIndex;

    if(champScore <= championScore)
    {
      championEntropy+=1;
    }
    else
    {
      document.getElementById("pantheon").innerHTML += "<div style='height: 20px; width:100%; margin-top: 5px; background-color: white'>"
      +"time : "+getTime()+", iteration : "+iteration+", entropy : "+championEntropy+", id : "+champIndex+", score : "+champScore+
      ", color : "+players[champIndex].color+", type : "+players[champIndex].mission+"</div>";

      championEntropy = 0;
      championScore = champScore;
    }

    //Display best
    document.getElementById("champText").value = "Champion is : "+ champIndex;
    document.getElementById("champScore").value = championScore;
    document.getElementById("champEntropy").value = championEntropy;

    //Clear players
    myanimate();

    if(creditLeft > 0)
    {
      creditLeft-=1;
      document.getElementById("creditLeft").value = creditLeft;
      replay();
    }

  }
  else if(stop == 0)
  {
    players.forEach((player, num) => {
      if(player.alive)
      {
        player.survivor+=1;

        //If stupid player, kill and remove points
        if(player.survivor%10000 == 1500)
        {
          player.alive = false;
          player.survivor-=1500;
        }
        else if(player.stupidity > 100)
        {
          player.alive = false;
          player.survivor-=100;
        }
        else
        {
          player.stupidity+=1;
        }

        if(showPlayers)
        {
          //Real time display
          //document.getElementById("play"+num).innerHTML = player.survivor+" contre "+player.stupidity;
        }

        //Remove stupidity if move forward
        if(player.command == 0)
        {
          player.moveForward();
          player.stupidity = 0;
        }
        else if(player.command == 1)
        {
          player.turnLeft();
          //player.moveForward();
        }
        else if(player.command == 2)
        {
          player.turnRight();
          //player.moveForward();
        }
        else if(player.command == 3)
        {
          player.turnLeft();
          player.moveForward();
        }
        else if(player.command == 4)
        {
          player.turnRight();
          player.moveForward();
        }
      }
    });

    if(showPlayers)
    {
      setTimeout(myanimate, document.getElementById("speed").value);
    }
    else
    {
      setTimeout(myanimate, 0);
    }
  }
}


function dlChampWeights()
{
  if(champion != null)
  {
    let text = "[";
    text += JSON.stringify(players[champion].brain.weights);
    text += ",";
    text += JSON.stringify(players[champion].brain.biais);
    text += "]";

    document.getElementById("weightsOutput").value = text;
  }
}

function credit()
{
  creditLeft = document.getElementById("credit").value;
  document.getElementById("creditLeft").value = creditLeft;
}





init();
myanimate();
