//line.js
class Line extends Renderable {
  #w1;
  #w2;
  #threshold;
  constructor(w1, w2, threshold, reRenderCallback) {
    super(reRenderCallback);
    this.w1 = w1;
    this.w2 = w2;
    this.threshold = threshold;
  }
  set w1(value) {
    this.#w1 = value;
    this.reRender();
  }
  get w1() {
    return this.#w1;
  }
  get m() {
    let m = -this.#w1 / this.#w2;
    return m;
  }
  set w2(value) {
    this.#w2 = value;
    this.reRender();
  }
  get w2() {
    return this.#w2;
  }
  set threshold(value) {
    this.#threshold = value;
  }
  set threshold(value) {
    this.#threshold = value;
    this.reRender();
  }
  get threshold() {
    return this.#threshold;
  }
  get b() {
    let b = this.#threshold / this.#w2;
    return b;
  }
}
