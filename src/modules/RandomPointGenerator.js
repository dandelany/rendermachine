import times from 'lodash/times';
import random from 'lodash/random';

export default class RandomPointGenerator {
  tick(options) {
    const {xMin, xMax, yMin, yMax, count} = options;

    return times(count, () => (
      {x: random(xMin, xMax), y: random(yMin, yMax)}
    ));
  }
}
