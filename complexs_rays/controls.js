

addEventListener('contextmenu', event => event.preventDefault());

addEventListener('resize', function () {
  canvas.width = innerWidth;
  canvas.height = innerHeight-4;
  if(confirm("Recharger la page ?"))
  {
    location.reload();
  }
});

addEventListener('mousemove', function (event) {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
});

creationMode = MODE_RAYS;

addEventListener('mousedown', function () {
  if(event.button == 0 && (
    creationMode == MODE_POLYGON ||
    creationMode == MODE_RECTANGLE ||
    creationMode == MODE_CIRCLE ||
    creationMode == MODE_LINE))
  {
    savedObjects.push(creationForm);
  }
  /*else if(event.button == 0 && closestHive)
  {
    hive.splice(closestHive, 1);
    closestHive = undefined;
  }*/
  else if(event.button == 0 && creationMode == MODE_RAYS)
  {
    rayAllowMove = !rayAllowMove;
  }
  else if(event.button == 1 && creationMode == MODE_POLYGON)
  {
    polyMode = (polyMode+1) % POLYCREA_OPTIONS;
  }
  else if(event.button == 1 && creationMode == MODE_RAYS)
  {
    rayMode = (rayMode+1) % RAY_OPTIONS;
  }
  else if(event.button == 2)
  {
    creationMode = (creationMode+1) % MODE_OPTIONS;
    creationModifier = 0;
  }

  //alert(event.button);
});

addEventListener('wheel', function() {
  if((creationMode == MODE_POLYGON && polyMode == POLYCREA_RADIUS) || creationMode == MODE_CIRCLE)
  {
    creationRadius = Math.max(creationRadius + (event.deltaY * -0.01)*Math.max(creationModifier*10, 1), 5);
  }
  else if(creationMode == MODE_POLYGON && polyMode == POLYCREA_CORNERS)
  {
    creationCorners = Math.min(Math.max(creationCorners + (event.deltaY * -0.01)*Math.max(creationModifier*5, 1), 3), 99);
  }
  else if(creationMode == MODE_POLYGON && polyMode == POLYCREA_OFFSET)
  {
    creationOffset = ((creationOffset + (event.deltaY * -0.01)*Math.max(creationModifier*10, 1))+360)%360;
  }

  else if(creationMode == MODE_RECTANGLE && creationModifier == 0)
  {
    creationWidth = Math.max(creationWidth + (event.deltaY * -0.1), 5);
  }
  else if(creationMode == MODE_RECTANGLE && creationModifier == 1)
  {
    creationHeight = Math.max(creationHeight + (event.deltaY * -0.1), 5);
  }

  else if(creationMode == MODE_RAYS && rayGradiant == true)
  {
    rayGradiantStrength = Math.min(Math.max(rayGradiantStrength + ((event.deltaY * -0.1)*Math.max(creationModifier*5, 1)), 10), 10000);
  }
  else if(creationMode == MODE_RAYS && rayMode == RAY_LINEAR)
  {
    rayNbRays = Math.min(Math.max(rayNbRays + ((event.deltaY * -0.01) *
                Math.max(creationModifier*50, 1)), 1), 9999);
  }
  else if(creationMode == MODE_RAYS && rayMode == RAY_SINGLE)
  {
    rayOffset = ((rayOffset + ((event.deltaY * -0.01)*Math.max(creationModifier*10, 1)))+360)%360;
  }
});


document.getElementById("helpLayer").style.display = "block";

