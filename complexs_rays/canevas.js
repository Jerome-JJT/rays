/*
Cercle ray
*/
var canvas = document.getElementById("canevas");
var c = canvas.getContext('2d');
canvas.width = innerWidth;
canvas.height = innerHeight-4;

var mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
};

var BreakException = {};


let overlayDisplay = true;
let helpDisplay = false;


let fps = 0;
let fpsCount = 0;
let cps = 0;
let cpsCount = 0;
let sec = 0;
let oldSec = 0;


var MODE_VIEW = 0;
var MODE_POLYGON = 1;
var MODE_RECTANGLE = 2;
var MODE_CIRCLE = 3;
var MODE_LINE = 4;
var MODE_RAYS = 5;
var MODE_OPTIONS = 6;


var POLYCREA_RADIUS = 0;
var POLYCREA_CORNERS = 1;
var POLYCREA_OFFSET = 2;
var POLYCREA_OPTIONS = 3;

let creationMode = MODE_VIEW;
let creationModifier = 0;

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
let creationCorners = 6;
let creationOffset = 0;

let polyMode = POLYCREA_RADIUS;


var savedObjects;
var interactiveObjects;
var displayObjects;

var hive;
let hiveRad = 25;
let closestHive;
let allowHive = false;


var RAY_OPTI = 0;
var RAY_LINEAR = 1;
var RAY_SINGLE = 2;
var RAY_OPTIONS = 3;

var POLYCAST_OFF = 0;
var POLYCAST_ON = 1;
var POLYCAST_RAYS = 2;
var POLYCAST_OPTIONS = 3;


let rays;
let castRays;
let rayPreci = 0.01;
let raySource = new Point(100, 100);
let rayAllowMove = true;
let rayMode = RAY_OPTI;
let rayPolyMode = POLYCAST_OFF;

let rayGradiant = false;
let rayGradiantStrength = 800;
let rayDisplayPlayer = true;

let rayNbRays = 36;
let rayOffset = 0;

let rayColor = "#ffffff";
let rayPolyColor = "#444444";
let rayIcon;


function init() {
  savedObjects = [];
  hive = [];

  savedObjects.push(new Segment(-2, -1, canevas.width+2, -1));
  savedObjects.push(new Segment(canevas.width+1, -2, canevas.width+1, canevas.height+2));
  savedObjects.push(new Segment(canevas.width+2, canevas.height+1, -2, canevas.height+1));
  savedObjects.push(new Segment(-1, -2, -1, canevas.height+2));


  savedObjects.push(new Circle(100, 100, 50, "yellow", "black", 1));

  savedObjects.push(new Circle(700, 250, 100, "red", "", 0));
  savedObjects.push(new Circle(750, 400, 100, "blue", "", 0));


  savedObjects.push(new Segment(150, 600, 210, 700, "green", 1));
  savedObjects.push(new Segment(225, 550, 125, 750, "purple", 1));



  savedObjects.push(new Polygon(400, 300, 75, 5, 0, "white"));
  savedObjects.push(new Polygon(400, 450, 75, 5, 180, "black", "white", 4));


  savedObjects.push(new Polygon(550, 700, 75, 11, 0, "black", "red", 2));


  savedObjects.push(new Rect(600, 50, 75, 40, "cyan", "", 0));



  /*if(allowHive)
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
  }*/

}





