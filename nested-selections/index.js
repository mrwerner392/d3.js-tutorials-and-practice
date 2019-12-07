
// produce the same group of elements
// td2 is convenient because you can get multiple subgroubs
// of elements from the same parent
const td1 = d3.selectAll("tbody td"); // parent is html
const td2 = d3.select("tbody").selectAll("td"); // parent is tbody

// to group all 'td's by 'tr's
const td3 = d3.selectAll('tbody tr').selectAll('td') // multiple groups of tds with trs as parents

// color first column (td index 0 for each tr) red
td3.style("color", function(d, i) { return i ? null : "red"; });

// 4x4 matrix of data (matches 4 groups of trs with 4 tds each)
const matrix = [
  [ 0,  1,  2,  3],
  [ 4,  5,  6,  7],
  [ 8,  9, 10, 11],
  [12, 13, 14, 15],
];

// binding matrix of data to groups of elements
// bind entire matrix (array of 4 elements) to selection of trs
const td = d3.selectAll("tbody tr")
                .data(matrix)
              // bind each element of the data (itself an array
              // of 4 elements) to the subselection of tds
              // total of 16 data points for 16 tds
              .selectAll("td")
                .data(function(d, i) { return d; }); // d is matrix[i]

// // APPENDING ELEMENTS
// // selectAll sets the parent node. cannot append to a
// // selection whose parent node is the html
// // this will error out:
// d3.selectAll("table tr") // parent is html
//   .data(matrix)
//   .enter().append("tr"); // error!

// // need to nest selections first
// d3.select('table').selectAll('tr')
//   .data(matrix)
//   .enter().append('tr') // success

// CREATE TABLE FROM SCRATCH
