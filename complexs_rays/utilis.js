

function imp(){
  savedObjects = [];

  var fileToLoad = document.getElementById("fileToLoad").files[0];

  var fileReader = new FileReader();
  fileReader.onload = function(fileLoadedEvent)
  {
    var textFromFileLoaded = fileLoadedEvent.target.result;

    var data = JSON.parse(textFromFileLoaded);

    data.forEach(item => {

      if(item.radius != undefined)
      {
        savedObjects.push(Object.assign(new Circle, item));
      }
      else
      {
        savedObjects.push(Object.assign(new Cluster(item.clust), item));
      }
    });
  };

  fileReader.readAsText(fileToLoad, "UTF-8");
}

function exp() {
  let content;

  content = JSON.stringify(savedObjects.concat(hive));


  let date = new Date();
  let offset = date.getTimezoneOffset() * 60 * 1000;

  let dateLocal = new Date((new Date).getTime() - offset);

  let iso = dateLocal.toISOString().replace(":", "-").replace(":", "-").replace("T", "_").slice(0, 19);


  //Creation action element
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
  element.setAttribute('download', iso);
  element.style.display = 'none';

  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}

function compare(a, b) {
  if (a.angle > b.angle) return 1;
  if (b.angle > a.angle) return -1;

  return 0;
}


function distance(x1, y1, x2, y2) {
  var xDist = Math.abs(Math.max(x1, x2) - Math.min(x1, x2));
  var yDist = Math.abs(Math.max(y1, y2) - Math.min(y1, y2));
  return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
}

function map(x, in_min, in_max, out_min, out_max)
{
  return (x-in_min) * (out_max-out_min) / (in_max-in_min)+out_min;
}

function mRound(nb, prec = 0)
{
  return Math.round(nb * Math.pow(10, 2)) / Math.pow(10, 2);
}

function pEqual(p1, p2)
{
  if(p1.x == p2.x && p1.y == p2.y)
  {
    return true;
  }
  else
  {
    return false;
  }
}

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
