import { GOAL_NODE_ACTIONS } from './../actions/goal-node.actions.jsx'

const initialState = {
  editMode: false,
  newKey: '',
  newValue: ''
}

const GoalNodeReducer = (state = initialState, action) => {
  switch (action.type) {
    case GOAL_NODE_ACTIONS.TOGGLE_EDIT:
      const toggleTips = Object.assign({}, state, {
        editMode: !state.editMode
      })
      return toggleTips
    case GOAL_NODE_ACTIONS.STORE_DATA:
      const storedData = Object.assign({}, state, {
        editMode: false,
        newKey: '',
        newValue: ''
      })
      return storedData
    case GOAL_NODE_ACTIONS.NEW_KEY:
      const newKey = Object.assign({}, state, {
        newKey: action.key
      })
      return newKey
    case GOAL_NODE_ACTIONS.NEW_VALUE:
      const newValue = Object.assign({}, state, {
        newValue: action.value
      })
      return newValue
    default:
      return state
  }
}

export default GoalNodeReducer
