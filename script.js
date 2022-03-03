//script.js
"use strict";
/** @type { [
 * HTMLButtonElement,
 * HTMLInputElement,
 * HTMLInputElement,
 * HTMLInputElement,
 * HTMLInputElement,
 * HTMLSelectElement,
 * HTMLCanvasElement]} */
let [
  button,
  w1Input,
  w2Input,
  thresholdInput,
  nInput,
  activationFnSelect,
  canvas,
] = [
  "actionButton",
  "w1",
  "w2",
  "threshold",
  "n",
  "activationFn",
  "canvas",
].map((id) => document.getElementById(id));
let context = canvas.getContext("2d");
let scale = 50;
let environment = new Environment(context, scale);
let coordinatesTranslator = new CoordinatesTranslator(
  canvas.width,
  canvas.height
);
let values = [-0.4, 0.4, 0.4];
let environmentRenderer = new EnvironmentRenderer(
  canvas,
  coordinatesTranslator,
  environment,
  scale
);

function mutateLine() {
  let line = new Line(w1Input.value, w2Input.value, thresholdInput.value);
  environment.line = line;
}
mutateLine();

[w1Input, w2Input, thresholdInput].forEach((input) => {
  input.addEventListener("change", () => {
    mutateLine();
  });
});
setValues();
let isWorking = false;
button.addEventListener("click", async () => {
  if (!isWorking) {
    isWorking = true;
    let trainer = new Trainer(
      nInput.value,
      1000,
      (newWeights) => {
        values = [...newWeights];
        setValues();
        mutateLine();
        environment.classify();
      },
      () => {
        isWorking = false;
      },
      scale,
      +activationFnSelect.value,
      activationFnSelect.value == 3 ? 0.15 : 0.05
    );
    await trainer.train(environment.points, values);
  }
});

// setInterval(() => {
//   environment.classify();
// }, 1000);

function setValues() {
  thresholdInput.value = -values[0];
  w1Input.value = values[1];
  w2Input.value = values[2];
}

function getCursorPosition(canvas, event) {
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  return [x, y];
}
canvas.addEventListener("click", (event) => {
  if (!isWorking) {
    putPoint(event, CLASS_A);
  }
});
canvas.addEventListener("contextmenu", (event) => {
  if (!isWorking) {
    event.preventDefault();
    putPoint(event, CLASS_B);
  }
});
function putPoint(event, classe) {
  let [xC, yC] = getCursorPosition(canvas, event);
  let [x, y] = coordinatesTranslator.canvasToMath(xC, yC);
  let point = new Point(x, y, classe, null);
  environment.addPoint(point);
}
