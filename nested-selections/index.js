
// produce the same group of elements
// td2 is convenient because you can get multiple subgroubs
// of elements from the same parent
const td1 = d3.selectAll("tbody td");
const td2 = d3.select("tbody").selectAll("td");
