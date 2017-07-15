import React, { Component } from 'react'
import _ from 'lodash'
import cytoscape from 'cytoscape'
import coseBilkent from 'cytoscape-cose-bilkent'

import Config from '../Services/config.service.jsx'

import TextField from 'material-ui/TextField';
import {List, ListItem} from 'material-ui/List';
import Save from 'material-ui/svg-icons/content/save';
import ActionList from 'material-ui/svg-icons/action/list';

coseBilkent( cytoscape )
const config = new Config();
const iconStyles = {
  marginRight: 24,
};

class GoalCanvas extends Component {
  constructor(props) {
    super(props)
    this.state ={
      graph : {},
      showTips : true,
      map:{},
      
    }
    this.cy = {}
    this.layout = {}
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
    var elesJson = {
  nodes: [
    { data: { id: 'a', foo: 3, bar: 5, baz: 7 } },
    { data: { id: 'b', foo: 7, bar: 1, baz: 3 } },
    { data: { id: 'c', foo: 2, bar: 7, baz: 6 } },
    { data: { id: 'd', foo: 9, bar: 5, baz: 2 } },
    { data: { id: 'e', foo: 2, bar: 4, baz: 5 } }
  ],

  edges: [
    { data: { id: 'ae', weight: 1, source: 'a', target: 'e' } },
    { data: { id: 'ab', weight: 3, source: 'a', target: 'b' } },
    { data: { id: 'be', weight: 4, source: 'b', target: 'e' } },
    { data: { id: 'bc', weight: 5, source: 'b', target: 'c' } },
    { data: { id: 'ce', weight: 6, source: 'c', target: 'e' } },
    { data: { id: 'cd', weight: 2, source: 'c', target: 'd' } },
    { data: { id: 'de', weight: 7, source: 'd', target: 'e' } }
  ]
};
this.cy = cytoscape({
      container: document.getElementById('cy'),
      style: cytoscape.stylesheet()
        .selector('node')
          .css({
            'background-color': '#B3767E',
            'width': 'mapData(baz, 0, 10, 10, 40)',
            'height': 'mapData(baz, 0, 10, 10, 40)',
            'content': 'data(id)'
          })
        .selector('edge')
          .css({
            'line-color': '#F2B1BA',
            'target-arrow-color': '#F2B1BA',
            'width': 2,
            'target-arrow-shape': 'circle',
            'opacity': 0.8,
            'content': 'data(id)'
          })
        .selector(':selected')
          .css({
            'background-color': 'black',
            'line-color': 'black',
            'target-arrow-color': 'black',
            'source-arrow-color': 'black',
            'opacity': 1
          })
        .selector('.faded')
          .css({
            'opacity': 0.25,
            'text-opacity': 0
          }),

      elements: elesJson,

      layout: {
        name: 'random'
      },

      ready: function(){
        // ready 1
      }
  })

    // var graph = this.state.graph;
    // // {"nodes":[{"label":"power-map","root":true,"id":0},{"label":"connections with other people","id":1},{"label":"goals","id":2},{"label":"actionable items","id":3},{"label":"trend setters","id":4},{"label":"entreprenuers","id":5},{"label":"people in politics","id":6},{"label":"global changes","id":7},{"label":"students","id":8}],"edges":{"0":["0","1","2","3","7"],"1":["4","5","6","8"]}}
    let that = this;
    config.getUserTopic(this.props.id,this.props.topicId)
    .then(function(response) {
      response.json().then(function(jsn){
        if(jsn){
          that.setState({
            label:jsn.label,
            map:jsn.map
          })
        }
      })
      .catch(function(){
        return ''
      })
      .then(function(){
        that.layout = that.cy.layout({name: 'cose-bilkent'})
        var js = that.cy.json()
        js.elements = elesJson
        that.cy.json(js)
        that.layout.run()
      })
      .then(function(label){
        if(label && label !== '') {
          return;
        }
        config.getUserDetails(that.props.id).then(function(r){
          r.json().then(function(jsn){
            let label = jsn.topics.filter(function(el){
              if(el.id === parseInt(that.props.topicId)){
                return el
              }
            })[0].label
            that.setState({label:label});
          })
        })
      });
    });
  }

  postMap(){
    let body = {
      label: this.state.label,
      map :this.state.graph.condensed()
    };
    this.setState({map:body.map})
    config.postUserTopic(this.props.id,this.props.topicId,body)
  }

  componentWillUnmount(){
    this.postMap();
  }

  onNodeSelected(node){
    let findChildNodes = function(map,starting) {
      let getEdgeNodeDetails = function(nodes,ids){
        return ids.map(function(id){
          return _.find(nodes,{id:id});
        })
      }
      let stack = [starting];
      let childNodes = {};
      while(stack.length){
        let curr = stack.pop()
        let contained = _.filter(childNodes,{id:curr})
        if(contained.length === 0){
          childNodes[curr] = getEdgeNodeDetails(map.nodes,map.edges[curr] || []);
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
    this.props.onNodeSelected(node,children);
  }

  toggleTips() {
    let toggle = !this.state.showTips
    this.setState({showTips:toggle})
  }

  render() {
    return (
      <div>
      

        <div className="row">
          <h3 className="col-md-4">{this.state.label}</h3>
          <TextField
            className="col-md-4"
            floatingLabelText="graph!"
            value={this.state.searchData}
            onChange={this.handleChange}
          />
        </div>  
         <div className="row">
          <div
            className="col-md-4"
            id="cy"
            data-node={this.node}
          />
        </div>
        <div className="row">
          <Save style={iconStyles} onClick={this.postMap}/> <ActionList style={iconStyles} onClick={this.toggleTips}/>
        </div>
        <div className="row">
          {this.renderTips(this.state.showTips)}
        </div>
      </div>
    );
  }

  renderTips(show){
    return !show ? this.instructions.map(function(el,index){
      let grouping = el.details.map(function (el2,index2) {
        return (
          <ListItem primaryText={el2} key={index2}/>
        )
      });
      return (
            <div className="col-md-4" key={index}>
              <h4 className="text-center">{el.header}</h4>
              <List>
                {grouping}
              </List>
            </div>
            )
    }) : '';
  }
}

export default GoalCanvas
