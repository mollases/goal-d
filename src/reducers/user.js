import { USER_ACTIONS } from '../actions/user.js'

const initialState = {
  searchData: '',
  newMap: false,
  topics: []
}

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_ACTIONS.UPDATE_SEARCH_PARAM:
      return Object.assign({}, state, {
        searchData: action.newSearch
      })
    case USER_ACTIONS.POST_TOPICS_SUCCESS:
      return Object.assign({}, state, {
        searchData: ''
      })
    case USER_ACTIONS.GET_TOPICS_SUCCESS:
      return Object.assign({}, state, {
        topics: action.topics
      })
    default:
      return state
  }
}

export default UserReducer
