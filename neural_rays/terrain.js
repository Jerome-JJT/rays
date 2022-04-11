

function terrain1()
{
  savedObjects = [];
  objectives = [];

  savedObjects.push(new Segment(1, 2, canevas.width-1, 2));
  savedObjects.push(new Segment(canevas.width-2, 2, canevas.width-2, canevas.height-1));
  savedObjects.push(new Segment(canevas.width-1, canevas.height-2, 1, canevas.height-2));
  savedObjects.push(new Segment(2, 1, 2, canevas.height-1));



  savedObjects.push(new Cluster([new Point(80, 80), new Point(80, 200), new Point(400, 80)],
                                 "blue", "white", 1));

  savedObjects.push(new Rect(500, 80, 100, 399, "green"));
  savedObjects.push(new Rect(280, 380, 400, 100, "purple"));

  //savedObjects.push(new Circle(0, 400, 75, "yellow"));
  savedObjects.push(new Polygon(0, 800, 130, 20, 0, "yellow"));

  savedObjects.push(new Segment(400, 660, 400, 800, "cyan"));

  return {terrain: savedObjects, objectives: objectives};
}

function terrain2()
{
  savedObjects = [];
  objectives = [];

  savedObjects.push(new Segment(1, 2, canevas.width-1, 2));
  savedObjects.push(new Segment(canevas.width-2, 2, canevas.width-2, canevas.height-1));
  savedObjects.push(new Segment(canevas.width-1, canevas.height-2, 1, canevas.height-2));
  savedObjects.push(new Segment(2, 1, 2, canevas.height-1));


  savedObjects.push(new Cluster([new Point(0, 0), new Point(0, 120), new Point(240, 0)],
                                 "blue", "white", 1));

  savedObjects.push(new Rect(0, 100, 15, 400, "red"));

  savedObjects.push(new Rect(135, 150, 400, 100, "purple"));
  savedObjects.push(new Rect(330, 0, 50, 60, "green"));

  savedObjects.push(new Rect(460, 90, 50, 60, "green"));

  savedObjects.push(new Segment(675, 180, 675, 550, "cyan"));
  savedObjects.push(new Polygon(800, 0, 80, 20, 0, "yellow"));

  savedObjects.push(new Rect(375, 420, 300, 130, "purple"));

  savedObjects.push(new Polygon(575, 675, 60, 20, 0, "yellow"));
  savedObjects.push(new Cluster([new Point(400, 500), new Point(475, 610), new Point(350, 590)],
                                 "blue", "white", 1));

  savedObjects.push(new Rect(180, 250, 80, 325, "red"));

  savedObjects.push(new Rect(400, 350, 50, 80, "green"));

  //savedObjects.push(new Rect(500, 80, 100, 399, "green"));
  //savedObjects.push(new Rect(280, 380, 400, 100, "purple"));

  //savedObjects.push(new Circle(0, 400, 75, "yellow"));
  savedObjects.push(new Polygon(150, 620, 75, 20, 0, "yellow"));
  savedObjects.push(new Rect(160, 640, 80, 80, "red"));


  checkpointWidth = 3;

  objectives.push(new Segment(5, 200, 200, 200, "lime", checkpointWidth));
  objectives.push(new Segment(150, 30, 200, 200, "lime", checkpointWidth));
  objectives.push(new Segment(350, 0, 350, 200, "lime", checkpointWidth));
  objectives.push(new Segment(520, 0, 520, 200, "lime", checkpointWidth));
  objectives.push(new Segment(500, 240, 800, 240, "lime", checkpointWidth));
  objectives.push(new Segment(250, 240, 800, 750, "lime", checkpointWidth));
  objectives.push(new Segment(250, 550, 400, 800, "lime", checkpointWidth));
  objectives.push(new Segment(0, 600, 175, 600, "lime", checkpointWidth));

  objectives.push(new Segment(0, 420, 200, 420, "white", checkpointWidth));


  objectives.push(new Segment(5, 190, 200, 190, "red", checkpointWidth));
  objectives.push(new Segment(160, 30, 210, 200, "red", checkpointWidth));
  objectives.push(new Segment(360, 0, 360, 200, "red", checkpointWidth));
  objectives.push(new Segment(530, 0, 530, 200, "red", checkpointWidth));
  objectives.push(new Segment(500, 250, 800, 250, "red", checkpointWidth));
  objectives.push(new Segment(240, 240, 800, 760, "red", checkpointWidth));
  objectives.push(new Segment(240, 550, 390, 800, "red", checkpointWidth));
  objectives.push(new Segment(0, 590, 175, 590, "red", checkpointWidth));

  objectives.push(new Segment(0, 410, 200, 410, "white", checkpointWidth));


  return {terrain: savedObjects, objectives: objectives};
}

