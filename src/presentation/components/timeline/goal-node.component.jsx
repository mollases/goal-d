import React, { Component } from 'react'
import { connect } from 'react-redux'
import autoBind from 'react-autobind'

import { Card, CardTitle, CardText } from 'material-ui/Card'
import Button from '@material-ui/core/Button'
import Input from '@material-ui/core/Input'

import { toggleEdit, storeData, newKey, newValue, updateKeyValue, updateKey } from './../../../actions/goal-node.actions.jsx'

const FAVORED = ['id', 'label']

const CustomInput = ({ key, keyChange, value, valueChange, store }) => (
  <div>
    <Input
      placeholder='attribute'
      value={key}
      onChange={keyChange}
      inputProps={{
        'aria-label': 'Description'
      }}
    /> :
    <Input
      placeholder='Value'
      value={value}
      onChange={valueChange}
      inputProps={{
        'aria-label': 'Description'
      }}
    />

    <Button onClick={store}>Store</Button>
  </div>
)

class GoalNode extends Component {
  constructor (props) {
    super(props)
    autoBind(this)
  }

  render () {
    return (
      <Card>
        <CardTitle
          title={this.props.label}
          actAsExpander
          showExpandableButton
        />
        <CardText expandable>
          {this.renderKV()}
        </CardText>
      </Card>
    )
  }

  onAddKeyClicked () {
    this.props.store.dispatch(toggleEdit())
  }

  handleDataChange (key, v) {
    console.log(key)
    console.log(v.target.value)
    this.props.store.dispatch(updateKeyValue(key, v.target.value))
  }

  handleKeyChange (key, v) {
    console.log(key)
    console.log(v.target.value)
    this.props.store.dispatch(updateKey(key, v.target.value))
  }

  storeData () {
    this.props.node.data(this.props.nodeData)
    this.props.node.data(this.props.newKey, this.props.newValue)
    this.props.store.dispatch(storeData())
  }

  newKey (e) {
    this.props.store.dispatch(newKey(e.target.value))
  }

  newValue (e) {
    this.props.store.dispatch(newValue(e.target.value))
  }

  renderKV () {
    const data = this.props.nodeData
    let v = data.map((k, i) => {
      if (FAVORED.indexOf(k.key) !== -1) {
        return
      }
      return (
        <div key={i}>
          <Input
            placeholder='attribute'
            value={k.key}
            onChange={(e) => this.handleKeyChange(k.key, e)}
            inputProps={{
              'aria-label': 'Description'
            }}
          /> :
          <Input
            placeholder='Value'
            value={k.val}
            onChange={(e) => this.handleDataChange(k.key, e)}
            inputProps={{
              'aria-label': 'Description'
            }}
          />
        </div>
      )
    })

    return (
      <div>
        {v}

        {this.props.editMode
          ? <CustomInput
            key={this.props.key}
            value={this.props.value}
            keyChange={this.newKey}
            valueChange={this.newValue}
            store={this.storeData}
          />
          : <Button className={this.props.button} onClick={this.onAddKeyClicked}>Key</Button>}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    node: state.GoalCanvasReducer.selectedNode,
    editMode: state.GoalNodeReducer.editMode,
    newKey: state.GoalNodeReducer.newKey,
    newValue: state.GoalNodeReducer.newValue,
    nodeData: state.GoalNodeReducer.nodeData
  }
}

const merger = (defaultState, dispatcher, passed) => {
  let data = passed.node.data()
  let keys = Object.keys(data)
  let nodeData = keys.map((k) => { return { key: k, val: data[k] } })
  return Object.assign({}, passed, defaultState, { nodeData })
}

export default connect(mapStateToProps, null, merger)(GoalNode)
