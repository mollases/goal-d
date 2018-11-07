import React, { Component } from 'react'
import autoBind from 'react-autobind'

import TextField from 'material-ui/TextField'
import { orange500, blue500 } from 'material-ui/styles/colors'
import FlatButton from 'material-ui/FlatButton'
import { List } from 'material-ui/List'

import _ from 'lodash'

import Config from './../../services/config.service.jsx'
import UserTopic from './../components/user/user-topic.component.jsx'
import { getTopics, postTopic, updateSearchParam } from './../../actions/user.actions.jsx'
// import UserCard from './../components/user/user-card.component.jsx'

const styles = {
  errorStyle: {
    color: orange500
  },
  underlineStyle: {
    borderColor: orange500
  },
  floatingLabelStyle: {
    color: orange500
  },
  floatingLabelFocusStyle: {
    color: blue500
  }
}

class User extends Component {
  constructor (props) {
    super(props)
    autoBind(this)
  }

  getState () {
    return this.props.store.getState().UserReducer
  }

  handleChange (event) {
    this.props.store.dispatch(updateSearchParam(event.target.value))
  }

  refreshMaps () {
    return getTopics(Config, this.props.auth.getActiveUser(), this.props.store.dispatch)
  }

  componentWillMount () {
    this.props.store.subscribe(this.forceUpdate.bind(this))
    this.refreshMaps()
  }

  saveNewMap () {
    const stateProps = this.getState()
    let search = stateProps.searchData.trim()
    if (!search) {
      return
    }

    let topics = stateProps.topics
    topics.push({
      id: topics.length,
      label: search,
      note: '',
      time: Date.now()
    })
    postTopic(topics, Config, this.props.auth.getActiveUser(), this.props.store.dispatch)
  }

  saveNote (id, note) {
    const stateProps = this.getState()
    let content = note.trim()
    let topics = stateProps.topics
    let topic = _.find(topics, { id })
    topic.note = content
    postTopic(topics, Config, this.props.auth.getActiveUser(), this.props.store.dispatch)
  }

  deleteTopic (id) {}

  render () {
    const stateProps = this.getState()
    return (
      <div className='row'>
        {/* <div className='col-sm-6 col-md-4'>
          <UserCard />
        </div> */}
        <div className='col-sm-6 col-md-7 col-md-offset-1'>
          <div className='row'>
            <TextField
              floatingLabelText='Search or add...'
              floatingLabelStyle={styles.floatingLabelStyle}
              floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
              value={stateProps.searchData}
              onChange={this.handleChange}
            />
            <FlatButton label='New' onClick={this.saveNewMap} />
          </div>
          <div className='row'>
            <List>
              {this.renderMaps()}
            </List>
          </div>
        </div>
      </div>
    )
  }

  renderMaps () {
    const stateProps = this.getState()
    if (!stateProps.topics) {
      return
    }

    let userId = this.props.auth.getActiveUser()
    let topics = stateProps.topics
    let search = stateProps.searchData
    topics.sort((a, b) => {
      if (a.time > b.time) {
        return -1
      } else if (a.time < b.time) {
        return 1
      }
      return 0
    })

    return topics.map((el) => {
      let show = search === '' || el.label.indexOf(search) !== -1
      if (show) {
        return (
          <UserTopic userId={userId} el={el} key={el.id} saveNote={this.saveNote} deleteTopic={this.deleteTopic} />
        )
      }
    })
  }
}

export default User
