//trainer.js
const interval = 20;
let a = 0.1;
class Trainer {
  #n;
  #epoch;
  #trainerCallback;
  #endCallback;
  #neuronCalculator;
  #scale;
  #activationFunction;
  #errorPrecision;
  /**
   *
   * @param {number} n
   * @param {number} epoch
   */
  constructor(
    n,
    epoch,
    trainerCallback,
    endCallback,
    scale,
    activationFunction,
    errorPrecision
  ) {
    this.#n = n;
    this.#epoch = 10000000;
    this.#trainerCallback = trainerCallback;
    this.#endCallback = endCallback;
    this.#neuronCalculator = new NeuronCalculator();
    this.#scale = scale;
    this.#activationFunction = activationFunction;
    this.#errorPrecision = errorPrecision;
    if (activationFunction == LINEAR) {
      a = 0.1;
    } else {
      a = 1;
    }
  }

  #getClassNumberMap() {
    let classNumberMap = {
      [CLASS_A]: 0,
      [CLASS_B]: 1,
    };
    if (this.#activationFunction == TANH) {
      classNumberMap = {
        [CLASS_A]: -1,
        [CLASS_B]: 1,
      };
    }
    if (this.#activationFunction == LINEAR) {
      classNumberMap = {
        [CLASS_A]: -1,
        [CLASS_B]: 1,
      };
    }
    return classNumberMap;
  }

  /**
   *
   * @param {Point[]} dataSet
   * @param {number[]} startWeights
   * @param {number} startBias
   */
  async train(dataSet, startWeights) {
    let currentWeights = startWeights;
    let classNumberMap = this.#getClassNumberMap();

    let sumOffErrors = 0;
    let epoch = 0;
    do {
      sumOffErrors = 0;
      await this.#iterateWithPause((i) => {
        let current = new Point(
          dataSet[i].x / this.#scale,
          dataSet[i].y / this.#scale,
          dataSet[i].showClas
        );
        let [output, v, result] = this.#calculateNeuronOuput(
          current,
          currentWeights
        );
        let error = classNumberMap[current.showClas] - result;
        if (error !== 0) {
          let newWeights = this.#modifyWeight(
            [1, current.x, current.y],
            currentWeights,
            error,
            v
          );
          currentWeights = newWeights;
          this.#trainerCallback(newWeights);
          sumOffErrors += error * error;
          console.log("Error actual: ", error * error);
        }
      }, dataSet.length);
      epoch++;
      console.log("Error promedio: ", sumOffErrors / dataSet.length);
    } while (sumOffErrors / dataSet.length > this.#errorPrecision);
    this.#endCallback();
    console.log("Pesos resultantes" + currentWeights);
    console.log("Entradas resultantes" + currentWeights);
    for (let i = 0; i < dataSet.length; i++) {
      let current = dataSet[i];
      console.log(this.#calculateNeuronOuput(current, currentWeights));
      console.log(current, currentWeights);
    }
    return currentWeights;
  }
  async #iterateWithPause(fn, times) {
    for (let i = 0; i < times; i++) {
      await this.#wait(() => fn(i));
    }
  }
  #wait(fn) {
    return new Promise((resolve, reject) => {
      try {
        setTimeout(() => {
          fn();
          resolve();
        }, interval);
      } catch (ex) {
        reject(ex);
      }
    });
  }

  #calculateNeuronOuput(current, currentWeights) {
    switch (this.#activationFunction) {
      case LOGISTIC:
        return this.#neuronCalculator.calculateLogistic(
          current,
          currentWeights,
          a
        );
      case TANH:
        return this.#neuronCalculator.calculateTanh(current, currentWeights, a);
      case LINEAR:
        return this.#neuronCalculator.calculateLinear(
          current,
          currentWeights,
          a
        );
    }
  }

  #evaluateDerivative(v) {
    switch (this.#activationFunction) {
      case LOGISTIC:
        return this.#neuronCalculator.logisticFunctionDerivative(a, v);
      case TANH:
        return this.#neuronCalculator.tanhDerivative(v);
      case LINEAR:
        return this.#neuronCalculator.linearDerivative(a);
    }
  }

  /**
   *
   * @param {number[]} inputs
   * @param {number[]} currentWeights
   * @param {number} bias
   * @param {number} error
   */
  #modifyWeight(inputs, currentWeights, error, v = 1) {
    let newWeights = currentWeights.map((weight, index) =>
      this.#getNewValue.bind(this)(weight, inputs[index], error, v)
    );
    return newWeights;
  }

  /**
   *
   * @param {number} currentValue
   * @param {number} input
   * @param {number} error
   * @returns
   */
  #getNewValue(currentValue, input, error, v) {
    console.log(error);
    let newValue =
      currentValue + this.#n * error * this.#evaluateDerivative(v) * input;
    return newValue;
  }
}
