import { TIMELINE_ACTIONS } from '../actions/timeline.jsx'

const initialState = {
  contents: [],
  newNoteContents: ''
}

const TimelineReducer = (state = initialState, action) => {
  switch (action.type) {
    case TIMELINE_ACTIONS.GET_NODE_NOTES_SUCCESS:
      const postSuccess = Object.assign({}, state, {
        contents: action.contents
      })
      return postSuccess
    case TIMELINE_ACTIONS.POST_NODE_NOTE_SUCCESS:
      const withTopics = Object.assign({}, state, {
        newNoteContents: ''
      })
      return withTopics
    case TIMELINE_ACTIONS.NEW_NOTE_CHANGE:
      const newNote = Object.assign({}, state, {
        newNoteContents: action.note
      })
      return newNote
    default:
      return state
  }
}

export default TimelineReducer
