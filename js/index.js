// DOM Elements
const container = d3.select("#scroll");
const figure = container.select("figure");
const article = container.select("article");
const step = article.selectAll(".step");

// initialize the scrollama
const scroller = new scrollama();

// generic window resize listener event
function handleResize() {
  // 1. update height of step elements
  const stepHeight = Math.floor(window.innerHeight * 0.75);
  step.style("height", stepHeight + "px");

  // 2. update width/height of graphic element
  const bodyWidth = d3.select("body").node().offsetWidth;

  const figureHeight = Math.floor(window.innerHeight * 0.5);
  figure.style("height", figureHeight + "px");
  // 3. tell scrollama to update new element dimensions for responsiveness
  scroller.resize();
}

// scrollama event handlers
function handleStepEnter(response) {
  // response = { element, direction, index }
  const index = response.index;
  const currentElement = d3.select(`#step${index}`);
  // For each step, different stuff happens:
  switch (index) {
    case 0:
      // Write what should happen when scroll to the first step
      currentElement.select("p").text("hello");
      currentElement.style("background-color", "pink");
      break;
    case 1:
      currentElement.select("p").text("how are you?");
      currentElement.style("background-color", "blue");
      break;
    case 2:
      currentElement.select("p").text("it's okay");
      currentElement.style("background-color", "grey");
      break;
    case 3:
      currentElement.select("p").text("sure");
      currentElement.style("background-color", "yellow");
      break;
  }

  // If a certain action what happens for all steps in a universal way,
  // this would be a better way to organize the code.
  figure.select("p").text(`${index + 1}, ${response.direction}`);
}
function handleStepExit(response) {
  // response = { element, direction, index }
  const index = response.index;
  const currentElement = d3.select(`#step${index}`);
  switch (index) {
    case 0:
      // Write what should happen when exit the first step
      currentElement.select("p").text("?");
      break;
    case 1:
      currentElement.select("p").text("??");
      break;
    case 2:
      currentElement.select("p").text("???");
      break;
    case 3:
      currentElement.select("p").text("?????");
      break;
  }

  currentElement.style("background-color", "white");
  // update graphic based on step
  figure.select("p").text(`${response.index + 1}, ${response.direction}`);
}

function init() {
  // 1. force a resize on load to ensure proper dimensions are sent to scrollama
  handleResize();

  // 2. setup the scroller passing options
  // this will also initialize trigger observations
  // 3. bind scrollama event handlers (this can be chained like below)
  scroller
    .setup({
      step: "article .step",
      debug: true,
      offset: 0.5,
    })
    .onStepEnter(handleStepEnter)
    .onStepExit(handleStepExit);

  // setup resize event
  window.addEventListener("resize", handleResize);
}

// kick things off
init();
