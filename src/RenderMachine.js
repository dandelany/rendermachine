import _ from 'lodash';
import toposort from 'toposort';

import MachineGraph from './MachineGraph';

export default class RenderMachine {
  constructor(nodes) {
    const graph = new MachineGraph(nodes);

    graph.initModules();
    this.graph = graph;
  }
  render() {
    this.graph.tick();
  }
}
