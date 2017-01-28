import React, { Component } from 'react';
import { Link } from 'react-router';

class User extends Component {
  constructor(props) {
    super(props)
    this.state = {
        userData: ''
    };
    this.renderMaps = this.renderMaps.bind(this)
  }

  componentWillMount(){
    fetch('/user-details/'+this.props.params.id).then(function(res){ console.log(res) })
  }

  render(){
    return (
        <div className="row">
          <div className="col-sm-6 col-md-4">
            <button type="button" className="btn btn-default btn-danger">Save</button>
          </div>
          <div className="col-sm-6 col-md-8">
            <div className="input-group">
              <input type="text" className="form-control" placeholder="Search for..."/>
              <span className="input-group-btn">
                <button className="btn btn-secondary" type="button">Go!</button>
              </span>
            </div>
          </div>
          <div className="col-sm-6 col-md-4">
            <div className="thumbnail">
              <img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9InllcyI/PjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMjQyIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDI0MiAyMDAiIHByZXNlcnZlQXNwZWN0UmF0aW89Im5vbmUiPjwhLS0KU291cmNlIFVSTDogaG9sZGVyLmpzLzEwMCV4MjAwCkNyZWF0ZWQgd2l0aCBIb2xkZXIuanMgMi42LjAuCkxlYXJuIG1vcmUgYXQgaHR0cDovL2hvbGRlcmpzLmNvbQooYykgMjAxMi0yMDE1IEl2YW4gTWFsb3BpbnNreSAtIGh0dHA6Ly9pbXNreS5jbwotLT48ZGVmcz48c3R5bGUgdHlwZT0idGV4dC9jc3MiPjwhW0NEQVRBWyNob2xkZXJfMTU5ZTJiMTUxZmUgdGV4dCB7IGZpbGw6I0FBQUFBQTtmb250LXdlaWdodDpib2xkO2ZvbnQtZmFtaWx5OkFyaWFsLCBIZWx2ZXRpY2EsIE9wZW4gU2Fucywgc2Fucy1zZXJpZiwgbW9ub3NwYWNlO2ZvbnQtc2l6ZToxMnB0IH0gXV0+PC9zdHlsZT48L2RlZnM+PGcgaWQ9ImhvbGRlcl8xNTllMmIxNTFmZSI+PHJlY3Qgd2lkdGg9IjI0MiIgaGVpZ2h0PSIyMDAiIGZpbGw9IiNFRUVFRUUiLz48Zz48dGV4dCB4PSI4OS44NTkzNzUiIHk9IjEwNS4xIj4yNDJ4MjAwPC90ZXh0PjwvZz48L2c+PC9zdmc+" alt="..."/>
              <div className="caption">
                <h3>Admas</h3>
                <p>Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.</p>
                <p>
                  <a href="#" className="btn btn-primary" role="button">Button</a>
                  <a href="#" className="btn btn-default" role="button">Button</a>
                </p>
              </div>
            </div>
          </div>
          <div className="col-sm-6 col-md-8">
            <div className="list-group">
              {this.renderMaps()}
            </div>
          </div>
        </div>
      );
  }

  renderMaps(){
    let maps = [1,2,3,4,5];
    let that = this;

    return maps.map(function(el,index,all){
      let e = JSON.parse(el);
      return (
        <div className="list-group-item" aria-label="Left Align" key={el}>
            <Link to={'/user/' + (that.props.params.id || 1) + '/map/' + el}>
              Cras justo odio {el}
            </Link>
          <span className="badge">14</span>
        </div>
        )
    });
  }
}

export default User
