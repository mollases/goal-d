const TOGGLE_INSTRUCTIONS = 'TOGGLE_INSTRUCTIONS'
const NODE_SELECTED = 'NODE_SELECTED'
const GET_LABEL_SUCCESS = 'GET_LABEL_SUCCESS'
const GET_LABEL_FAILURE = 'GET_LABEL_FAILURE'
const GOAL_CANVAS_ACTIONS = {
  TOGGLE_INSTRUCTIONS,
  NODE_SELECTED,
  GET_LABEL_SUCCESS,
  GET_LABEL_FAILURE
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

const getLabel = (topicId, userId, config, dispatch) => {
  return config.getUserDetails(userId)
    .then((r) => r.json())
    .then((jsn) => {
      return jsn.topics.filter((el) => {
        if (el.id === parseInt(topicId)) {
          return el
        }
      })[0].label
    })
    .then(label => dispatch(getLabelSuccess(label)))
    .catch(() => dispatch(getLabelFailure()))
}

const getLabelSuccess = (label) => {
  return {
    type: GET_LABEL_SUCCESS,
    label
  }
}

const getLabelFailure = () => {
  return {
    type: GET_LABEL_FAILURE
  }
}

export { toggleInstructions, nodeSelected, getLabel, GOAL_CANVAS_ACTIONS }
