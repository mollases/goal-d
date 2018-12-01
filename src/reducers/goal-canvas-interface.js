import { GOAL_CANVAS_ACTIONS } from '../actions/goal-canvas-interface.js'

const initialState = {
  showTips: false,
  selectedNode: {},
  selectedNodeChildren: [],
  label: '',
  selectedNodeLabel: '',
  map: [],
  showSnackBar: false
}

const GoalCanvasInterfaceReducer = (state = initialState, action) => {
  switch (action.type) {
    case GOAL_CANVAS_ACTIONS.TOGGLE_INSTRUCTIONS:
      return Object.assign({}, state, {
        showTips: !state.showTips
      })
    case GOAL_CANVAS_ACTIONS.GET_TOPIC_LABEL_SUCCESS:
      return Object.assign({}, state, {
        label: action.label
      })
    case GOAL_CANVAS_ACTIONS.GET_TOPIC_MAP_SUCCESS:
      return Object.assign({}, state, {
        label: action.label,
        map: action.map
      })
    case GOAL_CANVAS_ACTIONS.GET_TOPIC_MAP_FAILURE:
      return Object.assign({}, state, {
        label: '',
        map: [],
        showTips: true
      })
    case GOAL_CANVAS_ACTIONS.NODE_SELECTED:
      return Object.assign({}, state, {
        selectedNode: action.selectedNode,
        selectedNodeLabel: action.selectedNodeLabel,
        selectedNodeChildren: action.selectedNodeChildren
      })
    case GOAL_CANVAS_ACTIONS.POST_TOPIC_MAP_SUCCESS:
      return Object.assign({}, state, {
        showSnackBar: true
      })
    case GOAL_CANVAS_ACTIONS.POST_TOPIC_MAP_SUCCESS_CLOSE_DIALOG:
      return Object.assign({}, state, {
        showSnackBar: false
      })
    default:
      return state
  }
}

export default GoalCanvasInterfaceReducer
