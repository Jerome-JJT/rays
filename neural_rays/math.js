function mNaN(n)
{
  return isNaN(n) ? 0 : n;
}

function msin(angle)
{
  return Math.sin(angle/(180/Math.PI));
}

function mcos(angle)
{
  return Math.cos(angle/(180/Math.PI));
}

function mtan(angle)
{
  return Math.tan(angle/(180/Math.PI));
}

function masin(rapport)
{
  return Math.asin(rapport)*(180/Math.PI);
}

function macos(rapport)
{
  return Math.acos(rapport)*(180/Math.PI);
}

function matan(rapport)
{
  return Math.atan(rapport)*(180/Math.PI);
}

function matan2(y,x)
{
  return Math.atan2(y,x)*(180/Math.PI);
}


function compare(a, b) {
  if (a.angle > b.angle) return 1;
  if (b.angle > a.angle) return -1;

  return 0;
}

function randomG(v){
  var r = 0;
  for(var i = v; i > 0; i --){
      r += Math.random();
  }
  return r / v;
}


function distance(x1, y1, x2, y2) {
  var xDist = Math.abs(Math.max(x1, x2) - Math.min(x1, x2));
  var yDist = Math.abs(Math.max(y1, y2) - Math.min(y1, y2));
  return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
}

function map(x, in_min, in_max, out_min, out_max)
{
  return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

function mRound(nb, prec = 0)
{
  return Math.round(nb * Math.pow(10, 2)) / Math.pow(10, 2);
}
