import React, { Component } from 'react'
import SpringyUI from './springy-ui.component.jsx'

class GoalCanvas extends Component {
  constructor(props) {
    super(props)
    this.state ={
      graph : new Springy.Graph(),
      showTips : true,
      map:{}
    }
    this.onNodeSelected =this.onNodeSelected.bind(this)
    this.renderTips = this.renderTips.bind(this)
    this.postMap = this.postMap.bind(this)
    this.toggleTips = this.toggleTips.bind(this)
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
        "click an entry and start typing",
        "click an entry and scroll down"
      ]
    },]
  }

  componentDidMount() {
    var graph = this.state.graph;
    // {"nodes":[{"label":"power-map","root":true,"id":0},{"label":"connections with other people","id":1},{"label":"goals","id":2},{"label":"actionable items","id":3},{"label":"trend setters","id":4},{"label":"entreprenuers","id":5},{"label":"people in politics","id":6},{"label":"global changes","id":7},{"label":"students","id":8}],"edges":{"0":["0","1","2","3","7"],"1":["4","5","6","8"]}}
    let that = this;
    fetch('/user-details/'+this.props.id+'/topic/'+this.props.topicId)
    .then(function(response) {
      response.json().then(function(jsn){
        let pjsn = JSON.parse(jsn)
        if(pjsn){
          that.setState({
            label:pjsn.label,
            map:pjsn.map
          })
        }
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
            let label = pjs.topics.filter(function(el){
              if(el.id === parseInt(that.props.topicId)){
                return el
              }
            })[0].label

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

  postMap(){
    let body = {
      label: this.state.label,
      map :this.state.graph.condensed()
    };
    let that = this;
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
    .then(function(){
      that.setState({map:body.map})
    })
  }

  componentWillUnmount(){
    this.postMap();
  }

  onNodeSelected(node){
    let findChildNodes = function(map,starting) {
      let stack = map.edges[starting] || [];
      let childNodes = [];
      while(stack.length){
        let curr = parseInt(stack.pop())
        let contained = childNodes.lastIndexOf(curr)
        if(contained === -1){
          childNodes.push(curr)
          stack = stack.concat(map.edges[curr] || [])
        }
      }
      return childNodes;
    }

    let mapContents = this.state.graph.condensed();
    let children = [];
    if(node){
      children = findChildNodes(mapContents,node.id)
    }
    console.log(children)
    this.props.onNodeSelected(node,children);
  }

  toggleTips() {
    let toggle = !this.state.showTips
    this.setState({showTips:toggle})
  }

  render() {
    return (
      <div>
      <h3>{this.state.label}</h3>
        <canvas className="goald" tabIndex="0" id = "goal-d"
          data-node={this.node}
          width={this.props.width}
          height={this.props.height}
        />
        <div>
          <span onClick={this.postMap}>save</span>|<span onClick={this.toggleTips}>tips</span>
        </div>
        {this.state.showTips ?
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
