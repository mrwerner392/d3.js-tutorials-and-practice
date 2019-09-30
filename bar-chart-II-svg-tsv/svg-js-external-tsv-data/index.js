// Downloading an external 'tsv' (tab-seperated values) file is asynchronous,
// so anything that requires the data must be done inside the 'd3.tsv' function

// These things can be done before we get data
const width = 420;
const barHeight = 20;

const x = d3.scale.linear()
                  .range([0, width]);

const chart = d3.select(".chart")
                .attr("width", width);

// Download external tsv file with d3.tsv()
// tsv files will look be an array of hashes, and the keys in each hash
// are the column headers
// We use the second argument here to turn the strings of the values into numbers
// When testing this locally need to open local http server with 'http-server &'
      // In 'svg-js-external-tsv-data' directory
      // Gives us access to the data
      // Also had to get chrome extension to allow CORS locally

// This is all equivalent to writing:
      // ds.tsv(....)
      //   .row(type)
      //   .get(callback)
      
d3.tsv("http://localhost:8080/svg-js-external-tsv-data/data/data.tsv", type, function(error, data) {

  // Add domain to our scaling function x()
  // Domain is the data dependent part of the function
  // Note the syntax for finding the max of 'value' key in the array of hashes
  x.domain([0, d3.max(data, function(d) { return d.value; })]);

  chart.attr("height", barHeight * data.length);

  const bar = chart.selectAll("g")
                    .data(data)
                    .enter().append("g")
                    .attr("transform", function(d, i) { return "translate(0," + i * barHeight + ")"; });

  bar.append("rect")
      .attr("width", function(d) { return x(d.value); })
      .attr("height", barHeight - 1);

  bar.append("text")
      .attr("x", function(d) { return x(d.value) - 3; })
      .attr("y", barHeight / 2)
      .attr("dy", ".35em")
      .text(function(d) { return d.value; });
});

function type(d) {
  d.value = +d.value; // coerce to number
  return d;
}
