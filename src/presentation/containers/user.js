import React, { Component } from 'react'
import { connect } from 'react-redux'
import autoBind from 'react-autobind'

import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import List from '@material-ui/core/List'

import _ from 'lodash'

import { UserTopic } from '../components/user'
import { getTopics, postTopic, updateSearchParam } from '../../actions/user.js'
// import UserCard from './../components/user/user-card.component.js'

class User extends Component {
  constructor (props) {
    super(props)
    autoBind(this)
  }

  handleChange (event) {
    this.props.store.dispatch(updateSearchParam(event.target.value))
  }

  refreshMaps () {
    return getTopics(this.props.user, this.props.store.dispatch)
  }

  componentWillMount () {
    this.refreshMaps()
  }

  saveNewMap () {
    let search = this.props.searchData.trim()
    if (!search) {
      return
    }

    let topics = this.props.topics
    topics.push({
      id: topics.length,
      label: search,
      note: '',
      time: Date.now()
    })
    postTopic(topics, this.props.user, this.props.store.dispatch)
  }

  saveNote (id, note) {
    let content = note.trim()
    let topics = this.props.topics
    let topic = _.find(topics, { id })
    topic.note = content
    postTopic(topics, this.props.user, this.props.store.dispatch)
  }

  deleteTopic (id) {}

  render () {
    return (
      <div className='row col-md-12'>
        {/* <div className='col-sm-6 col-md-4'>
          <UserCard />
        </div> */}
        <div className='col-sm-6 col-md-7 col-md-offset-1'>
          <div className='row'>
            <TextField
              label='Search or add...'
              value={this.props.searchData}
              onChange={this.handleChange}
              variant='outlined'
            />
            <Button onClick={this.saveNewMap} >Add a topic</Button>
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
    if (!this.props.topics) {
      return
    }

    let userId = this.props.user
    let topics = this.props.topics
    let search = this.props.searchData
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
          <div key={el.id}>
            <UserTopic userId={userId} el={el} saveNote={this.saveNote} deleteTopic={this.deleteTopic} />
            <br />
          </div>
        )
      }
    })
  }
}

const mapStateToProps = state => {
  return {
    searchData: state.UserReducer.searchData,
    topics: state.UserReducer.topics
  }
}

export default connect(mapStateToProps)(User)
