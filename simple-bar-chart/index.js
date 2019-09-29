var data = [30, 86, 168, 281, 303, 365];

// Find max data number, used for styling below
let max = Math.max(...data)

// First selects the div with class "chart"
// Calling on d3 object, which we had because of the script in our HTML
d3.select('.chart')
  // No divs within chart div yet, so this gives us an empty thing
  .selectAll('div')
  // .data is expecting to receive our data, adds some keys
  // like "_enter" and "_exit" to our previously empty thing
  .data(data)
  // Everything that follows will be done six times --
  // Once for each of our data points
    // .enter() is necessary to create new things on the dom
    // Sort of acts like a placeholder, without it we will see nothing
    .enter()
    // Fill the placeholder with a div
    .append('div')
    // Change width of each div depending on data point
    .style('width', function(d) { return d + 'px' })
    // Change the text of each div depending on data point
    .text(function(d) { return d })
    // My own addition
    .style('background-color', function (d) { return `rgba(${d * 255 / max}, 0, 0)`})

// Can play around with the return values in the .style and .text
// Maybe we could double the width using d * 2
// Maybe we could add a unit to the text with '$' + d
// Maybe we could use d to add color to each bar, d impacting the rgb color values
