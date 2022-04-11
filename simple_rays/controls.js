

addEventListener('contextmenu', event => event.preventDefault());

addEventListener('resize', function () {
  canvas.width = innerWidth;
  canvas.height = innerHeight-4;
  init();
});

addEventListener('mousemove', function (event) {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
});


addEventListener('mousedown', function () {
  /*
  if(event.button == 2)
  {
    creationStatus = (creationStatus+1) % 4;
    creationMode = 0;
  }

  if(event.button == 1)
  {
    allowHive = !allowHive;
    init();
  }

  if(event.button == 0 && creationStatus != 0)
  {
    objs.push(creationForm);
  }
  else if(event.button == 0 && closestHive)
  {
    hive.splice(closestHive, 1);
    closestHive = undefined;
  }
  */
  //alert(event.button);
});

addEventListener('wheel', function() {
  if(creationStatus == 1)
  {
    creationRadius = Math.max(creationRadius + (event.deltaY * 0.1), 5);
  }
  else if(creationStatus == 2 && creationMode == 0)
  {
    creationWidth = Math.max(creationWidth + (event.deltaY * 0.1), 5);
  }
  else if(creationStatus == 2 && creationMode == 1)
  {
    creationHeight = Math.max(creationHeight + (event.deltaY * 0.1), 5);
  }
});

addEventListener("keyup", function(event)
{
  creationMode = 0;
});
addEventListener("keydown", function(event)
{
  switch(event.code) {
    case "F5":
      location.reload();
      break;


    case "KeyR":
      if(creationMode == 0){creationColor = "red";}
      else{creationBColor = "red";}
    break;
    case "KeyG":
      if(creationMode == 0){creationColor = "green";}
      else{creationBColor = "green";}
    break;
    case "KeyB":
      if(creationMode == 0){creationColor = "blue";}
      else{creationBColor = "blue";}
    break;
    case "KeyZ":  //Y key, depends on keyboard
      if(creationMode == 0){creationColor = "yellow";}
      else{creationBColor = "yellow";}
    break;
    case "KeyP":
      if(creationMode == 0){creationColor = "purple";}
      else{creationBColor = "purple";}
    break;
    case "KeyC":
      if(creationMode == 0){creationColor = "cyan";}
      else{creationBColor = "cyan";}
    break;
    case "KeyW":
      if(creationMode == 0){creationColor = "white";}
      else{creationBColor = "white";}
    break;
    case "KeyL":
      if(creationMode == 0){creationColor = "black";}
      else{creationBColor = "black";}
    break;


    case "Digit1":
      creationBSize = 1 + creationMode * 10;
    break;
    case "Digit2":
      creationBSize = 2 + creationMode * 10;
    break;
    case "Digit3":
      creationBSize = 3 + creationMode * 10;
    break;
    case "Digit4":
      creationBSize = 4 + creationMode * 10;
    break;
    case "Digit5":
      creationBSize = 5 + creationMode * 10;
    break;
    case "Digit6":
      creationBSize = 6 + creationMode * 10;
    break;
    case "Digit7":
      creationBSize = 7 + creationMode * 10;
    break;
    case "Digit8":
      creationBSize = 8 + creationMode * 10;
    break;
    case "Digit9":
      creationBSize = 9 + creationMode * 10;
    break;
    case "Digit0":
      creationBSize = 10 + creationMode * 10;
    break;

    case "ShiftLeft":
    case "ShiftRight":
      creationMode = 1;
    break;

    /*case "KeyD":
    case "ArrowRight":
    case "Numpad6":
    case "ControlLeft":*/
  }
  //event.preventDefault();
}, true);
