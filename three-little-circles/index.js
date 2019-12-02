
// select all the 'circle' elements from the DOM
let circle = d3.selectAll("circle");

// change the color of each circle
circle.style("fill", "steelblue");

// change the radius of each circle
circle.attr("r", 30);

// // use a function to update the x coordinate of each circle
// circle.attr("cx", function() { return Math.random() * 720; });

// bind data to the circles
circle.data([32, 57, 112]);

// use bound data to update attribute of circles
// data represented by 'd' below
circle.attr("r", function(d) { return Math.sqrt(d); });

// can also access the circle's index as second argument
circle.attr("cx", function(d, i) { return i * 100 + 30; });

//---------------------------

// if we bind more data than we have elements, we can access leftover
// data with .enter(), then can add elements for those data
  // new elements appended to parent, so we select parent
  // first, then all desired children of the parent, then
  // bind the children to data, at which point we may have
  // leftover data for which we can append new elements

// select parent
const svg = d3.select("svg");

// select children and bind data
circle = svg.selectAll("circle")
    .data([32, 57, 112, 293]);

// can use .size() to find length of selection and of leftover data
console.log(circle.size()); // => 3
console.log(circle.enter().size()); // => 1

// append new element for leftover data
const circleEnter = circle.enter().append("circle");
circleEnter.style("fill", "steelblue");
circleEnter.attr("cy", 60);
circleEnter.attr("cx", function(d, i) { return i * 100 + 30; });
circleEnter.attr("r", function(d) { return Math.sqrt(d); });

// // NOTE: using .enter().append() will append new element for each extra data
//   // fairly common for ALL data to be leftover, in which case you might
//   // see the following pattern

//   svg.selectAll("circle")
//      .data([32, 57, 112, 293])
//      .enter()
//      .append("circle")
//      .attr("cy", 60)
//      .attr("cx", function(d, i) { return i * 100 + 30; })
//      .attr("r", function(d) { return Math.sqrt(d); });

// can remove extra elements with .exit()
circle = svg.selectAll("circle")
            .data([32, 57]);
circle.exit().remove();
