import React, { Component } from 'react';
import { Link } from 'react-router';
import Config from '../Services/config.service.jsx'
import TextField from 'material-ui/TextField';
import {orange500, blue500} from 'material-ui/styles/colors';
import UserCard from './user-card.component.jsx'
import FlatButton from 'material-ui/FlatButton';
import {List, ListItem} from 'material-ui/List';

const styles = {
  errorStyle: {
    color: orange500,
  },
  underlineStyle: {
    borderColor: orange500,
  },
  floatingLabelStyle: {
    color: orange500,
  },
  floatingLabelFocusStyle: {
    color: blue500,
  },
};

const config = new Config();

class User extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchData: '',
      newMap:false,
      topics: []
    };
    if(this.props.params.id === 'undefined') {
      this.props.params.id = this.props.auth.getActiveUser()
    }
    this.renderMaps = this.renderMaps.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.saveNewMap = this.saveNewMap.bind(this)
    this.refreshMaps = this.refreshMaps.bind(this)
  }

  handleChange(event) {
    this.setState({searchData: event.target.value});
  }

  refreshMaps(){
    let that = this;
    config.getUserDetails(this.props.params.id)
    .then(function(response){
      response.json().then(function(jsn){
        that.setState({topics: jsn.topics || []});
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
          <UserCard />
        </div>
        <div className="col-sm-6 col-md-7 col-md-offset-1">
          <div className="row">
            <TextField
              floatingLabelText="Search or add..."
              floatingLabelStyle={styles.floatingLabelStyle}
              floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
              value={this.state.searchData}
              onChange={this.handleChange}
              fullWidth={false}
            />
            <FlatButton label="New" onClick={this.saveNewMap}/>
          </div>
          <div className="row">
            <List>
              {this.renderMaps()}
            </List>
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
            <Link to={'/user/' + userId + '/map/' + el.id} key={el.id}>
              <ListItem primaryText={el.label} />
            </Link>
          )
      }
    });
  }
}

export default User
