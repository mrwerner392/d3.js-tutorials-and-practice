// Will hold the map coordinates (which come from an external API)
var geojson = {}

// Establish a 2-dimensional rendering context (as opposed to webgl which is 3d)
// Need .node() to turn the d3.select() into an HTML node
// .getContext defines the rendering context
var context = d3.select('#content canvas')
  .node()
  .getContext('2d');

// Projects sphere onto plane
// Many different options, geoOrthographic maintains sphere appearance
// Scale is the size of the projection
var projection = d3.geoOrthographic()
  .scale(300);

// Function to define a drawing path
var geoGenerator = d3.geoPath()
  .projection(projection)
  .pointRadius(4)
  .context(context);

// Defines where rotation begins from
var yaw = 300;

function update() {
  // Initializes how much the projection is rotated
  // Inputs are [x-rotation, y-rotation]
  projection.rotate([yaw, -45])

  // Clears out the canvas every time, otherwise lines turn into streaks
  // Inputs are (x, y, width, height), which match our canvas right now
  context.clearRect(0, 0, 800, 600);

  // Thickness and color respectively of lines of the map
  context.lineWidth = 0.5;
  context.strokeStyle = '#333';

  // Initializes new path, in this case the lines of the map
  context.beginPath();
  // Defines the path, geoGenerator defined above
  geoGenerator({type: 'FeatureCollection', features: geojson.features})
  // Actually draws the path
  context.stroke();

  // Graticule
  // Creates the grid
  var graticule = d3.geoGraticule();
  context.beginPath();
  context.strokeStyle = '#ccc';
  geoGenerator(graticule());
  context.stroke();

  // On next update the projection will be slightly more rotated
  // Higher number ==> faster rotation
  yaw -= 0.2;
}



// REQUEST DATA
// This API contains the coordinates that draw the lines of the map
d3.json('https://gist.githubusercontent.com/d3indepth/f28e1c3a99ea6d84986f35ac8646fac7/raw/c58cede8dab4673c91a3db702d50f7447b373d98/ne_110m_land.json', function(err, json) {
  geojson = json;
  window.setInterval(update, 100);
})
