
function download(filename, text) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}



function imp(){
  objs = [];
  hive = [];

  var fileToLoad = document.getElementById("fileToLoad").files[0];

  var fileReader = new FileReader();
  fileReader.onload = function(fileLoadedEvent){
      var textFromFileLoaded = fileLoadedEvent.target.result;

      console.log(textFromFileLoaded)

      var data = JSON.parse(textFromFileLoaded);
        data.forEach(item => {
        var obj;

        if(item.type == "line")
        {
          obj = Object.assign(new Line, item);
          objs.push(obj);
        }
        else if(item.type == "polyrect")
        {
          obj = Object.assign(new PolyRect, item);
          objs.push(obj);
        }
        else if(item.type == "simplerect")
        {
          obj = Object.assign(new SimpleRect, item);
          objs.push(obj);
        }
        else if(item.type == "polygon")
        {
          obj = Object.assign(new Polygon, item);
          objs.push(obj);
        }
        else if(item.type == "hexagon")
        {
          obj = Object.assign(new Hexagon, item);
          objs.push(obj);
        }
      });
      //JSON.parse(json: string, reviver?: fn(key: string, value: ?))
      //var aa = Object.assign(new Hexagon, {"color":"yellow","bColor":"white","bSize":2,"x":366,"y":143.39745962155612,"points":[416,230,366,316.6025403784439,266,316.6025403784439,216,230,266,143.39745962155612],"centerX":316,"centerY":230});
      //objs.push(aa);
  };

  fileReader.readAsText(fileToLoad, "UTF-8");
}

function exp() {
  let content;

  content = JSON.stringify(objs.concat(hive));


  let date = new Date();
  let offset = date.getTimezoneOffset() * 60 * 1000;

  let dateLocal = new Date((new Date).getTime() - offset);

  let iso = dateLocal.toISOString().replace(":", "-").replace(":", "-").replace("T", "_").slice(0, 19);

  download(iso, content);
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
  return Math.asin(rapport)*(180*Math.PI);
}

function macos(rapport)
{
  return Math.acos(rapport)*(180*Math.PI);
}

function matan(rapport)
{
  return Math.atan(rapport)*(180*Math.PI);
}
