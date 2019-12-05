const width = 500;
const letters = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']

const randomLetters = () => {
  let numLetters = Math.floor(Math.random() * 26) + 1
  let randLetters = [];
  for (let i = 1; i <= numLetters; i++) {
    randLetters.push(letters[Math.floor(Math.random() * 26)])
  }
  return randLetters;
}

const svg = d3.select("svg")
              .attr("width", width)
              .attr("height", 33)
              .attr("viewBox", `0 -20 ${width} 33`);


const createElementsFromNothing = () => {
  // .join handles update, enter, and exit all in one
  // adds entered elements to update and removes exited elements
  svg.selectAll("text")
      .data(randomLetters())
      .join("text")
      .attr("x", (d, i) => i * 16)
      .text(d => d);

  return svg.node();
}

// createElementsFromNothing()

// this is a generator function
// each call of .next().value in the interval below
// runs next iteration of the loop
function* joinEvery2Seconds() {
  while (true) {
    svg.selectAll("text")
        .data(randomLetters())
        .join("text")
        .attr("x", (d, i) => i * 16)
        .text(d => d);

    yield
  }
}

const join = joinEvery2Seconds()
setInterval(() => join.next().value, 2000)
