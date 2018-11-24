import React, { Component } from 'react'
import { connect } from 'react-redux'
import autoBind from 'react-autobind'
import classnames from 'classnames'

import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Collapse from '@material-ui/core/Collapse'
import IconButton from '@material-ui/core/IconButton'
import red from '@material-ui/core/colors/red'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Button from '@material-ui/core/Button'
import Input from '@material-ui/core/Input'

import { toggleEdit, storeData, newKey, newValue, updateKeyValue, updateKey } from './../../../actions/goal-node.actions.jsx'

const classes = theme => ({
  card: {
    maxWidth: 400
  },
  media: {
    height: 0,
    paddingTop: '56.25%'
  },
  actions: {
    display: 'flex'
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest
    }),
    marginLeft: 'auto',
    [theme.breakpoints.up('sm')]: {
      marginRight: -8
    }
  },
  expandOpen: {
    transform: 'rotate(180deg)'
  },
  avatar: {
    backgroundColor: red[500]
  }
})

const FAVORED = ['id', 'label']

const CardClosed = ({ label, expandClick, classes }) => (
  <Card className={classes.card}>
    <CardHeader
      title={label}
      action={
        <IconButton
          className={classnames(classes.expand, {
            [classes.expandOpen]: false
          })}
          onClick={expandClick}
          aria-expanded={false}
          aria-label='Show more'
        >
          <ExpandMoreIcon />
        </IconButton>
      }
    />
  </Card>
)

const CardOpened = ({ label, expandClick, renderExtra, classes }) => (
  <Card className={classes.card}>
    <CardHeader
      title={label}
      subheader='September 14, 2016'
      action={
        <IconButton
          className={classnames(classes.expand, {
            [classes.expandOpen]: true
          })}
          onClick={expandClick}
          aria-expanded
          aria-label='Show more'
        >
          <ExpandMoreIcon />
        </IconButton>
      }
    />
    {/* <CardActions className={classes.actions} disableActionSpacing /> */}
    <Collapse in timeout='auto' unmountOnExit>
      <CardContent>
        {/* <Typography> */}
        {renderExtra()}
        {/* </Typography> */}
      </CardContent>
    </Collapse>
  </Card>
)

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
    this.state = {
      expanded: false
    }
    autoBind(this)
  }

  handleExpandClick () {
    this.setState({ expanded: !this.state.expanded })
  }

  render () {
    return this.state.expanded
      ? <CardOpened
        label={this.props.label}
        expandClick={this.handleExpandClick}
        renderExtra={this.renderKV}
        classes={classes}
      />
      : <CardClosed
        label={this.props.label}
        expandClick={this.handleExpandClick}
        classes={classes}
      />
  }

  onAddKeyClicked () {
    this.props.store.dispatch(toggleEdit())
  }

  handleDataChange (key, v) {
    this.props.store.dispatch(updateKeyValue(key, v.target.value))
  }

  handleKeyChange (key, v) {
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
          : <Button className={this.props.button} onClick={this.onAddKeyClicked}>Add Attributes</Button>}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    node: state.GoalCanvasInterfaceReducer.selectedNode,
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
