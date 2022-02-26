//trainer.js
const interval = 20;
class Trainer {
  #n;
  #epoch;
  #trainerCallback;
  #endCallback;
  #neuronCalculator;
  #scale;
  #activationFunction;
  /**
   *
   * @param {number} n
   * @param {number} epoch
   */
  constructor(n, epoch, trainerCallback, endCallback, scale, activationFunction) {
    this.#n = n;
    this.#epoch = 10000000;
    this.#trainerCallback = trainerCallback;
    this.#endCallback = endCallback;
    this.#neuronCalculator = new NeuronCalculator();
    this.#scale = scale;
    this.#activationFunction = activationFunction;
  }

  /**
   *
   * @param {Point[]} dataSet
   * @param {number[]} startWeights
   * @param {number} startBias
   */
  async train(dataSet, startWeights) {
    let currentWeights = startWeights;
    let classNumberMap = {
      [CLASS_A]: 0,
      [CLASS_B]: 1,
    };
    let nOfErrors = 0;
    let epoch = 0;
    do {
      nOfErrors = 0;
      await this.#iterateWithPause((i) => {
        let current = new Point(
          dataSet[i].x / this.#scale,
          dataSet[i].y / this.#scale,
          dataSet[i].showClas
        );
        current
        let [output, v] = this.#activationFunction(
          current,
          currentWeights
        );
        let error = point.result - output;
        if (error !== 0) {
          let newWeights = this.#modifyWeight(
            [1, current.x, current.y],
            currentWeights,
            error
          );
          currentWeights = newWeights;
          this.#trainerCallback(newWeights);
          nOfErrors++;
        }
      }, dataSet.length);
      epoch++;
    } while (nOfErrors > 0);
    this.#endCallback();
    for (let i = 0; i < dataSet.length; i++) {
      let current = dataSet[i];
      console.log(
        this.#neuronCalculator.calculateNeuronOuput(
          current,
          currentWeights,
          true
        )
      );
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

  /**
   *
   * @param {number[]} inputs
   * @param {number[]} currentWeights
   * @param {number} bias
   * @param {number} error
   */
  #modifyWeight(inputs, currentWeights, error) {
    let newWeights = currentWeights.map((weight, index) =>
      this.#getNewValue.bind(this)(weight, inputs[index], error)
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
  #getNewValue(currentValue, input, error) {
    let newValue = currentValue + this.#n * error * input;
    return newValue;
  }
}
