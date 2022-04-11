
class Form
{
  constructor(color, borderColor, borderSize)
  {
    this.color = color;
    this.bColor = borderColor;
    this.bSize = borderSize;
    this.type = "";
  }

  update() {
    this.draw();

    c.fillStyle = this.color;
    c.fill();

    if(this.bSize > 0)
    {
      c.strokeStyle = this.bColor;
      c.lineWidth = this.bSize;
      c.stroke();
    }
  }
}


class Line extends Form
{
  constructor(x1, y1, x2, y2, lineColor = "white", lineSize = 1)
  {
    super("", lineColor, lineSize);

    this.type = "line";

    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
  }

  draw()
  {
    c.beginPath();
    c.moveTo(this.x1, this.y1);
    c.lineTo(this.x2, this.y2);
    c.closePath();
  }
}


class Ray extends Line
{
  constructor(x1, y1, x2, y2, angle, lineColor = "white", lineSize = 1)
  {
    super(x1, y1, x2, y2, lineColor, lineSize);

    this.type = "ray";

    this.angle = angle;
    this.score = Infinity;
  }

  cast(obj)
  {
    let den = (this.x1 - this.x2) * (obj.y1 - obj.y2) -
              (this.y1 - this.y2) * (obj.x1 - obj.x2);

    if(den == 0)
    {
      return false;
    }

    let t = ((this.x1 - obj.x1) * (obj.y1 - obj.y2) -
             (this.y1 - obj.y1) * (obj.x1 - obj.x2)) / den;

    let u = -((this.x1 - this.x2) * (this.y1 - obj.y1) -
              (this.y1 - this.y2) * (this.x1 - obj.x1)) / den;

    if(t > 0 && t < 1 && u > 0 && u < 1)
    {
      return {x : this.x1 + t * (this.x2 - this.x1), y : this.y1 + t * (this.y2 - this.y1)};
    }
    else
    {
      return false;
    }
  }
}


class PolyRect extends Form
{
  constructor(x1, y1, x2, y2, x3, y3, x4, y4,
              color = "black", borderColor = "white", borderSize = 1)
  {
    super(color, borderColor, borderSize);

    this.type = "polyrect";

    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.x3 = x3;
    this.y3 = y3;
    this.x4 = x4;
    this.y4 = y4;
  }

  draw()
  {
    c.beginPath();
    c.moveTo(this.x1, this.y1);
    c.lineTo(this.x2, this.y2);
    c.lineTo(this.x3, this.y3);
    c.lineTo(this.x4, this.y4);
    c.closePath();
  }
}

class SimpleRect extends PolyRect
{
  constructor(x, y, w, h, color = "black", borderColor = "white", borderSize = 1)
  {
    super(x, y, x+w, y, x+w, y+h, x, y+h, color, borderColor, borderSize);

    this.type = "simplerect";
  }
}


class Polygon extends Form
{
  constructor(x1, y1, points,
              color = "black", borderColor = "white", borderSize = 1)
  {
    super(color, borderColor, borderSize);

    this.type = "polygon";

    this.x = x1;
    this.y = y1;

    this.points = points;
  }

  draw()
  {
    c.beginPath();

    c.moveTo(this.x, this.y);
    for(let i = 0; i < this.points.length; i+=2)
    {
      c.lineTo(this.points[i], this.points[i+1]);
    }
    c.closePath();
  }
}


class Hexagon extends Polygon
{
  constructor(x, y, radius,
              color = "black", borderColor = "white", borderSize = 1)
  {
    super(x+(msin(30)*radius), y-(mcos(30)*radius), [
          x+(msin(90)*radius), y-(mcos(90)*radius),
          x+(msin(30)*radius), y+(mcos(30)*radius),
          x-(msin(30)*radius), y+(mcos(30)*radius),
          x-(msin(90)*radius), y+(mcos(90)*radius),
          x-(msin(30)*radius), y-(mcos(30)*radius),
          ],
          color, borderColor, borderSize
    );

    this.type = "hexagon";

    this.centerX = x;
    this.centerY = y;
  }
}




class Circle extends Form
{
    constructor(x, y, radius,
                color = "black", borderColor = "white", borderSize = 1) {
      super(color, borderColor, borderSize);

      this.type = "circle";

      this.x = x;
      this.y = y;
      this.radius = radius;
    }

    draw() {
      c.beginPath();
      c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      c.closePath();
    }
}
