import React, { Component } from 'react'
import { connect } from 'react-redux'
import autoBind from 'react-autobind'

import AddElement from './add-element.component.jsx'
import Element from './element.component.jsx'

import { newNoteChange, postNodeNote, getNodeNotes } from './../../../actions/timeline.actions.jsx'
import uuid from 'uuid'

class Timeline extends Component {
  constructor (props) {
    super(props)
    autoBind(this)
  }

  callRefresh () {
    let nodeChildrenIds = this.props.childNodes.map(e => e.id)
    nodeChildrenIds.push(this.props.nodeId)
    getNodeNotes(this.props.userId, this.props.topicId, this.props.nodeId, nodeChildrenIds, this.props.store.dispatch)
  }

  submitNewNote () {
    let body = { noteId: uuid(), body: this.props.newNoteContents, userId: this.props.userId, nodeId: this.props.nodeId, topicId: this.props.topicId }
    postNodeNote(this.props.userId, this.props.topicId, this.props.nodeId, body, this.props.store.dispatch)
      .then(this.callRefresh)
  }

  componentDidMount () {
    this.callRefresh()
  }

  componentDidUpdate (prevProps) {
    if (this.props.nodeId !== prevProps.nodeId) {
      this.callRefresh()
    }
  }

  onNewNoteChange (e) {
    this.props.store.dispatch(newNoteChange(e.target.value))
  }

  render () {
    let elem = this.props.contents.map((el) => {
      if (el.nodeId === this.props.nodeId) {
        // el.label = this.props.label
        return el
      }
      for (let i = 0; i < this.props.childNodes.length; i++) {
        if (el.nodeId === this.props.childNodes[i].id) {
          el.label = this.props.childNodes[i].label
          return el
        }
      }
      return el
    })

    let elements = elem.map((el, i) => {
      return (
        <div key={i}>
          <Element
            label={el.label}
            timestamp={el.timestamp}
            body={el.body}
          />
          <br />
        </div>
      )
    })

    return (
      <div>
        <AddElement
          value={this.props.newNoteContents}
          onChange={this.onNewNoteChange}
          onPost={this.submitNewNote} />
        <br />
        {elements}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    newNoteContents: state.TimelineReducer.newNoteContents,
    contents: state.TimelineReducer.contents
  }
}

const merger = (defaultState, dispatcher, passed) => {
  return Object.assign({}, passed, defaultState)
}
export default connect(mapStateToProps, null, merger)(Timeline)
