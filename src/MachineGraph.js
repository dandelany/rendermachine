import _ from 'lodash';
import toposort from 'toposort';
import Modules from './modules';

export default class MachineGraph {
  constructor(nodes) {
    this.setGraph(nodes);
  }
  setGraph(nodes) {
    const nodesById = _.keyBy(nodes, 'id');
    const sortedNodes = this._topoSortNodes(nodesById);
    
    _.assign(this, {nodesById, sortedNodes});
    console.log(this);
  }
  initModules() {
    for(let node of (this.sortedNodes || [])) {
      if(_.has(Modules, node.module)) {
        const Module = Modules[node.module];
        node.instance = new Module(node);
      }
    }
    console.log('initialized', this);
  }

  tick() {
    let outputs = {};

    for(let node of (this.sortedNodes || [])) {
      console.log('tick', node);
      // resolve inputs
      let inputs = {};
      // assign constants directly
      _.assign(inputs, (node.inputs.constants || {}));
      // resolve links from outputs
      _.forEach(node.inputs.links || {}, (link, inputKey) => {
        _.assign(inputs, {[inputKey]: outputs[link]});
      });

      console.log('inputs', inputs);

      if(node.instance) {
        const nodeOutputs = node.instance.tick();

      }
    }
  }

  _topoSortNodes(nodesById) {
    const edges = _.chain(nodesById)
      .map(node => {
        return (node.dependencies || []).map(dependency => ([node.id, dependency]))
      })
      .flatten()
      .filter(edge => {
        return edge[1].indexOf('context.') !== 0;
      })
      .value();

    const sortedNodeIds = toposort(edges).reverse();

    // context node always runs first
    return (['context'].concat(sortedNodeIds)).map(id => nodesById[id]);
  }
}
