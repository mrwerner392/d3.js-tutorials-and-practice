// Benefit of creating svg elements here is we can dynamically
// set the dimensions based on the data and this is scalable to
// much larger data sets

const data = [4, 8, 15, 16, 23, 42];

// Set width for scaling
const width = 420;
const barHeight = 20;

// Function for scaling (typeof x = "function")
const x = d3.scale.linear()
                  .domain([0, d3.max(data)])
                  .range([0, width]);

// Set height and width attributes of chart
const chart = d3.select('.chart')
                .attr('width', width)
                .attr('height', barHeight * data.length)

// "bar" will be an array of 6 'g' elements (one for each data point)
const bar = chart.selectAll('g')
                 .data(data)
                 .enter()
                 .append('g')
                 // Translate each g element vertically so that it is below the previous 'g'
                 // Notice the difference between this and regular HTML 'div' elements, where
                 // we just had to create a new 'div' and it positioned itself below the previous
                 // one automatically
                 .attr("transform", function(d, i) {return "translate(0," + i * barHeight + ")"; })

// Append a 'rect' element to each 'g' element in 'bar' with determined height/width
// This is each "bar" in the bar chart
bar.append('rect')
   .attr("width", x)
   .attr("height", barHeight - 1)

// Append a 'text' element to each 'g' element in 'bar'
// Position text and determine what text says
bar.append("text")
   .attr("x", function(d) { return x(d) - 3; })
   .attr("y", barHeight / 2)
   .attr("dy", ".35em")
   .text(function(d) { return d; });
