
var LayerSizeException = {};


function sigmoid(t) {
    return 1/(1+Math.exp(-t));
}


function muteFunction(old, muteStrength)
{
  mod = map(randomG(4), 0.0, 1.0, 1-muteStrength/10, 1+muteStrength/10);
  return old * mod;
}

class Neural
{
  constructor(layerSizes)
  {
    this.layers = [];
    this.weights = [];
    this.biais = [];

    if(layerSizes.length < 2)
    {
      throw LayerSizeException;
    }

    //Layers creation
    for(let i = 0; i < layerSizes.length; i++)
    {
      this.layers.push([]);

      for(let j = 0; j < layerSizes[i]; j++)
      {
        this.layers[i].push(undefined);
      }
    }
  }


  displayW()
  {
    let inBox = "<div style='background-color: red; width: 100%; height: 30px;'>";
    let outBox = "</div>";

    document.getElementById("disp1").innerHTML = "<br><br>";
    document.getElementById("disp2").innerHTML = "";
    document.getElementById("disp3").innerHTML = "<br>";
    document.getElementById("disp4").innerHTML = "";
    document.getElementById("disp5").innerHTML = "<br>";
    document.getElementById("disp6").innerHTML = "";
    document.getElementById("disp7").innerHTML = "";


    //console.log(this.inputLayer);
    /*document.getElementById("disp1").innerHTML += this.inputLayer.join("<br><br><br><br><br><br><br>");
    document.getElementById("disp2").innerHTML += this.inputWeight.map(e => e.join('<br>')).join('<br><hr>');
    document.getElementById("disp3").innerHTML += this.hiddenLayers[0].join("<br><br><br><br><br>");
    document.getElementById("disp4").innerHTML += this.weight[0].map(e => e.join('<br>')).join('<br><hr>');
    document.getElementById("disp5").innerHTML += this.hiddenLayers[1].join("<br><br><br><br>");
    document.getElementById("disp6").innerHTML += this.outputWeight.map(e => e.join('<br>')).join('<br><hr>');
    document.getElementById("disp7").innerHTML += this.outputLayer.join("<br><br>");*/
  }


  genWeight()
  {
    this.weights = [];
    this.biais = [];

    //Hidden layers
    for(let i = 0; i < this.layers.length-1; i++)
    {
      this.weights.push([]);
      this.biais.push(0);

      for(let j = 0; j < this.layers[i].length; j++)
      {
        this.weights[i].push([]);

        for(let k = 0; k < this.layers[i+1].length; k++)
        {
          this.weights[i][j].push(randomG(4)-0.5);
        }
      }
    }
  }


  muteWeight(baseWeights, baseBiais, muteStrength, ratio)
  {
    this.weights = baseWeights;
    this.biais = baseBiais;

    let all = 0;
    let changes = 0;

    //Hidden layers
    for(let i = 0; i < this.weights.length; i++)
    {
      for(let j = 0; j < this.weights[i].length; j++)
      {
        for(let k = 0; k < this.weights[i][j].length; k++)
        {
          all+=1;
          if(Math.random() < ratio/100)
          {
            changes+=1;
            this.weights[i][j][k] = muteFunction(this.weights[i][j][k], muteStrength);
          }
        }
      }
      all+=1;
      if(Math.random() < ratio/100)
      {
        changes+=1;
        this.biais[i] = this.biais[i]+randomG(2)-0.5;
      }
    }
    //console.log(changes/all*100);
  }


  processCommand(input)
  {
    //Insert data
    for(let i = 0; i < this.layers[0].length; i++)
    {
      this.layers[0][i] = input[i];
    }

    //Layers propag
    for(let i = 1; i < this.layers.length; i++)
    {
      for(let j = 0; j < this.layers[i].length; j++)
      {
        this.layers[i][j] = 0;

        for(let k = 0; k < this.layers[i-1].length; k++)
        {
          this.layers[i][j] += this.layers[i-1][k] * this.weights[i-1][k][j];
        }

        this.layers[i][j] += this.biais[i-1];
      }
      //Normalize hidden layer
      for(let j = 0; j < this.layers[i].length; j++)
      {
        this.layers[i][j] = sigmoid(this.layers[i][j]);
      }
    }

    return maxValueIndex(this.layers[this.layers.length-1]);
  }
}





















//.
