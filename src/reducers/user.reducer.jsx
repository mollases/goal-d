import { USER_ACTIONS } from './../actions/user.actions.jsx'

const initialState = {
  searchData: '',
  newMap: false,
  topics: []
}

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_ACTIONS.UPDATE_SEARCH_PARAM:
      const updateSearch = Object.assign({}, state, {
        searchData: action.newSearch
      })
      return updateSearch
    case USER_ACTIONS.POST_TOPICS_SUCCESS:
      const postSuccess = Object.assign({}, state, {
        searchData: ''
      })
      return postSuccess
    case USER_ACTIONS.GET_TOPICS_SUCCESS:
      const withTopics = Object.assign({}, state, {
        topics: action.topics
      })
      return withTopics
    default:
      return state
  }
}

export default UserReducer
