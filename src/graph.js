const graph = [
  {
    id: 'context',
    module: 'Context',
    inputs: {}
  },
  {
    id: 'points',
    module: 'RandomPointGenerator',
    dependencies: ['pointCount'],

    inputs: {
      constants: {
        xMin: 0,
        xMax: 500,
        yMin: 0,
        yMax: 500
      },
      links: {
        count: 'pointCount'
      }
    }
  },

  {
    id: 'pointCount',
    module: 'SineGenerator',

    dependencies: ['context.frameCount'],

    inputs: {
      constants: {
        multiplier: .01,
        min: 0,
        max: 200
      },
      links: {
        n: 'context.frame'
      }
    }
  },

  {
    id: 'renderer',
    module: 'PointRenderer',

    dependencies: ['points'],

    inputs: {
      links: {
        points: 'points'
      }
    }
  }
];

export default graph;