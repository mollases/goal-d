import React, { Component } from 'react'
import SpringyUI from './springy-ui.component.jsx'

class GoalCanvas extends Component {
  constructor(props) {
    super(props)
    this.state ={
      graph : new Springy.Graph(),
      focused : true
    }
    this.onNodeSelected =this.onNodeSelected.bind(this)
    this.onKeyPressAction = this.onKeyPressAction.bind(this)
    this.onFocus = this.onFocus.bind(this)
    this.onBlur = this.onBlur.bind(this)
    this.renderTips = this.renderTips.bind(this)
    this.instructions = [{
      header: "Adding",
      details: [
        "double click above to make an entry",
        "double click an entry to make a new entry connected to the first entry",
        "click a entry, shift click another entry to connect the two with a line"
      ]
    },{
      header: "Removing",
      details: [
        "right click a line to delete it",
        "right click an entry to delete it",
        "click an entry, shift + backspace to delete it"
      ]
    },{
      header: "Editing",
      details: [
        "click a entry and start typing"
      ]
    },]
  }

  onKeyPressAction(e) {
    console.log(e);
  }

  componentDidMount() {
    var graph = this.state.graph;
    // {"nodes":[{"label":"power-map","root":true,"id":0},{"label":"connections with other people","id":1},{"label":"goals","id":2},{"label":"actionable items","id":3},{"label":"trend setters","id":4},{"label":"entreprenuers","id":5},{"label":"people in politics","id":6},{"label":"global changes","id":7},{"label":"students","id":8}],"edges":{"0":["0","1","2","3","7"],"1":["4","5","6","8"]}}
    let that = this;
    fetch('/user-details/'+this.props.id+'/topic/'+this.props.topicId)
    .then(function(response) {
      response.json().then(function(jsn){
        let pjsn = JSON.parse(jsn)
        that.setState({
          map:pjsn.map,
          label:pjsn.label
        })
        if(jsn){
          graph.loadJSON2(that.state.map);
        }
        return that.label;
      }).then(function(label){
        if(label && label !== '') {
          return;
        }
        fetch('/user-details/'+that.props.id).then(function(r){
          r.json().then(function(js){
            let pjs = JSON.parse(js)
            let label = pjs.filter(function(el){
              return el.id === that.props.topicId
            })

            that.setState({label:label});
          })
        })
      });
    });

    SpringyUI({
      id: '#goal-d',
      graph: this.state.graph,
      stiffness: 25,
      repulsion: 800,
      damping: .7,
      minEnergyThreshold: 0.0001,
      nodeSelected: that.onNodeSelected,
      nodeDeselected: function() {
        that.nodeSelected(null);
      }
    });
  }

  componentWillUnmount(){
    let body = {
      label: this.state.label,
      map :this.state.graph.condensed()
    };
    fetch('/user-details/'+this.props.id+'/topic/'+this.props.topicId,
    {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(body)
    })
    .then(function(res){ console.log(res) })
  }

  onNodeSelected(node){
    this.props.onNodeSelected(node);
    console.log(node);
  }

  onBlur() {
    this.setState({ focused: false })
  }

  onFocus() {
      this.setState({ focused: true })
  }

  render() {
    return (
      <div >
        <canvas className="goald" tabIndex="0" id = "goal-d"
          data-node={this.node}
          width={this.props.width}
          height={this.props.height}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
        />
        {this.state.focused ?
          <div className="row">
            {this.renderTips()}
          </div>
          :null
        }
      </div>
    );
  }

  renderTips(){
    return this.instructions.map(function(el,index){
      let grouping = el.details.map(function (el2,index2) {
        return (
          <li className="list-group-item" key={index + '-' + index2}>{el2}</li>
        )
      });
      return (
            <div className="col-md-4" key={index}>
              <h4 className="text-center">{el.header}</h4>
              <ul className="list-group">
                {grouping}
              </ul>
            </div>
            )
    });
  }
}

export default GoalCanvas
