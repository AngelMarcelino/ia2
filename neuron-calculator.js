//neuron-calculator.js
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
  
  
  calculateLogistic(point, weights){
    let v = this.#calculateV(point, weights);
    let result = this.logisticFunction(a, v);
    if (result < 0.5) {
      return [0, v];
    } else {
      return [1, v];
    }
  }
  
  logisticFunction(a, v) {
    let numerator = 1;
    let d_e = Math.exp(-a * v);
    let denominator = 1 + d_e;
    return numerator / denominator;
  }
  
  logisticFunctionDerivative(a, v) {
    let result = a * this.logisticFunction(a, p) * (1 - this.logisticFunction(a, v));
    return result;
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
