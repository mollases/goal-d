const TOGGLE_INSTRUCTIONS = 'TOGGLE_INSTRUCTIONS'
const NODE_SELECTED = 'NODE_SELECTED'

const GOAL_CANVAS_ACTIONS = {
  TOGGLE_INSTRUCTIONS,
  NODE_SELECTED
}

const toggleInstructions = () => {
  return {
    type: TOGGLE_INSTRUCTIONS
  }
}

const nodeSelected = (selectedNode, selectedNodeChildren) => {
  return {
    type: NODE_SELECTED,
    selectedNode,
    selectedNodeChildren
  }
}

export { toggleInstructions, nodeSelected, GOAL_CANVAS_ACTIONS }
