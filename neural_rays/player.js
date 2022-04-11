class Player
{
  constructor(x, y, angle = 0, color = "red", objectives, layers = [7,6,5,5])
  {
    this.pos = new Point(x, y);
    this.angle = angle;

    this.color = color;
    this.mission = "empty";

    this.alive = true;

    //this.rays = [];

    this.brain = new Neural(layers);

    this.footSpeed = 3;
    this.headSpeed = 6;
    this.collider = 12;

    this.survivor = 0;

    this.stupidity = 0;
    this.command = 0;

    this.objectives = objectives;
    this.lastobjective = null;
    this.negatives = [];
  }

  //Create rays, check collisions, get rays length and verify dying condition
  cast(objects)
  {
    let rays = [];

    let rayColor = this.color;

    rays.push(new Ray(this.pos.x, this.pos.y, undefined, undefined, this.angle-45, rayColor));
    rays.push(new Ray(this.pos.x, this.pos.y, undefined, undefined, this.angle-22, rayColor));

    //rays.push(new Ray(this.pos.x, this.pos.y, undefined, undefined, this.angle-7, rayColor));
    rays.push(new Ray(this.pos.x+mcos((this.angle+40+270)%360)*10, this.pos.y+msin((this.angle+40+270)%360)*10,
    undefined, undefined, this.angle, rayColor));


    rays.push(new Ray(this.pos.x, this.pos.y, undefined, undefined, this.angle, rayColor));


    //rays.push(new Ray(this.pos.x, this.pos.y, undefined, undefined, this.angle+7, rayColor));
    rays.push(new Ray(this.pos.x+mcos((this.angle-40+270)%360)*10, this.pos.y+msin((this.angle-40+270)%360)*10,
    undefined, undefined, this.angle, rayColor));

    rays.push(new Ray(this.pos.x, this.pos.y, undefined, undefined, this.angle+22, rayColor));
    rays.push(new Ray(this.pos.x, this.pos.y, undefined, undefined, this.angle+45, rayColor));

    processRays(rays, objects);

    //Dying check
    let min = Infinity;

    rays.forEach(item => {
      item.len = distance(item.p1.x, item.p1.y, item.p2.x, item.p2.y);
      min = Math.min(min, item.len);
    });

    return {rays: rays, closest: min};
  }


  //Pass input to neural network layers
  useBrain(rays)
  {
    this.command = this.brain.processCommand(rays);
  }






  moveForward()
  {
    this.pos.x = this.pos.x + (mcos((this.angle+270)%360) * this.footSpeed);
    this.pos.y = this.pos.y + (msin((this.angle+270)%360) * this.footSpeed);
  }
  moveLeft()
  {
    this.pos.x = player.pos.x + (mcos((this.angle+180)%360) * this.footSpeed);
    this.pos.y = player.pos.y + (msin((this.angle+180)%360) * this.footSpeed);
  }
  moveRight()
  {
    this.pos.x = this.pos.x + (mcos((this.angle+360)%360) * this.footSpeed);
    this.pos.y = this.pos.y + (msin((this.angle+360)%360) * this.footSpeed);
  }
  moveBack()
  {
    this.pos.x = this.pos.x + (mcos((this.angle+90)%360) * this.footSpeed);
    this.pos.y = this.pos.y + (msin((this.angle+90)%360) * this.footSpeed);
  }
  turnLeft()
  {
    this.angle = (this.angle - this.headSpeed + 360)%360;
  }
  turnRight()
  {
    this.angle = (this.angle + this.headSpeed + 360)%360;
  }
}
