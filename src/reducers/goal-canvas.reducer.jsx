import { GOAL_CANVAS_ACTIONS } from './../actions/goal-canvas.actions.jsx'

const initialState = {
  showTips: false,
  selectedNode: {},
  selectedNodeChildren: []
}

const GoalCanvasReducer = (state = initialState, action) => {
  switch (action.type) {
    case GOAL_CANVAS_ACTIONS.TOGGLE_INSTRUCTIONS:
      const toggleTips = Object.assign({}, state, {
        showTips: !state.showTips
      })
      return toggleTips
    case GOAL_CANVAS_ACTIONS.NODE_SELECTED:
      const withSelectedNode = Object.assign({}, state, {
        selectedNode: action.selectedNode,
        selectedNodeChildren: action.selectedNodeChildren
      })
      return withSelectedNode
    default:
      return state
  }
}

export default GoalCanvasReducer