function terrain2_rev()
{
  savedObjects = [];
  objectives = [];

  savedObjects.push(new Segment(1, 2, canevas.width-1, 2));
  savedObjects.push(new Segment(canevas.width-2, 2, canevas.width-2, canevas.height-1));
  savedObjects.push(new Segment(canevas.width-1, canevas.height-2, 1, canevas.height-2));
  savedObjects.push(new Segment(2, 1, 2, canevas.height-1));


  savedObjects.push(new Cluster([new Point(0, 0), new Point(0, 120), new Point(240, 0)],
                                 "blue", "white", 1));

  savedObjects.push(new Rect(0, 100, 15, 400, "red"));

  savedObjects.push(new Rect(135, 150, 400, 100, "purple"));
  savedObjects.push(new Rect(330, 0, 50, 60, "green"));

  savedObjects.push(new Rect(460, 90, 50, 60, "green"));

  savedObjects.push(new Segment(675, 180, 675, 550, "cyan"));
  savedObjects.push(new Polygon(800, 0, 80, 20, 0, "yellow"));

  savedObjects.push(new Rect(375, 420, 300, 130, "purple"));

  savedObjects.push(new Polygon(575, 675, 60, 20, 0, "yellow"));
  savedObjects.push(new Cluster([new Point(400, 500), new Point(475, 610), new Point(350, 590)],
                                 "blue", "white", 1));

  savedObjects.push(new Rect(180, 250, 80, 325, "red"));

  savedObjects.push(new Rect(400, 350, 50, 80, "green"));

  //savedObjects.push(new Rect(500, 80, 100, 399, "green"));
  //savedObjects.push(new Rect(280, 380, 400, 100, "purple"));

  //savedObjects.push(new Circle(0, 400, 75, "yellow"));
  savedObjects.push(new Polygon(150, 620, 75, 20, 0, "yellow"));
  savedObjects.push(new Rect(160, 640, 80, 80, "red"));


  checkpointWidth = 3;

  objectives.push(new Segment(5, 200, 200, 200, "lime", checkpointWidth));
  objectives.push(new Segment(150, 30, 200, 200, "lime", checkpointWidth));
  objectives.push(new Segment(350, 0, 350, 200, "lime", checkpointWidth));
  objectives.push(new Segment(520, 0, 520, 200, "lime", checkpointWidth));
  objectives.push(new Segment(500, 240, 800, 240, "lime", checkpointWidth));
  objectives.push(new Segment(250, 240, 800, 750, "lime", checkpointWidth));
  objectives.push(new Segment(250, 550, 400, 800, "lime", checkpointWidth));
  objectives.push(new Segment(0, 600, 175, 600, "lime", checkpointWidth));

  objectives.push(new Segment(0, 420, 200, 420, "white", checkpointWidth));


  objectives.push(new Segment(5, 190, 200, 190, "red", checkpointWidth));
  objectives.push(new Segment(160, 30, 210, 200, "red", checkpointWidth));
  objectives.push(new Segment(360, 0, 360, 200, "red", checkpointWidth));
  objectives.push(new Segment(530, 0, 530, 200, "red", checkpointWidth));
  objectives.push(new Segment(500, 250, 800, 250, "red", checkpointWidth));
  objectives.push(new Segment(240, 240, 800, 760, "red", checkpointWidth));
  objectives.push(new Segment(240, 550, 390, 800, "red", checkpointWidth));
  objectives.push(new Segment(0, 590, 175, 590, "red", checkpointWidth));

  objectives.push(new Segment(0, 410, 200, 410, "white", checkpointWidth));


  return {terrain: savedObjects, objectives: objectives};
}
