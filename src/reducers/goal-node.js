import { GOAL_NODE_ACTIONS } from '../actions/goal-node.js'

const initialState = {
  editMode: false,
  newKey: '',
  newValue: '',
  nodeData: []
}

const GoalNodeReducer = (state = initialState, action) => {
  switch (action.type) {
    case GOAL_NODE_ACTIONS.TOGGLE_EDIT:
      return Object.assign({}, state, {
        editMode: !state.editMode
      })
    case GOAL_NODE_ACTIONS.STORE_DATA:
      const storedData = Object.assign({}, state, {
        editMode: false,
        newKey: '',
        newValue: ''
      })
      storedData.nodeData.push({ key: state.newKey, val: state.newValue })
      return storedData
    case GOAL_NODE_ACTIONS.NEW_KEY:
      return Object.assign({}, state, {
        newKey: action.key
      })
    case GOAL_NODE_ACTIONS.NEW_VALUE:
      return Object.assign({}, state, {
        newValue: action.value
      })
    case GOAL_NODE_ACTIONS.UPDATE_KEY_VALUE:
      return Object.assign({}, state, {
        nodeData: state.nodeData.map((k) => {
          if (k.key === action.key) {
            k.val = action.value
          }
          return k
        })
      })
    case GOAL_NODE_ACTIONS.UPDATE_KEY:
      return Object.assign({}, state, {
        nodeData: state.nodeData.map((k) => {
          if (k.key === action.oldKey) {
            k.key = action.newKkey
          }
          return k
        })
      })
    default:
      return state
  }
}

export default GoalNodeReducer
