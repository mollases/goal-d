import React, { Component } from 'react'
import _ from 'lodash'
import autoBind from 'react-autobind'

import AddElement from './add-element.component.jsx'
import Element from './element.component.jsx'

import Config from './../../../services/config.service.jsx'

class Timeline extends Component {
  constructor (props) {
    super(props)
    this.state = {
      contents: []
    }
    autoBind(this)
  }

  callRefresh (nodeId, childNodes) {
    let _children = childNodes || this.props.childNodes
    let _childNodes = _children.map((v) => v.data().id)
    var children = _childNodes.join(',')

    Config.getUserTopicPostList(this.props.userId, this.props.topicId, nodeId, _childNodes)
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
        this.setState({ contents: sorted })
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
          userId={this.props.userId}
          nodeId={this.props.nodeId}
          topicId={this.props.topicId} />
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
