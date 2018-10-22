import React, { Component } from 'react'
import TextField from 'material-ui/TextField'
import { orange500, blue500 } from 'material-ui/styles/colors'
import FlatButton from 'material-ui/FlatButton'
import { List } from 'material-ui/List'

import _ from 'lodash'

import Config from './../services/config.service.jsx'
import UserTopic from './../components/user/user-topic.component.jsx'
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
    this.state = {
      searchData: '',
      newMap: false,
      topics: []
    }
    this.renderMaps = this.renderMaps.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.saveNewMap = this.saveNewMap.bind(this)
    this.refreshMaps = this.refreshMaps.bind(this)
    this.saveNote = this.saveNote.bind(this)
    this.deleteTopic = this.deleteTopic.bind(this)
  }

  handleChange (event) {
    this.setState({ searchData: event.target.value })
  }

  refreshMaps () {
    return Config.getUserDetails(this.props.auth.getActiveUser())
      .then(response => response.json())
      .then(jsn => this.setState({ topics: jsn.topics || [] }))
  }

  componentWillMount () {
    return this.refreshMaps()
  }

  saveNewMap () {
    let topic = this.state.searchData.trim()
    if (!topic) {
      return
    }

    let topics = this.state.topics
    topics.push({
      id: topics.length,
      label: topic,
      note: '',
      time: Date.now()
    })
    Config.postUserDetails(this.props.auth.getActiveUser(), topics)
      .then(this.refreshMaps)
      .then(() => {
        this.setState({
          searchData: '',
          newTopic: ''
        })
      })
  }

  saveNote (id, note) {
    let content = note.trim()
    let topics = this.state.topics
    let topic = _.find(topics, { id: id })
    topic.note = content
    Config.postUserDetails(this.props.auth.getActiveUser(), topics)
  }

  deleteTopic (id) {}

  render () {
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
              value={this.state.searchData}
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
    if (!this.state.topics) {
      return
    }

    let userId = this.props.params.id
    let topics = this.state.topics
    let search = this.state.searchData
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
