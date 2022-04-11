


var canvas = document.getElementById("canevas");
var c = canvas.getContext('2d');
canvas.width = innerWidth;
canvas.height = innerHeight-4;


var mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
};


let creationStatus = 0;
let creationMode;

let creationForm;
let creationColor = "yellow";
let creationBColor = "white";
let creationBSize = 2;

let creationX1 = 100;
let creationY1 = 100;
let creationX2 = 100;
let creationY2 = 100;
let creationWidth = 100;
let creationHeight = 50;
let creationRadius = 100;


var objs;

var hive;
let hiveRad = 25;
let closestHive;
let allowHive = false;


let rays;

let player;
let ray;


function init() {
  objs = [];

  hive = [];

  rays = [];

  if(allowHive)
  {
    let flag = 0;
    for(let i = 0; i < canevas.height+hiveRad; i+=(mcos(30)*hiveRad))
    {
      for(let j = ((msin(30)*hiveRad)+hiveRad)*flag;
          j < canevas.width+hiveRad;
          j+=(((msin(30)*hiveRad)+hiveRad)*2))
      {
        hive.push(new Hexagon(j, i, hiveRad, "blue", "white", 1));
      }
      flag = !flag;
    }
  }

  objs.push(new Line(300, 40, 180, 200));
  objs.push(new Line(500, 80, 720, 220));
  objs.push(new Line(400, 160, 200, 340));

  objs.push(new Line(550, 200, 550, 350));
  objs.push(new Line(400, 340, 400, 450));

  objs.push(new Line(150, 400, 320, 500));
  objs.push(new Line(170, 500, 340, 600));

  objs.push(new Line(550, 500, 700, 350));
  objs.push(new Line(530, 470, 700, 600));

  objs.push(new Line(440, 570, 640, 730));
  objs.push(new Line(600, 570, 510, 730));

  objs.push(new Line(90, 720, 400, 680));

  player = new Circle(undefined, undefined, 5, "red", "white", 0);

  for(let i = 0; i < 360; i+=0.5)
  {
    rays.push(new Ray(undefined, undefined, undefined, undefined, i, "yellow", 1));
  }
}


let fps = 0;
let fpsCount = 0;
let sec = 0;
let oldSec = 0;

function animate() {
  requestAnimationFrame(animate);
  c.fillStyle = "black";
  c.fillRect(0, 0, canvas.width, canvas.height);


  /*
  let closeScore = Infinity;
  closestHive = undefined;

  for(let i = 0; i < hive.length; i++)
  {
    hive[i].color = "blue";

    let dis = distance(mouse.x, mouse.y, hive[i].centerX, hive[i].centerY);

    if(dis < closeScore && dis < hiveRad)
    {
      closestHive = i;
      closeScore = dis;
    }
  }

  if(closestHive)
  {
    hive[closestHive].color = "red";
  }
  */



  hive.forEach(item => {
    item.update();
  });

  objs.forEach(item => {
    item.update();
  });




  rays.forEach(ray => {
    ray.x1 = mouse.x;
    ray.y1 = mouse.y;

    ray.x2 = mouse.x + mcos(ray.angle - 90) * 1000;
    ray.y2 = mouse.y + msin(ray.angle - 90) * 1000;

    ray.score = Infinity;

    let closestCross = undefined;

    objs.forEach(item => {
      let cross = ray.cast(item);

      if(cross)
      {
        let rayScore = distance(ray.x1, ray.y1, cross.x, cross.y);

        if(rayScore < ray.score)
        {
          ray.score = rayScore;
          closestCross = cross;
        }

      }
    });

    if(closestCross)
    {
      (new Circle(closestCross.x, closestCross.y, 2, "red", "white", 0)).update();
      ray.x2 = closestCross.x;
      ray.y2 = closestCross.y;
    }

    ray.update();
  });


  player.x = mouse.x;
  player.y = mouse.y;
  player.update();



  /*
  if(creationStatus == 1)
  {
    creationX1 = mouse.x;
    creationY1 = mouse.y;
    creationForm = new Hexagon(creationX1, creationY1, creationRadius,
                              creationColor, creationBColor, creationBSize);
    creationForm.draw();
  }
  else if(creationStatus == 2)
  {
    creationForm = new SimpleRect(mouse.x - creationWidth/2, mouse.y - creationHeight/2,
                                  creationWidth, creationHeight,
                                  creationColor, creationBColor, creationBSize);
    creationForm.draw();
  }
  else if(creationStatus == 3)
  {
    if(creationMode == 0)
    {
      creationX1 = mouse.x;
      creationY1 = mouse.y;
    }
    else
    {
      creationX2 = mouse.x;
      creationY2 = mouse.y;
    }
    creationForm = new Line(creationX1, creationY1, creationX2, creationY2,
                            creationColor, creationBSize);
    creationForm.draw();
  }
  */








  //FPS counter
  sec = new Date().getSeconds();
  if(oldSec != sec)
  {
    oldSec = sec;
    fps = fpsCount;
    fpsCount = 0;
  }
  fpsCount++;

  c.fillStyle ="black";
  c.fillRect(0, 0, 90, 25);
  c.font = "20px Comic Sans MS";

  c.strokeStyle = "white";
  c.lineWidth = 2;
  c.strokeRect(1, 1, 90, 25);


  c.fillStyle = "lime";
  c.fillText("FPS : " + fps, 5, 21);


}


init();
animate();
