import React, { Component } from 'react';
import { Link } from 'react-router';
import Config from '../Services/config.service.jsx'

const config = new Config();


class User extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchData: '',
      newMap:false,
      topics: [],
      name:'Admas'
    };
    if(this.props.params.id === 'undefined') {
      this.props.params.id = this.props.auth.getActiveUser()
    }
    this.renderMaps = this.renderMaps.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleNameChange = this.handleNameChange.bind(this)
    this.saveNewMap = this.saveNewMap.bind(this)
    this.refreshMaps = this.refreshMaps.bind(this)
  }

  handleNameChange(event) {
    this.setState({name: event.target.value});
  }

  handleChange(event) {
    this.setState({searchData: event.target.value});
  }

  refreshMaps(){
    let that = this;
    config.getUserDetails(this.props.params.id)
    .then(function(response){
      response.json().then(function(jsn){
        let rsp = JSON.parse(jsn);
        that.setState({topics: rsp.topics || []});
      })
    })
  }

  componentWillMount(){
    this.refreshMaps();
  }

  saveNewMap(){
    let topic = this.state.searchData.trim();
    let that = this;
    let refreshMaps = this.refreshMaps;

    if(!topic){
      return;
    }

    let topics = this.state.topics;
    topics.push({
      id : topics.length,
      label: topic,
      time:Date.now()
    });
    config.postUserDetails(this.props.params.id,{topics:topics})
    .then(refreshMaps).then(function(){
      that.setState({
        searchData: '',
        newTopic:''
      });
    })
  }

  render(){
    return (
      <div className="row">
        <div className="col-sm-6 col-md-4">
          <div className="row">
              <div className="thumbnail">
                <img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9InllcyI/PjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMjQyIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDI0MiAyMDAiIHByZXNlcnZlQXNwZWN0UmF0aW89Im5vbmUiPjwhLS0KU291cmNlIFVSTDogaG9sZGVyLmpzLzEwMCV4MjAwCkNyZWF0ZWQgd2l0aCBIb2xkZXIuanMgMi42LjAuCkxlYXJuIG1vcmUgYXQgaHR0cDovL2hvbGRlcmpzLmNvbQooYykgMjAxMi0yMDE1IEl2YW4gTWFsb3BpbnNreSAtIGh0dHA6Ly9pbXNreS5jbwotLT48ZGVmcz48c3R5bGUgdHlwZT0idGV4dC9jc3MiPjwhW0NEQVRBWyNob2xkZXJfMTU5ZTJiMTUxZmUgdGV4dCB7IGZpbGw6I0FBQUFBQTtmb250LXdlaWdodDpib2xkO2ZvbnQtZmFtaWx5OkFyaWFsLCBIZWx2ZXRpY2EsIE9wZW4gU2Fucywgc2Fucy1zZXJpZiwgbW9ub3NwYWNlO2ZvbnQtc2l6ZToxMnB0IH0gXV0+PC9zdHlsZT48L2RlZnM+PGcgaWQ9ImhvbGRlcl8xNTllMmIxNTFmZSI+PHJlY3Qgd2lkdGg9IjI0MiIgaGVpZ2h0PSIyMDAiIGZpbGw9IiNFRUVFRUUiLz48Zz48dGV4dCB4PSI4OS44NTkzNzUiIHk9IjEwNS4xIj4yNDJ4MjAwPC90ZXh0PjwvZz48L2c+PC9zdmc+"/>
                <div className="caption">
                  <input type="text" className="form-control" placeholder="Update your name" value={this.state.name} onChange={this.handleNameChange}/>
                  <h3>{this.state.name}</h3>
                  <p>Just some filler text</p>
                </div>
              </div>
            </div>
            <div className="row">
              <button type="button" className="btn btn-default btn-danger">Save</button>
            </div>
          </div>
          <div className="col-sm-6 col-md-7 col-md-offset-1">
            <div className="row input-group">
              <input type="text" className="form-control" placeholder="Search or add..." value={this.state.searchData} onChange={this.handleChange}/>
              <span className="input-group-btn">
                <button className="btn btn-success" type="button" onClick={this.saveNewMap}>New</button>
              </span>
            </div>
            <div className="row">
              <div className="list-group">
                {this.renderMaps()}
              </div>
            </div>
          </div>
        </div>
      );
  }

  renderMaps(){
    if (!this.state.topics){
      return
    }

    let userId = this.props.params.id;
    let topics = this.state.topics;
    let search = this.state.searchData;
    topics.sort(function(a,b){
      if(a.time > b.time){
        return -1
      } else if(a.time < b.time){
        return 1
      }
      return 0
    })

    return topics.map(function(el,index,all){
      let show = search === '' || el.label.indexOf(search) !== -1;
      if (show){
        return (
          <div className="list-group-item" aria-label="Left Align" key={el.id}>
              <Link to={'/user/' + userId + '/map/' + el.id}>
                {el.label}
              </Link>
          </div>
          )
      }
    });
  }
}

export default User
