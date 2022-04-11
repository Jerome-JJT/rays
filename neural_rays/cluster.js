
class Point
{
  constructor(x, y)
  {
    this.x = x;
    this.y = y;
  }
}

class Line
{
  constructor(p1, p2)
  {
    this.p1 = p1;
    this.p2 = p2;
  }

  cast(obj)
  {
    let den = (this.p1.x - this.p2.x) * (obj.p1.y - obj.p2.y) -
              (this.p1.y - this.p2.y) * (obj.p1.x - obj.p2.x);

    if(den == 0)
    {
      return false;
    }

    let t = ((this.p1.x - obj.p1.x) * (obj.p1.y - obj.p2.y) -
             (this.p1.y - obj.p1.y) * (obj.p1.x - obj.p2.x)) / den;

    let u = -((this.p1.x - this.p2.x) * (this.p1.y - obj.p1.y) -
              (this.p1.y - this.p2.y) * (this.p1.x - obj.p1.x)) / den;

    //if(t > 0 && t < 1 && u > 0 && u < 1)
    if(t > 0 && t < 0.99999 && u > 0 && u < 0.99999)
    {
      return {x : this.p1.x + t * (this.p2.x - this.p1.x), y : this.p1.y + t * (this.p2.y - this.p1.y)};
    }
    else
    {
      return false;
    }
  }


  rcast(circle)
  {
    let l1 = new Point(this.p1.x - circle.x, this.p1.y - circle.y);
    let l2 = new Point(this.p2.x - circle.x, this.p2.y - circle.y);

    let l21 = new Point(l2.x - l1.x, l2.y - l1.y);


    let a = Math.pow(l21.x, 2) + Math.pow(l21.y, 2);
    let b = 2 * ((l21.x * l1.x) + (l21.y * l1.y));
    let c = Math.pow(l1.x, 2) + Math.pow(l1.y, 2) - Math.pow(circle.radius, 2);

    let delta = Math.pow(b, 2) - (4 * a * c);


    if(delta <= 0.001)
    {
      return false;
    }
    else if(delta > 0)
    {
      let square = Math.sqrt(delta);

      let u1 = ((b*-1) + square) / (2 * a);
  		let u2 = ((b*-1) - square) / (2 * a);

      let res1 = new Point(this.p1.x + (u1*l21.x), this.p1.y + (u1*l21.y));
      let res2 = new Point(this.p1.x + (u2*l21.x), this.p1.y + (u2*l21.y));


      let v0 = new Point(Math.sign(mRound(this.p2.x - this.p1.x, 5)),
                         Math.sign(mRound(this.p2.y - this.p1.y)));

      let v1 = new Point(Math.sign(mRound(res1.x - this.p1.x, 5)),
                         Math.sign(mRound(res1.y - this.p1.y, 5)));

      let v2 = new Point(Math.sign(mRound(res2.x - this.p1.x, 5)),
                         Math.sign(mRound(res2.y - this.p1.y, 5)));



      let bas = distance(this.p1.x, this.p1.y, this.p2.x, this.p2.y)*0.99999;

      if(pEqual(v0, v1) && pEqual(v0, v2))
      {
        if(distance(this.p1.x, this.p1.y, res1.x, res1.y) <= distance(this.p1.x, this.p1.y, res2.x, res2.y))
        {
          //return res1;
          return (distance(this.p1.x, this.p1.y, res1.x, res1.y) < bas) ? res1 : false;
        }
        else
        {
          //return res2;
          return (distance(this.p1.x, this.p1.y, res2.x, res2.y) < bas) ? res2 : false;
        }
      }
      else if(pEqual(v0, v1))
      {
        //return res1;
        return (distance(this.p1.x, this.p1.y, res1.x, res1.y) < bas) ? res1 : false;
      }
      else if(pEqual(v0, v2))
      {
        //return res2;
        return (distance(this.p1.x, this.p1.y, res2.x, res2.y) < bas) ? res2 : false;
      }
      else
      {
        return false;
      }


    }
  }
}


class Form
{
  constructor(color, bColor, bSize)
  {
    this.color = color;
    this.bColor = bColor;
    this.bSize = bSize;
  }

  update()
  {
    this.draw();
  }
}


class Cluster extends Form
{
  constructor(pts, color, bColor, bSize)
  {
    super(color, bColor, bSize);

    this.clust = []
    for(let i = 0; i < pts.length; i++)
    {
      this.clust.push(new Line(pts[i], pts[(i+1)%pts.length]));
    }
  }

  draw()
  {
    if(this.bSize > 0)
    {
      this.clust.forEach(item => {
        c.beginPath();
        c.moveTo(item.p1.x, item.p1.y);
        c.lineTo(item.p2.x, item.p2.y);
        c.closePath();

        c.strokeStyle = this.bColor;
        c.lineWidth = this.bSize;
        c.stroke();
      });
    }


    c.beginPath();
    this.clust.forEach(item => {
      c.lineTo(item.p1.x, item.p1.y);
      c.lineTo(item.p2.x, item.p2.y);
    });
    c.closePath();

    c.fillStyle = this.color;
    c.fill();
  }
}

class Segment extends Form
{
  constructor(x1, y1, x2, y2, bColor = "white", bSize = 1)
  {
    super("", bColor, bSize);

    this.clust = [];
    this.clust.push(new Line(
      new Point(x1, y1),
      new Point(x2, y2),
    ));
  }

