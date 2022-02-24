//renderable.js
class Renderable {
  /**
   * @type { () => void}
   */
  #reRenderCallback;
  /**
   *
   * @param {() => void)} reRenderCallback
   */
  constructor(reRenderCallback) {
    this.#reRenderCallback = reRenderCallback;
  }
  /**
   * @type {() => void}
   * @param {() => void} value
   */
  set reRenderCallback(value) {
    this.#reRenderCallback = value;
  }
  get reRenderCallback() {
    return this.#reRenderCallback;
  }
  reRender() {
    if (this.#reRenderCallback) {
      this.#reRenderCallback();
    }
  }
}
