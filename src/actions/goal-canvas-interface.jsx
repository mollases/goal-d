import Config from '../services/config.jsx'

const TOGGLE_INSTRUCTIONS = 'TOGGLE_INSTRUCTIONS'
const NODE_SELECTED = 'NODE_SELECTED'
const GET_TOPIC_LABEL_SUCCESS = 'GET_TOPIC_LABEL_SUCCESS'
const GET_TOPIC_LABEL_FAILURE = 'GET_TOPIC_LABEL_FAILURE'
const GET_TOPIC_MAP_SUCCESS = 'GET_TOPIC_MAP_SUCCESS'
const GET_TOPIC_MAP_FAILURE = 'GET_TOPIC_MAP_FAILURE'
const POST_TOPIC_MAP_SUCCESS = 'POST_TOPIC_MAP_SUCCESS'
const POST_TOPIC_MAP_FAILURE = 'POST_TOPIC_MAP_FAILURE'

const GOAL_CANVAS_ACTIONS = {
  TOGGLE_INSTRUCTIONS,
  NODE_SELECTED,
  GET_TOPIC_LABEL_SUCCESS,
  GET_TOPIC_LABEL_FAILURE,
  GET_TOPIC_MAP_SUCCESS,
  GET_TOPIC_MAP_FAILURE,
  POST_TOPIC_MAP_SUCCESS,
  POST_TOPIC_MAP_FAILURE
}

const toggleInstructions = () => {
  return {
    type: TOGGLE_INSTRUCTIONS
  }
}

const nodeSelected = (selectedNode, selectedNodeLabel, selectedNodeChildren) => {
  return {
    type: NODE_SELECTED,
    selectedNode,
    selectedNodeLabel,
    selectedNodeChildren
  }
}

const getTopicLabel = (topicId, userId, dispatch) => {
  return Config.getUserDetails(userId)
    .then((r) => r.json())
    .then((jsn) => {
      return jsn.topics.filter((el) => {
        if (el.id === parseInt(topicId)) {
          return el
        }
      })[0].label
    })
    .then(label => dispatch(getTopicLabelSuccess(label)))
    .catch(() => dispatch(getTopicLabelFailure()))
}

const getTopicLabelSuccess = (label) => {
  return {
    type: GET_TOPIC_LABEL_SUCCESS,
    label
  }
}

const getTopicLabelFailure = () => {
  return {
    type: GET_TOPIC_LABEL_FAILURE
  }
}

const getTopicMap = (topicId, userId, dispatch) => {
  return Config.getUserTopic(userId, topicId)
    .then((response) => response.json())
    .then(({ label, map }) => dispatch(getTopicMapSuccess(label, map)))
    .catch(() => dispatch(getTopicMapFailure()))
}

const getTopicMapSuccess = (label, map) => {
  return {
    type: GET_TOPIC_MAP_SUCCESS,
    label,
    map
  }
}

const getTopicMapFailure = () => {
  return {
    type: GET_TOPIC_MAP_FAILURE
  }
}

const postTopicMap = (topicId, userId, body, dispatch) => {
  Config.postUserTopic(userId, topicId, body)
    .then((response) => response.json())
    .then(({ label, map }) => dispatch(postTopicMapSuccess(label, map)))
    .catch(() => dispatch(postTopicMapFailure()))
}

const postTopicMapSuccess = (label, map) => {
  return {
    type: POST_TOPIC_MAP_SUCCESS,
    label,
    map
  }
}

const postTopicMapFailure = () => {
  return {
    type: POST_TOPIC_MAP_FAILURE
  }
}

export { toggleInstructions, nodeSelected, getTopicLabel, getTopicMap, postTopicMap, GOAL_CANVAS_ACTIONS }
