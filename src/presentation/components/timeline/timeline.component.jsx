import React, { Component } from 'react'
import { connect } from 'react-redux'
import autoBind from 'react-autobind'

import AddElement from './add-element.component.jsx'
import Element from './element.component.jsx'

import { newNoteChange, postNodeNote, getNodeNotes } from './../../../actions/timeline.actions.jsx'

class Timeline extends Component {
  constructor (props) {
    super(props)
    autoBind(this)
  }

  callRefresh (nodeId, childNodes) {
    let _children = childNodes || this.props.childNodes
    let nodeChildrenIds = _children.map((v) => v.id())
    getNodeNotes(this.props.userId, this.props.topicId, nodeId, nodeChildrenIds, this.props.store.dispatch)
  }

  submitNewNote (nodeId) {
    let body = { body: this.props.newNoteContents, userId: this.props.userId, nodeId: this.props.nodeId, topicId: this.props.topicId }
    postNodeNote(this.props.userId, this.props.topicId, this.props.nodeId, body, this.props.store.dispatch)
  }

  componentDidMount () {
    this.callRefresh(this.props.nodeId)
  }

  onNewNoteChange (e) {
    this.props.store.dispatch(newNoteChange(e.target.value))
  }

  componentWillReceiveProps (nextProps) {
    let now = this.props.nodeId
    let future = nextProps.nodeId
    if (now !== future) {
      this.callRefresh(future, nextProps.childNodes)
    }
  }

  render () {
    return (
      <div>
        <AddElement
          value={this.props.newNoteContents}
          onChange={this.onNewNoteChange}
          onPost={this.submitNewNote} />
        <br />
        {this.renderElements()}
      </div>
    )
  }

  renderElements () {
    return this.props.contents.map((el, i) => {
      return (
        <div key={i}>
          <Element content={el} />
          <br />
        </div>
      )
    })
  }
}

const mapStateToProps = state => {
  return {
    newNoteContents: state.TimelineReducer.newNoteContents,
    contents: state.TimelineReducer.contents
  }
}

export default connect(mapStateToProps)(Timeline)
