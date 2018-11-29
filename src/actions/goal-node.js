const TOGGLE_EDIT = 'TOGGLE_EDIT'
const STORE_DATA = 'STORE_DATA'
const NEW_VALUE = 'NEW_VALUE'
const NEW_KEY = 'NEW_KEY'
const UPDATE_KEY_VALUE = 'UPDATE_KEY_VALUE'
const UPDATE_KEY = 'UPDATE_KEY'
const GOAL_NODE_ACTIONS = {
  TOGGLE_EDIT,
  STORE_DATA,
  NEW_VALUE,
  NEW_KEY,
  UPDATE_KEY_VALUE,
  UPDATE_KEY
}

const updateKeyValue = (key, value) => {
  return {
    type: UPDATE_KEY_VALUE,
    key,
    value
  }
}
const updateKey = (oldKey, newKey) => {
  return {
    type: UPDATE_KEY,
    oldKey,
    newKey
  }
}

const toggleEdit = () => {
  return {
    type: TOGGLE_EDIT
  }
}

const storeData = () => {
  return {
    type: STORE_DATA
  }
}

const newValue = (value) => {
  return {
    type: NEW_VALUE,
    value
  }
}

const newKey = (key) => {
  return {
    type: NEW_KEY,
    key
  }
}

export { toggleEdit, storeData, newKey, newValue, updateKeyValue, updateKey, GOAL_NODE_ACTIONS }
