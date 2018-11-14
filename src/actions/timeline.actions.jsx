import Config from './../services/config.service.jsx'
import _ from 'lodash'

const POST_NODE_NOTE_SUCCESS = 'POST_NODE_NOTE_SUCCESS'
const POST_NODE_NOTE_FAILURE = 'POST_NODE_NOTE_FAILURE'
const GET_NODE_NOTES_SUCCESS = 'GET_NODE_NOTES_SUCCESS'
const GET_NODE_NOTES_FAILURE = 'GET_NODE_NOTES_FAILURE'
const NEW_NOTE_CHANGE = 'NEW_NOTE_CHANGE'

const TIMELINE_ACTIONS = {
  GET_NODE_NOTES_SUCCESS,
  GET_NODE_NOTES_FAILURE,
  POST_NODE_NOTE_SUCCESS,
  POST_NODE_NOTE_FAILURE,
  NEW_NOTE_CHANGE
}

const postNodeNote = (userId, topicId, nodeId, body, dispatch) => {
  return Config.postUserTopicOnPost(userId, topicId, nodeId, body)
    .then(() => dispatch(postNodeNoteSuccess()))
    .catch(() => dispatch(postNodeNoteFailure()))
}

const getNodeNotes = (userId, topicId, nodeId, nodeChildrenIds, dispatch) => {
  return Config.getUserTopicPostList(userId, topicId, nodeId, nodeChildrenIds.join(','))
    .then(response => response.json())
    .then(jsn => {
      let cleaned = jsn.filter(_.identity)
      let notes = cleaned.map(e => e.notes)
      let flat = _.flatten(notes)
      let sorted = _.sortBy(flat, 'timestamp')
      return sorted.reverse()
    })
    .then(sorted => dispatch(getNodeNotesSuccess(sorted)))
    .catch(() => dispatch(getNodeNotesFailure()))
}

const newNoteChange = (note) => {
  return {
    type: NEW_NOTE_CHANGE,
    note
  }
}

const postNodeNoteSuccess = () => {
  return {
    type: POST_NODE_NOTE_SUCCESS
  }
}

const postNodeNoteFailure = () => {
  return {
    type: POST_NODE_NOTE_FAILURE
  }
}

const getNodeNotesSuccess = (contents) => {
  return {
    type: GET_NODE_NOTES_SUCCESS,
    contents
  }
}

const getNodeNotesFailure = () => {
  return {
    type: GET_NODE_NOTES_FAILURE
  }
}

export { postNodeNote, getNodeNotes, newNoteChange, TIMELINE_ACTIONS }