  draw()
  {
    if(this.bSize > 0)
    {
      let seg = this.clust[0];
      c.beginPath();
      c.moveTo(seg.p1.x, seg.p1.y);
      c.lineTo(seg.p2.x, seg.p2.y);
      c.closePath();

      c.strokeStyle = this.bColor;
      c.lineWidth = this.bSize;
      c.stroke();
    }
  }
}


class Ray extends Segment
{
  constructor(x1, y1, x2, y2, angle, lineColor = "white", lineSize = 1)
  {
    super(x1, y1, x2, y2, lineColor, lineSize);

    if(angle != undefined)
    {
      this.angle = angle;

      this.clust[0].p2.x = this.clust[0].p1.x + mcos((angle+270)%360) * 10000;
      this.clust[0].p2.y = this.clust[0].p1.y + msin((angle+270)%360) * 10000;
    }
    else
    {
      if(y1 <= y2)
      {
        if(x1 >= x2)
        {
          this.angle = matan(Math.abs(x2-x1) / Math.abs(y2-y1))+180;

        }
        else
        {
          this.angle = (90-matan(Math.abs(x2-x1) / Math.abs(y2-y1)))+90;
        }
      }
      else
      {
        if(x1 >= x2)
        {
          this.angle = (90-matan(Math.abs(x2-x1) / Math.abs(y2-y1)))+270;
        }
        else
        {
          this.angle = matan(Math.abs(x2-x1) / Math.abs(y2-y1));
        }
      }
    }

    this.score = Infinity;
    this.len = distance(this.clust[0].p1.x, this.clust[0].p1.y, this.clust[0].p2.x, this.clust[0].p2.y);
  }


  get ray() {
    return this.clust[0];
  }

  get p1() {
    return new Point(this.clust[0].p1.x, this.clust[0].p1.y);
  }
  get p2() {
    return new Point(this.clust[0].p2.x, this.clust[0].p2.y);
  }
}


class Rect extends Cluster
{
  constructor(x, y, width, height, color = "black", bColor = "white", bSize = 1)
  {
    let pts = [
      new Point(x, y),
      new Point(x + width, y),
      new Point(x + width, y + height),
      new Point(x, y + height),
    ];

    super(pts, color, bColor, bSize);
  }
}

class Polygon extends Cluster
{
  constructor(x, y, radius, corners, offset, color = "black", bColor = "white", bSize = 1)
  {
    let pts = [];

    let gap = 360 / corners;

    for(let i = 0; i < corners; i++)
    {
      let thisAngle = (i*gap + offset) % 360;

      if(thisAngle >= 0 && thisAngle < 90)
      {
        thisAngle = thisAngle;
        pts.push(new Point(x+(msin(thisAngle)*radius), y-(mcos(thisAngle)*radius)));
      }
      else if(thisAngle >= 90 && thisAngle < 180)
      {
        thisAngle = 90-(thisAngle-90);
        pts.push(new Point(x+(msin(thisAngle)*radius), y+(mcos(thisAngle)*radius)));
      }
      else if(thisAngle >= 180 && thisAngle < 270)
      {
        thisAngle = thisAngle-180;
        pts.push(new Point(x-(msin(thisAngle)*radius), y+(mcos(thisAngle)*radius)));
      }
      else if(thisAngle >= 270 && thisAngle < 360)
      {
        thisAngle = 90-(thisAngle-270);
        pts.push(new Point(x-(msin(thisAngle)*radius), y-(mcos(thisAngle)*radius)));
      }
    }

    super(pts, color, bColor, bSize);
  }
}

class Circle extends Form
{
  constructor(x, y, radius,
              color = "black", borderColor = "white", borderSize = 1) {
    super(color, borderColor, borderSize);


    this.x = x;
    this.y = y;
    this.radius = radius;

    this.clust = [1]; //Used to show that the object has a segment with two ends (tangeant)
  }

  draw() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.closePath();

    c.fillStyle = this.color;
    c.fill();

    if(this.bSize > 0)
    {
      c.strokeStyle = this.bColor;
      c.lineWidth = this.bSize;
      c.stroke();
    }
  }

  tang(pt)
  {
    let a = masin(this.radius / distance(pt.x, pt.y, this.x, this.y));
    let b = matan2(this.y - pt.y, this.x - pt.x);

    return {p1 : new Point(this.x + this.radius *  msin(b - a), this.y + this.radius * -mcos(b - a)),
            p2 : new Point(this.x + this.radius * -msin(b + a), this.y + this.radius *  mcos(b + a))};
  }

  ccast(circle)
  {
    let dist = distance(this.x, this.y, circle.x, circle.y);

    let cent = (Math.pow(this.radius, 2) - Math.pow(circle.radius, 2) + Math.pow(dist, 2)) / (dist * 2);

    let diff = Math.sqrt(Math.pow(this.radius, 2) - Math.pow(cent, 2));

    let center = new Point(
      this.x + ((cent * (circle.x - this.x)) / dist),
      this.y + ((cent * (circle.y - this.y)) / dist)
    );


    return [new Point(center.x + (diff * (circle.y - this.y)) / dist,
                      center.y - (diff * (circle.x - this.x)) / dist),
            new Point(center.x - (diff * (circle.y - this.y)) / dist,
                      center.y + (diff * (circle.x - this.x)) / dist)]
  }
}
