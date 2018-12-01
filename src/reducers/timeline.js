import { TIMELINE_ACTIONS } from '../actions/timeline.js'

const initialState = {
  contents: [],
  newNoteContents: ''
}

const TimelineReducer = (state = initialState, action) => {
  switch (action.type) {
    case TIMELINE_ACTIONS.GET_NODE_NOTES_SUCCESS:
      return Object.assign({}, state, {
        contents: action.contents
      })
    case TIMELINE_ACTIONS.POST_NODE_NOTE_SUCCESS:
      return Object.assign({}, state, {
        newNoteContents: ''
      })
    case TIMELINE_ACTIONS.NEW_NOTE_CHANGE:
      return Object.assign({}, state, {
        newNoteContents: action.note
      })
    default:
      return state
  }
}

export default TimelineReducer
