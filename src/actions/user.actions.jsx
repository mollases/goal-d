const POST_TOPICS_SUCCESS = 'POST_TOPICS_SUCCESS'
const POST_TOPICS_FAILURE = 'POST_TOPICS_FAILURE'
const GET_TOPICS_SUCCESS = 'GET_TOPICS_SUCCESS'
const GET_TOPICS_FAILURE = 'GET_TOPICS_FAILURE'
const UPDATE_SEARCH_PARAM = 'UPDATE_SEARCH_PARAM'

const USER_ACTIONS = {
  GET_TOPICS_SUCCESS,
  GET_TOPICS_FAILURE,
  POST_TOPICS_SUCCESS,
  POST_TOPICS_FAILURE,
  UPDATE_SEARCH_PARAM
}

const updateSearchParam = (newSearch) => {
  return {
    type: UPDATE_SEARCH_PARAM,
    newSearch
  }
}

const postTopic = (topics, config, user, dispatch) => {
  config.postUserDetails(user, topics)
    .then(() => getTopics(config, user, dispatch))
    .then(() => dispatch(postTopicSuccess()))
    .catch(() => dispatch(postTopicFailure()))
}

const getTopics = (config, user, dispatch) => {
  return config.getUserDetails(user)
    .then(response => response.json())
    .then(jsn => (jsn.topics || []))
    .then(topics => dispatch(getTopicsSuccess(topics)))
    .catch(() => dispatch(getTopicsFailure()))
}

const postTopicSuccess = () => {
  return {
    type: POST_TOPICS_SUCCESS
  }
}

const postTopicFailure = () => {
  return {
    type: POST_TOPICS_FAILURE
  }
}

const getTopicsSuccess = (topics) => {
  return {
    type: GET_TOPICS_SUCCESS,
    topics
  }
}

const getTopicsFailure = () => {
  return {
    type: GET_TOPICS_FAILURE
  }
}

export { postTopic, getTopics, updateSearchParam, USER_ACTIONS }
