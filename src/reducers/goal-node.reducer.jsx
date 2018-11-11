import { GOAL_NODE_ACTIONS } from './../actions/goal-node.actions.jsx'
import _ from 'lodash'

const initialState = {
  editMode: false,
  newKey: '',
  newValue: '',
  nodeData: []
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
      storedData.nodeData.push({ key: state.newKey, val: state.newValue })
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
    case GOAL_NODE_ACTIONS.UPDATE_KEY_VALUE:
      const replacedValue = Object.assign({}, state, {
        nodeData: state.nodeData.map((k) => {
          if (k.key === action.key) {
            k.val = action.value
          }
          return k
        })
      })
      return replacedValue
    case GOAL_NODE_ACTIONS.UPDATE_KEY:
      const replacedKey = Object.assign({}, state, {
        nodeData: state.nodeData.map((k) => {
          if (k.key === action.oldKey) {
            k.key = action.newKkey
          }
          return k
        })
      })
      return replacedKey
    default:
      return state
  }
}

export default GoalNodeReducer