addEventListener("keyup", function(event)
{
  creationModifier = 0;
});
addEventListener("keydown", function(event)
{
console.log(event.code);
  switch(event.code) {
    case "F5":
      location.reload();
      break;


    case "KeyR":
      if(creationModifier == 0){creationColor = "red";}
      else{creationBColor = "red";}
    break;
    case "KeyG":
      if(creationModifier == 0){creationColor = "green";}
      else{creationBColor = "green";}
    break;
    case "KeyB":
      if(creationModifier == 0){creationColor = "blue";}
      else{creationBColor = "blue";}
    break;
    case "KeyZ":  //Y key, depends on keyboard
      if(creationModifier == 0){creationColor = "yellow";}
      else{creationBColor = "yellow";}
    break;
    case "KeyP":
      if(creationModifier == 0){creationColor = "purple";}
      else{creationBColor = "purple";}
    break;
    case "KeyC":
      if(creationModifier == 0){creationColor = "cyan";}
      else{creationBColor = "cyan";}
    break;
    case "KeyW":
      if(creationModifier == 0){creationColor = "white";}
      else{creationBColor = "white";}
    break;
    case "KeyL":
      if(creationModifier == 0){creationColor = "black";}
      else{creationBColor = "black";}
    break;


    case "Backquote":
      creationBSize = 0;
    break;
    case "Digit1":
      creationBSize = 1 + creationModifier * 10;

      if(creationModifier == 0){rayColor = "#ffffff";}
      else{rayPolyColor = "#ffffff";}
    break;
    case "Digit2":
      creationBSize = 2 + creationModifier * 10;

      if(creationModifier == 0){rayColor = "#aaaaaa";}
      else{rayPolyColor = "#aaaaaa";}
    break;
    case "Digit3":
      creationBSize = 3 + creationModifier * 10;

      if(creationModifier == 0){rayColor = "#444444";}
      else{rayPolyColor = "#444444";}
    break;
    case "Digit4":
      creationBSize = 4 + creationModifier * 10;

      if(creationModifier == 0){rayColor = "#ffffff80";}
      else{rayPolyColor = "#ffffff80";}
    break;
    case "Digit5":
      creationBSize = 5 + creationModifier * 10;

      if(creationModifier == 0){rayColor = "#aaaaaa80";}
      else{rayPolyColor = "#aaaaaa80";}
    break;
    case "Digit6":
      creationBSize = 6 + creationModifier * 10;

      if(creationModifier == 0){rayColor = "#44444480";}
      else{rayPolyColor = "#44444480";}
    break;
    case "Digit7":
      creationBSize = 7 + creationModifier * 10;

      if(creationModifier == 0){rayColor = "#ffffff20";}
      else{rayPolyColor = "#ffffff20";}
    break;
    case "Digit8":
      creationBSize = 8 + creationModifier * 10;

      if(creationModifier == 0){rayColor = "#aaaaaa20";}
      else{rayPolyColor = "#aaaaaa20";}
    break;
    case "Digit9":
      creationBSize = 9 + creationModifier * 10;

      if(creationModifier == 0){rayColor = "#44444420";}
      else{rayPolyColor = "#44444420";}
    break;
    case "Digit0":
      creationBSize = 10 + creationModifier * 10;

      if(creationModifier == 0){rayColor = "#000000";}
      else{rayPolyColor = "#000000";}
    break;

    case "Space":
      overlayDisplay = !overlayDisplay;
      if(overlayDisplay)
      {
        document.getElementById("dlButton").style.display = "block";
        document.getElementById("fileToLoad").style.display = "block";
      }
      else
      {
        document.getElementById("dlButton").style.display = "none";
        document.getElementById("fileToLoad").style.display = "none";
      }
    break;

    case "Escape":
      helpDisplay = !helpDisplay;
      if(helpDisplay)
      {
        document.getElementById("helpLayer").style.display = "block";
      }
      else
      {
        document.getElementById("helpLayer").style.display = "none";
      }
    break;


    case "Comma":
      rayDisplayPlayer = !rayDisplayPlayer;
    break;
    case "Period":
      rayPolyMode = (rayPolyMode+1) % POLYCAST_OPTIONS;
    break;
    case "Slash": //Tiret
    case "Minus": //Tiret
      rayGradiant = !rayGradiant;
    break;

    case "ShiftLeft":
    case "ShiftRight":
      creationModifier = 1;
    break;
  }
}, true);
