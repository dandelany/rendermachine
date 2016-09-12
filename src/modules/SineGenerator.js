export default class SineGenerator {
  tick(options) {
    const {n, multiplier, min, max} = options;

    return (((Math.sin(n * multiplier) * 0.5) + 1) * Math.abs(max - min)) + min;
  }
}
