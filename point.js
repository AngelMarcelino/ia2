//point.js
class Point extends Renderable {
  #clas;
  #showClas;
  #x;
  #y;
  #result
  /**
   *
   * @param {number} x
   * @param {number} y
   * @param {string} clas
   * @param {() => void} reRenderCallback
   */
  constructor(x, y, clas, reRenderCallback) {
    super(reRenderCallback);
    this.x = x;
    this.y = y;
    this.clas = clas;
    this.showClas = clas;
    this.result = null;
  }
  set clas(clas) {
    this.#clas = clas;
    this.reRender();
  }
  get clas() {
    return this.#clas;
  }
  get showClas() {
    return this.#showClas;
  }
  set showClas(value) {
    this.#showClas = value;
    this.reRender();
  }
  set x(value) {
    this.#x = value;
    this.reRender();
  }
  get x() {
    return this.#x;
  }
  set y(value) {
    this.#y = value;
    this.reRender();
  }
  get y() {
    return this.#y;
  }
  set result (value) {
    this.#result = value;
  }
  
  get result () {
    return this.#result;
  }
  
  
}
