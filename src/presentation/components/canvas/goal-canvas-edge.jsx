export default ({ handleColor }) => {
  return { preview: true, // whether to show added edges preview before releasing selection
    stackOrder: 4, // Controls stack order of edgehandles canvas element by setting it's z-index
    handleSize: 6, // the size of the edge handle put on nodes
    handleHitThreshold: 6, // a threshold for hit detection that makes it easier to grab the handle
    handleIcon: false, // an image to put on the handle
    handleColor, // the colour of the handle and the line drawn from it
    handleLineType: 'draw', // can be 'ghost' for real edge, 'straight' for a straight line, or 'draw' for a draw-as-you-go line
    handleLineWidth: 2, // width of handle line in pixels
    handleOutlineColor: '#000000', // the colour of the handle outline
    handleOutlineWidth: 0, // the width of the handle outline in pixels
    handleNodes: 'node', // selector/filter function for whether edges can be made from a given node
    handlePosition: 'left top', // sets the position of the handle in the format of "X-AXIS Y-AXIS" such as "left top", "middle top"
    hoverDelay: 150, // time spend over a target node before it is considered a target selection
    cxt: false, // whether cxt events trigger edgehandles (useful on touch)
    enabled: true, // whether to start the plugin in the enabled state
    toggleOffOnLeave: false, // whether an edge is cancelled by leaving a node (true), or whether you need to go over again to cancel (false; allows multiple edges in one pass)
    edgeType: (sourceNode, targetNode) => {
    // can return 'flat' for flat edges between nodes or 'node' for intermediate node between them
    // returning null/undefined means an edge can't be added between the two nodes
      return 'flat'
    },
    loopAllowed: (node) => {
    // for the specified node, return whether edges from itself to itself are allowed
      return false
    },
    nodeLoopOffset: -50, // offset for edgeType: 'node' loops
    nodeParams: (sourceNode, targetNode) => {
    // for edges between the specified source and target
    // return element object to be passed to cy.add() for intermediary node
      return {}
    },
    edgeParams: (sourceNode, targetNode, i) => {
    // for edges between the specified source and target
    // return element object to be passed to cy.add() for edge
    // NB: i indicates edge index in case of edgeType: 'node'
      return {}
    },
    start: (sourceNode) => {
    // fired when edgehandles interaction starts (drag on handle)
    },
    complete: (sourceNode, targetNodes, addedEntities) => {
      // if (this.state.nodeGrouping) {
      //   targetNodes.move({ parent: sourceNode.data().id })
      //   addedEntities.remove()
      // }
    },
    stop: (sourceNode) => {
    // fired when edgehandles interaction is stopped (either complete with added edges or incomplete)
    },
    cancel: (sourceNode, renderedPosition, invalidTarget) => {
    // fired when edgehandles are cancelled ( incomplete - nothing has been added ) - renderedPosition is where the edgehandle was released, invalidTarget is
    // a collection on which the handle was released, but which for other reasons (loopAllowed | edgeType) is an invalid target
    }
  }
}
