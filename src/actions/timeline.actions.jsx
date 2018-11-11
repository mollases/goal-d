import Config from './../services/config.service.jsx'
import _ from 'lodash'

const POST_NODE_NOTE_SUCCESS = 'POST_NODE_NOTE_SUCCESS'
const POST_NODE_NOTE_FAILURE = 'POST_NODE_NOTE_FAILURE'
const GET_NOTE_NOTES_SUCCESS = 'GET_NOTE_NOTES_SUCCESS'
const GET_NOTE_NOTES_FAILURE = 'GET_NOTE_NOTES_FAILURE'
const NEW_NOTE_CHANGE = 'NEW_NOTE_CHANGE'

const TIMELINE_ACTIONS = {
  GET_NOTE_NOTES_SUCCESS,
  GET_NOTE_NOTES_FAILURE,
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
  return Config.getUserTopicPostList(userId, topicId, nodeId, nodeChildrenIds)
    .then(response => response.json())
    .then(jsn => {
      let children = nodeChildrenIds.join(',')
      let sorted = _.sortBy(_.flatten(jsn).map(JSON.parse), 'timestamp').reverse()
      _.forEach(sorted, (i) => {
        i.label = _.filter(children, { id: i.nodeId })[0] || ''
        if (i.label !== '') {
          i.label = i.label.label
        }
      })
      return sorted
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
    type: GET_NOTE_NOTES_SUCCESS,
    contents
  }
}

const getNodeNotesFailure = () => {
  return {
    type: GET_NOTE_NOTES_FAILURE
  }
}

export { postNodeNote, getNodeNotes, newNoteChange, TIMELINE_ACTIONS }
