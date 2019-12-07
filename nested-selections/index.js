
// produce the same group of elements
// td2 is convenient because you can get multiple subgroubs
// of elements from the same parent
const td1 = d3.selectAll("tbody td"); // parent is html
const td2 = d3.select("tbody").selectAll("td"); // parent is tbody

// to group all 'td's by 'tr's
const td3 = d3.selectAll('tbody tr').selectAll('td') // multiple groups of tds with trs as parents

// color first column (td index 0 for each tr) red
td3.style("color", function(d, i) { return i ? null : "red"; });
