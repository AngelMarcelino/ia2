//coordinates-translator.js
let CLASS_A = "#FF0000";
let CLASS_B = "#0000FF";
let CLASS_NONE = "#000000";
class CoordinatesTranslator {
  #width;
  #height;
  #yCenter;
  #xCenter;
  /**
   *
   * @param {number} width
   * @param {number} height
   */
  constructor(width, height) {
    this.#width = width;
    this.#height = height;
    this.#calculateCenter();
  }

  #calculateCenter() {
    this.#yCenter = this.#height / 2;
    this.#xCenter = this.#width / 2;
  }
  /**
   * @param {number} x
   * @param {number} y
   */
  canvasToMath(x, y) {
    return [x - this.#xCenter, this.#yCenter - y];
  }

  /**
   *
   * @param {number} x
   * @param {number} y
   * @returns {[number, number]}
   */
  mathToCanvas(x, y) {
    return [x + this.#xCenter, this.#yCenter - y];
  }
}
