import React, { Component } from 'react'
import { connect } from 'react-redux'
import autoBind from 'react-autobind'

import { Card, CardTitle, CardText } from 'material-ui/Card'
import Button from '@material-ui/core/Button'
import Input from '@material-ui/core/Input'
import { withStyles } from '@material-ui/core/styles'

import { toggleEdit, storeData, newKey, newValue } from './../../../actions/goal-node.actions.jsx'

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  input: {
    display: 'none'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  }
})

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
          title={this.props.node.data('label')}
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

  handleDataChange (key, value) {
    console.log(key)
    console.log(value)
  }

  storeData () {
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
    const data = this.props.node.data()
    const keys = Object.keys(data)
    let v = keys.map((k, i) => {
      if (FAVORED.indexOf(k) !== -1) {
        return
      }
      return (
        <div key={i}>
          <Input
            placeholder='attribute'
            value={k}
            onChange={(e) => this.handleKeyChange(k, e)}
            inputProps={{
              'aria-label': 'Description'
            }}
          /> :
          <Input
            placeholder='Value'
            value={data[k]}
            onChange={(e) => this.handleDataChange(k, e)}
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
    newValue: state.GoalNodeReducer.newValue
  }
}

export default connect(mapStateToProps)(withStyles(styles)(GoalNode))
