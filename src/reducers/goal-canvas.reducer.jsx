import { GOAL_CANVAS_ACTIONS } from './../actions/goal-canvas.actions.jsx'

const initialState = {
  showTips: false,
  selectedNode: {},
  selectedNodeChildren: [],
  label: '',
  selectedNodeLabel: '',
  map: []
}

const GoalCanvasReducer = (state = initialState, action) => {
  switch (action.type) {
    case GOAL_CANVAS_ACTIONS.TOGGLE_INSTRUCTIONS:
      const toggleTips = Object.assign({}, state, {
        showTips: !state.showTips
      })
      return toggleTips
    case GOAL_CANVAS_ACTIONS.GET_TOPIC_LABEL_SUCCESS:
      const withLabel = Object.assign({}, state, {
        label: action.label
      })
      return withLabel
    case GOAL_CANVAS_ACTIONS.GET_TOPIC_MAP_SUCCESS:
      const withMap = Object.assign({}, state, {
        label: action.label,
        map: action.map
      })
      return withMap
    case GOAL_CANVAS_ACTIONS.GET_TOPIC_MAP_FAILURE:
      const withEmptyMap = Object.assign({}, state, {
        label: '',
        map: []
      })
      return withEmptyMap
    case GOAL_CANVAS_ACTIONS.NODE_SELECTED:
      const withSelectedNode = Object.assign({}, state, {
        selectedNode: action.selectedNode,
        selectedNodeLabel: action.selectedNodeLabel,
        selectedNodeChildren: action.selectedNodeChildren
      })
      return withSelectedNode
    default:
      return state
  }
}

export default GoalCanvasReducer
