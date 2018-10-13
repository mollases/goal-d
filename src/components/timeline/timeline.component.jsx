import React, { Component } from 'react'
import _ from 'lodash'

import AddElement from './add-element.component.jsx'
import Element from './element.component.jsx'

import Config from './../../services/config.service.jsx'

class Timeline extends Component {
  constructor (props) {
    super(props)
    this.state = {
      contents: []
    }
    this.renderElements = this.renderElements.bind(this)
    this.callRefresh = this.callRefresh.bind(this)
    this.renderElements = this.renderElements.bind(this)
  }

  callRefresh (nodeId, childNodes) {
    let that = this
    let _childNodes = _.keys(childNodes || this.props.childNodes || [])
    var children = _childNodes.join(',')

    Config.getUserTopicPostList(this.props.auth.getActiveUser(), this.props.topicId, nodeId, _childNodes)
      .then((response) => response.json())
      .then(response2 => {
        let sorted = _.sortBy(_.flatten(response2).map(JSON.parse), 'timestamp').reverse()
        _.forEach(sorted, (i) => {
          i.label = _.filter(children, { id: i.nodeId })[0] || ''
          if (i.label !== '') {
            i.label = i.label.label
          }
        })
        console.log(children)
        that.setState({ contents: sorted })
      })
  }

  componentDidMount () {
    this.callRefresh(this.props.nodeId)
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
          onSubmitPressed={this.callRefresh.bind(this.props.nodeId)}
          nodeId={this.props.nodeId}
          topicId={this.props.topicId}
          id={this.props.id} />
        <br />
        {this.renderElements()}
      </div>
    )
  }

  renderElements () {
    return this.state.contents.map((el, index) => {
      return (
        <div key={index}>
          <Element content={el} />
          <br />
        </div>
      )
    })
  }
}

export default Timeline