function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, c.canvas.width, c.canvas.height);
  c.fillStyle = "black";
  c.fillRect(0, 0, canvas.width, canvas.height);

  interactiveObjects = savedObjects.slice(0);
  displayObjects = [];
  rays = [];
  castRays = [];


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

  /*hive.forEach(item => {
    item.update();
  });*/





  if(creationMode == MODE_POLYGON)
  {
    creationX1 = mouse.x;
    creationY1 = mouse.y;
    creationForm = new Polygon(creationX1, creationY1,
                               creationRadius, creationCorners, creationOffset,
                               creationColor, creationBColor, creationBSize);

    interactiveObjects.push(creationForm);
  }
  else if(creationMode == MODE_RECTANGLE)
  {
    creationForm = new Rect(mouse.x - creationWidth/2, mouse.y - creationHeight/2,
                            creationWidth, creationHeight,
                            creationColor, creationBColor, creationBSize);

    interactiveObjects.push(creationForm);
  }
  else if(creationMode == MODE_CIRCLE)
  {
    creationForm = new Circle(mouse.x, mouse.y, creationRadius,
                              creationColor, creationBColor, creationBSize);

    interactiveObjects.push(creationForm);
  }
  else if(creationMode == MODE_LINE)
  {
    creationBSize = Math.max(creationBSize, 1);
    if(creationModifier == 0)
    {
      creationX1 = mouse.x;
      creationY1 = mouse.y;
    }
    else
    {
      creationX2 = mouse.x;
      creationY2 = mouse.y;
    }
    creationForm = new Segment(creationX1, creationY1, creationX2, creationY2,
                               creationColor, creationBSize);

    interactiveObjects.push(creationForm);
  }



  interactiveObjects.forEach(item => {
    displayObjects.push(item);
  });



  if(creationMode == MODE_RAYS || !rayAllowMove)
  {
    //Choose if rays starts from mouse or saved position
    if(rayAllowMove)
    {
      raySource = new Point(mouse.x, mouse.y);
    }

    //Rays colors who should be displayed
    let rayDrawColor = rayColor;
    let rayPolyDrawColor = rayPolyColor;

    //Color modifiers
    if(rayGradiant)
    {
      let grd = c.createRadialGradient(raySource.x, raySource.y, 5,
                                       raySource.x, raySource.y, rayGradiantStrength);
      grd.addColorStop(0, "#dddddd");
      grd.addColorStop(0.2, "#808080");
      grd.addColorStop(0.9, "#050505");
      grd.addColorStop(1, "black");

      rayDrawColor = grd;
      rayPolyDrawColor = grd;
    }
    else if(rayPolyMode == POLYCAST_RAYS)
    {
      rayDrawColor = rayPolyColor;
    }

    if(rayMode == RAY_OPTI)
    {
      interactiveObjects.forEach(obj => {
        obj.clust.forEach(seg => {
          //Will loop twice for a segement or circle (segment tangeant) to ray both ends
          for(let i = 0; i < (obj instanceof Segment || obj instanceof Circle)+1; i++)
          {
            let testRay;

            if(i == 0)
            {
              if(obj instanceof Circle)
              {
                seg = obj.tang(raySource);
              }

              testRay = new Ray(raySource.x, raySource.y,
                                seg.p1.x, seg.p1.y, undefined, rayDrawColor);
            }
            else if(i == 1)
            {
              if(obj instanceof Circle)
              {
                seg = obj.tang(raySource);
              }

              testRay = new Ray(raySource.x, raySource.y,
                                seg.p2.x, seg.p2.y, undefined, rayDrawColor);
            }

            let castFlag = false;
            try {
              interactiveObjects.forEach(checkObj => {
                checkObj.clust.forEach(checkSeg => {
                  if(checkObj instanceof Circle)
                  {
                    if(testRay.clust[0].rcast(checkObj))
                    {
                      throw BreakException;
                    }
                  }
                  else if(testRay.clust[0].cast(checkSeg))
                  {
                    throw BreakException;
                  }
                });
              });
            }
            catch (e) {
              if (e !== BreakException) throw e;
              castFlag = true;
            }

            if(!castFlag)
            {
              rays.push(testRay);
            }
          }
        });
      });

      //Find segments cross and ray them if visible from ray source
      interactiveObjects.forEach((obj, objId) => {
        obj.clust.forEach(seg => {

          for(let i = objId+1; i < interactiveObjects.length; i++)
          {
            interactiveObjects[i].clust.forEach(searchSeg => {
              let crosses = [];

              if(interactiveObjects[i] instanceof Circle)
              {
                //Circle on circle
                if(obj instanceof Circle)
                {
                  crosses = crosses.concat(obj.ccast(interactiveObjects[i]));
                }
                //Cluster segment on circle
                else
                {
                  crosses.push(seg.rcast(interactiveObjects[i]));
                }
              }
              else
              {
                //Circle on cluster segement
                if(obj instanceof Circle)
                {
                  crosses.push(searchSeg.rcast(obj));
                }
                //Cluster segment on cluster segment
                else
                {
                  crosses.push(seg.cast(searchSeg));
                }
              }

              crosses.forEach(cross => {
                //console.log(cross);
                if(cross)
                {
                  //(new Circle(cross.x, cross.y, 10, "red", "white", 0)).update();
                  let testRay = new Ray(raySource.x, raySource.y,
                                        cross.x, cross.y, undefined, rayDrawColor);

                  let castFlag = false;
                  try {
                    interactiveObjects.forEach(checkObj => {
                      checkObj.clust.forEach(checkSeg => {
                        if(checkObj instanceof Circle)
                        {
                          if(testRay.clust[0].rcast(checkObj))
                          {
                            throw BreakException;
                          }
                        }
                        else if(testRay.clust[0].cast(checkSeg))
                        {
                          throw BreakException;
                        }
                      });
                    });
                  }
                  catch (e) {
                    if (e !== BreakException) throw e;
                    castFlag = true;
                  }

                  if(!castFlag)
                  {
                    rays.push(testRay);
                  }
                }
              });
            });
          }
        });
      });

      //Ray segment's ends and segment's left and right
      rays.forEach(ray => {
        castRays.push(new Ray(raySource.x, raySource.y,
                             undefined, undefined, (ray.angle+(000+rayPreci))%360, rayDrawColor));
        castRays.push(new Ray(raySource.x, raySource.y,
                             undefined, undefined, (ray.angle+(360-rayPreci))%360, rayDrawColor));
      });
    }
    else if(rayMode == RAY_LINEAR)
    {
      for(let i = 0; i < 360; i+=(360/rayNbRays))
      {
        castRays.push(new Ray(raySource.x, raySource.y, undefined, undefined, i, rayDrawColor));
      }
    }
    else if(rayMode == RAY_SINGLE)
    {
      castRays.push(new Ray(raySource.x, raySource.y, undefined, undefined, rayOffset, rayDrawColor));
    }


    //For each rays finds nearest cross segment form origin
    castRays.forEach(cRay => {
      cRay.score = Infinity;

      let closestCross = undefined;

      interactiveObjects.forEach(obj => {
        obj.clust.forEach(seg => {

          let cross;
          if(obj instanceof Circle)
          {
            cross = cRay.clust[0].rcast(obj);
          }
          else
          {
            cross = cRay.clust[0].cast(seg);
          }

          if(cross)
          {
            let rayScore = distance(cRay.clust[0].p1.x, cRay.clust[0].p1.y, cross.x, cross.y);

            if(rayScore < cRay.score)
            {
              cRay.score = rayScore;
              closestCross = cross;
            }
          }
        });
      });

      //If ray cross a segment, cast end on ray at the cross
      if(closestCross)
      {
        //(new Circle(closestCross.x, closestCross.y, 2, "red", "white", 0)).update();
        cRay.clust[0].p2.x = closestCross.x;
        cRay.clust[0].p2.y = closestCross.y;
      }

      rays.push(cRay);
    });

    rays = rays.sort(compare)

    //Sort rays clockwise way and fill space between rays
    if(rayPolyMode == POLYCAST_ON || rayPolyMode == POLYCAST_RAYS)
    {
      for(let i = 0; i < rays.length; i++)
      {
        displayObjects.push(new Cluster([rays[i].clust[0].p1,
                                         rays[i].clust[0].p2,
                                         rays[(i+1)%rays.length].clust[0].p2],
                                         rayPolyDrawColor, "", 0));
      }
    }

    if(rayMode == RAY_OPTI)
    {
      rayNbRays = rays.length;
    }
  }


  rays.forEach(item => {
    displayObjects.push(item);
  });


  if(creationMode == MODE_RAYS && rayDisplayPlayer)
  {
    //rayIcon = new Polygon(raySource.x, raySource.y, 10, 6, 30, "red", "", 0);
    rayIcon = new Circle(raySource.x, raySource.y, 8, "red", "", 0);
    displayObjects.push(rayIcon);
  }


  displayObjects.forEach(item => {
    item.update();
  });

  //FPS counter
  sec = new Date().getSeconds();
  if(oldSec != sec)
  {
    oldSec = sec;
    fps = fpsCount;
    fpsCount = 0;
    cps = cpsCount;
    cpsCount = 0;
  }
  fpsCount++;

  if(overlayDisplay)
  {
    c.font = "20px Comic Sans MS";
    c.strokeStyle = "white";
    c.lineWidth = 2;


    c.fillStyle = "black";
    c.fillRect(0, 0, 90, 25);
    c.strokeRect(1, 1, 90, 25);

    c.fillStyle = "lime";
    c.fillText("FPS : " + fps, 5, 21);



    c.fillStyle = "black";
    c.fillRect(0, 27, 100, 25);
    c.strokeRect(1, 28, 100, 25);

    if(creationModifier)
    {
      c.fillStyle = "red";
    }
    else
    {
      c.fillStyle = "lime";
    }
    c.fillText("MODE : " + creationMode, 5, 48);


    if(creationMode == MODE_RAYS || !rayAllowMove)
    {
      c.fillStyle = "black";
      c.fillRect(102, 27, 130, 25);
      c.strokeRect(102, 28, 130, 25);

      if(rayGradiant == true)
      {
        c.fillStyle = "cyan";
      }
      else if(rayPolyMode == POLYCAST_ON || rayPolyMode == POLYCAST_RAYS)
      {
        c.fillStyle = "red";
      }
      else
      {
        c.fillStyle = "lime";
      }

      if(rayMode == RAY_OPTI || rayMode == RAY_LINEAR)
      {
        c.fillText("RAYS : " + rayNbRays, 108, 48);
      }
      else if(rayMode == RAY_SINGLE)
      {
        c.fillText("R OFF : " + rayOffset, 108, 48);
      }

      c.fillStyle = "black";
      c.fillRect(234, 27, 138, 25);
      c.strokeRect(234, 28, 138, 25);

      c.fillStyle = "lime";

      c.fillText("CPS : " + cps, 240, 48);
    }


    if(creationMode == MODE_POLYGON)
    {
      c.fillStyle = "black";
      c.fillRect(0, 54, 110, 25);
      c.strokeRect(1, 55, 110, 25);

      if(polyMode == POLYCREA_CORNERS)
      {
        c.fillStyle = "red";
      }
      else
      {
        c.fillStyle = "lime";
      }

      c.fillText("CORN : " + creationCorners, 5, 75);


      c.fillStyle = "black";
      c.fillRect(112, 54, 120, 25);
      c.strokeRect(113, 55, 120, 25);

      if(polyMode == POLYCREA_OFFSET)
      {
        c.fillStyle = "red";
      }
      else
      {
        c.fillStyle = "lime";
      }

      c.fillText("OFFS : " + creationOffset, 117, 75);
    }
  }
}


init();
animate();
