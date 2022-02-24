//environment.js
class Environment extends Renderable {
  /**
   * @type { Line }
   */
  #currentLine;
  /**
   * @type { Point[] }
   */
  #points;
  #scale;
  constructor(reRenderCallback, scale) {
    super(reRenderCallback);
    this.#currentLine = null;
    this.#points = [];
    this.#scale = scale;
  }
  set line(value) {
    this.#currentLine = value;
    this.reRender();
  }
  /**
   * @type {Line}
   */
  get line() {
    return this.#currentLine;
  }
  /**
   * @param {Point} point
   */
  addPoint(point) {
    point.reRenderCallback = super.reRenderCallback;
    this.#points.push(point);
    this.reRender();
  }
  removePointAt(index) {
    this.#points.splice(index, 1);
    this.reRender();
  }
  #cleanPoints() {
    this.#points = [];
    this.reRender();
  }
  get points() {
    return this.#points;
  }
  clean() {
    this.line = null;
    this.#cleanPoints();
  }

  classify() {
    this.#points.forEach((point) => {
      let current = new Point(
        point.x / this.#scale,
        point.y / this.#scale,
        point.clas
      );
      let neuronCalculator = new NeuronCalculator();
      let calculation = neuronCalculator.calculateNeuronOuput(current, [
        -this.#currentLine.threshold,
        this.#currentLine.w1,
        this.#currentLine.w2,
      ]);
      let clas;
      if (calculation[0] == 0) {
        clas = CLASS_A;
      } else {
        clas = CLASS_B;
      }
      point.clas = clas;
    });
    this.reRender();
  }

  /**
   * @param {any} value
   */
  set reRenderCallback(value) {
    this.#points.forEach((point) => (point.reRenderCallback = value));
    if (this.#currentLine) {
      this.#currentLine.reRenderCallback = value;
    }
    super.reRenderCallback = value;
  }

  #disableRenderPoints() {
    this.#points.forEach((p) => (p.reRenderCallback = null));
  }
  #enableRenderPoints() {
    this.#points.forEach((p) => (p.reRenderCallback = super.reRenderCallback));
  }
}
