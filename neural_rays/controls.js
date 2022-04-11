

addEventListener('contextmenu', event => event.preventDefault());


addEventListener('mousemove', function (event) {
  //mouse.x = event.clientX;
  //mouse.y = event.clientY;
});




addEventListener("keydown", function(event)
{
  switch(event.code) {
    case "F5":
      //location.reload();
      event.preventDefault();
      return 0;
      break;

      case "KeyW":
        players[0].moveForward();
      break;

      case "KeyA":
        players[0].moveLeft();
      break;

      case "KeyS":
        players[0].moveBack();
      break;

      case "KeyD":
        players[0].moveRight();
      break;
  }
}, true);

addEventListener('wheel', function() {
  //playerAngle = (playerAngle + (event.deltaY * 2) + 360)%360;
  if(event.deltaY > 0)
  {
    players[0].turnRight();
  }
  else if(event.deltaY < 0)
  {
    players[0].turnLeft();
  }
});
