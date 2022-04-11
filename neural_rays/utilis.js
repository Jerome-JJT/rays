
function playerTriangle(pos, baseAn)
{
  let p1 = pos;

  let p2 = new Point(undefined, undefined);
  let p3 = new Point(undefined, undefined);;

  let an = 40;
  let size = 20;

  p2.x = p1.x + mcos((baseAn+an+270)%360) * size;
  p2.y = p1.y + msin((baseAn+an+270)%360) * size;

  p3.x = p1.x + mcos((baseAn-an+270)%360) * size;
  p3.y = p1.y + msin((baseAn-an+270)%360) * size;

  return [p1, p2, p3]
}



function processRays(cRays, objs)
{
  let resRays = [];

  //For each rays finds nearest cross segment form origin
  cRays.forEach(cRay => {
    cRay.score = Infinity;

    let closestCross = undefined;

    objs.forEach(obj => {
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

    resRays.push(cRay);
  });

  return resRays;
}



//Get best output layer command
function maxValueIndex(array)
{
  return array.indexOf(Math.max.apply(null, array));
}

/*function pEqual(p1, p2)
{
  if(p1.x == p2.x && p1.y == p2.y)
  {
    return true;
  }
  else
  {
    return false;
  }
}*/

/*function* pseudoRandom(seed) {
  let value = seed;

  while(true) {
    value = (value * 16807 % 2147483647);
    yield value;
  }
};^*/


function arrcopy(array)
{
  return JSON.parse(JSON.stringify(array));
}

function getTime()
{
  return ("0"+(new Date()).getHours()).slice(-2)+":"+("0"+(new Date()).getMinutes()).slice(-2)+":"+("0"+(new Date()).getSeconds()).slice(-2);
}

/*
function* pseudoRandom(seed)
{
  let seedKey = xmur3(seed);
  let rand = mulberry32(seedKey());

  while(true) {
    yield rand();
  }
}
function xmur3(str) {
  for(var i = 0, h = 1779033703 ^ str.length; i < str.length; i++)
      h = Math.imul(h ^ str.charCodeAt(i), 3432918353),
      h = h << 13 | h >>> 19;
  return function() {
      h = Math.imul(h ^ h >>> 16, 2246822507);
      h = Math.imul(h ^ h >>> 13, 3266489909);
      return (h ^= h >>> 16) >>> 0;
  }
}
function mulberry32(a) {
  return function() {
    var t = a += 0x6D2B79F5;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  }
}
*/

/*function angleDiff(an1, an2)
{
  if(an1-an2 <= 180 && an1-an2 >= -180)
  {
    return an1-an2;
  }
  else if(an1-an2 > 180)
  {
    return (an1-an2)-360;
  }
  else
  {
    return 360+(an1-an2);
  }
}*/
