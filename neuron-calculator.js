//neuron-calculator.js
const LOGISTIC = 1;
const TANH = 2;
const LINEAR = 3;
class NeuronCalculator {
  /**
   *
   * @param {Point} point
   * @param {number[]} weights
   * @param {number} bias
   */
  calculateNeuronOuput(point, weights, verbose = false) {
    let result = this.#calculateV(point, weights, verbose);
    let v = result;
    if (v < 0) {
      return [0, v];
    } else {
      return [1, v];
    }
  }

  calculateLogistic(point, weights, a) {
    let v = this.#calculateV(point, weights);
    let result = this.logisticFunction(a, v);
    if (result < 0.5) {
      return [0, v, result];
    } else {
      return [1, v, result];
    }
  }

  calculateTanh(point, weights, a) {
    let v = this.#calculateV(point, weights);
    let result = this.tanh(v);
    if (result < 0.5) {
      return [0, v, result];
    } else {
      return [1, v, result];
    }
  }

  calculateLinear(point, weights, a) {
    let v = this.#calculateV(point, weights);
    let result = this.linear(a, v);
    if (result < 0) {
      return [0, v, result];
    } else {
      return [1, v, result];
    }
  }

  linearFunction(a, v) {
    let result = a * v;
    return result;
  }

  logisticFunction(a, v) {
    let numerator = 1;
    let d_e = Math.exp(-a * v);
    let denominator = 1 + d_e;
    return numerator / denominator;
  }

  logisticFunctionDerivative(a, v) {
    let result =
      a * this.logisticFunction(a, v) * (1 - this.logisticFunction(a, v));
    return result;
  }

  tanh(v) {
    let result = Math.tanh(v);
    return result;
  }
  tanhDerivative(v) {
    let result = 1 - this.tanh(v) * this.tanh(v);
    return result;
  }

  linear(a, v) {
    let result = a * v;
    return result;
  }

  linearDerivative(a) {
    return a;
  }

  /**
   *
   * @param {Point} point
   * @param {number[]} weights
   * @returns
   */
  #calculateV(point, weights, verbose = false) {
    let pointPropertyNumberMap = {
      0: 1,
      1: point.x,
      2: point.y,
    };
    if (verbose) {
      console.log(`point (${point.x}, ${point.y})`);
    }
    let result = weights.reduce((accum, current, i) => {
      let result = accum + current * pointPropertyNumberMap[i];
      if (verbose) {
        console.log(
          `${accum} + ${current} * ${pointPropertyNumberMap[i]} = ${result}`
        );
      }
      return result;
    }, 0);
    if (verbose) {
      console.log(`v = ${result}`);
    }
    return result;
  }
}
