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
  console.log(response.index);
  // response = { element, direction, index }

  // add color to current step only
  step.classed("is-active", function (d, i) {
    return i === response.index;
  });
  d3.select(`#step${response.index}`)
  .select("p")
  .text("hello");

  // update graphic based on step
  figure.select("p").text(`${response.index + 1}, ${response.direction}`);
}
function handleStepExit(response) {
    // response = { element, direction, index }
  
    // add color to current step only
    step.classed("is-active", function (d, i) {
      return i === response.index;
    });
    d3.select(`#step${response.index}`)
    .select("p")
    .text("bye");
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
