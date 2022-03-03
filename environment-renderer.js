//environment-renderer.js
class EnvironmentRenderer {
  /** @type { CanvasRenderingContext2D } */
  #gContext;
  #scale;
  /** @type {HTMLCanvasElement} */
  #canvas;
  #coordinatesTranslator;
  #environment;

  /**
   *
   * @param {HTMLCanvasElement} canvas
   * @param {CoordinatesTranslator} coordinatesTranslator
   * @param {Environment} environment
   */
  constructor(canvas, coordinatesTranslator, environment, scale) {
    this.#canvas = canvas;
    this.#gContext = this.#gContext = canvas.getContext("2d");
    this.#clean();
    this.#scale = scale;
    this.#gContext.scale(this.#scale, this.#scale);
    this.#gContext.lineWidth = 1 / this.#scale;
    this.#coordinatesTranslator = coordinatesTranslator;
    this.#environment = environment;
    environment.reRenderCallback = this.render.bind(this);
    this.#drawAxisPlaceHolders();
  }

  /** @param { Environment } environment */
  render() {
    this.#clean();
    this.#drawAxisPlaceHolders();
    this.#environment.points.forEach((point) => {
      this.#drawPoint(point);
    });
    if (this.#environment.line) {
      this.#drawLine(this.#environment.line);
    }
  }

  #clean() {
    this.#gContext.fillRect(0, 0, 30, 30);
    this.#gContext.fillStyle = "white";
    this.#gContext.fillRect(0, 0, canvas.width, canvas.height);
  }

  #preserverColor(fn) {
    let originalColor = context.fillStyle;
    fn();
    context.fillStyle = originalColor;
  }

  #drawAxisPlaceHolders() {
    this.#canvasLine(
      [this.#canvas.width / 2 / this.#scale, this.#canvas.height],
      [this.#canvas.width / 2 / this.#scale, 0]
    );
    this.#canvasLine(
      [this.#canvas.width, this.#canvas.height / 2 / this.#scale],
      [0, this.#canvas.height / 2 / this.#scale]
    );
    for (let i = 0; i <= this.#canvas.width; i += this.#scale) {
      let axisSide = [1, -1];
      axisSide.forEach((e) => {
        for (let j = 0; j < 2; j++) {
          let from = this.#coordinatesTranslator
            .mathToCanvas(-10, i * e);
          let to = this.#coordinatesTranslator
            .mathToCanvas(10, i * e);
          if (j == 0) {
            from.reverse();
            to.reverse();
          }
          this.#canvasLine(
            [from[0] / this.#scale, from[1] / this.#scale],
            [to[0] / this.#scale, to[1] / this.#scale]
          );
          this.#gContext.font = `bold ${14 / this.#scale}px serif`;
          if (i != 0) {
            this.#gContext.strokeText(
              "" + i / this.#scale,
              ...[to[0] / this.#scale, to[1] / this.#scale]
            );
          }
        }
      });
    }
  }

  /**
   *
   * @param {Line} line
   */
  #drawLine(line) {
    let from = this.#coordinatesTranslator.mathToCanvas(
      -5000,
      -5000 * line.m + line.b * this.#scale
    );
    let to = this.#coordinatesTranslator.mathToCanvas(
      5000,
      5000 * line.m + line.b * this.#scale
    );
    this.#canvasLine(
      from.map((e) => e / this.#scale),
      to.map((e) => e / this.#scale)
    );
  }
  /**
   *
   * @param {[number, number]} from
   * @param {[number, number]} to
   */
  #canvasLine(from, to) {
    let [xFrom, yFrom] = from;
    let [xTo, yTo] = to;
    this.#gContext.beginPath();
    this.#gContext.moveTo(xFrom, yFrom);
    this.#gContext.lineTo(xTo, yTo);
    this.#gContext.stroke();
  }

  /**
   *
   * @param {Point} point
   */
  #drawPoint(point) {
    let [x, y] = this.#coordinatesTranslator
      .mathToCanvas(point.x, point.y);
    let pointWidth = 7;
    let pointHeight = 7;
    this.#preserverColor(() => {
      this.#gContext.fillStyle = point.clas;
      this.#gContext.fillRect(
        (x - pointWidth / 2) / this.#scale,
        (y - pointHeight / 2) / this.#scale,
        pointWidth / this.#scale,
        pointHeight / this.#scale
      );
    });
  }
}
