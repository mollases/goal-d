import React, {Component} from 'react';
import Config from './../../Services/config.service.jsx';

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

var config = new Config();

class AddElement extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value:''
    }
    this.onClickHandler = this.onClickHandler.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  onClickHandler(evt){
    let body = {body:this.state.value,userId:this.props.id,nodeId:this.props.nodeId,topicId:this.props.topicId}
    let that = this;
    config.postUserTopicOnPost(this.props.id,this.props.topicId,this.props.nodeId,body)
    .then(() => {this.props.onSubmitPressed()})
    .then(() => {that.setState({value: ''});
    })
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  render(){
    return(
        <Card>
          <CardTitle title="Add an Element"/>
            <TextField
              value={this.state.value}
              onChange={this.handleChange}
              floatingLabelText="TODO: support Markdown"
              rows={5}
              multiLine={true}
              fullWidth={true}
            />
          <CardActions>
            <FlatButton label="Post" onClick={this.onClickHandler}/>
          </CardActions>
        </Card>
    );
  }
}

export default AddElement


        // <div>
        //   <textarea className="form-control" rows="3" value={this.state.value} onChange={this.handleChange} />
        //   <button type="button" className="btn btn-default btn-sm">
        //     <span className="glyphicon glyphicon-pushpin" aria-hidden="true"></span> Pin Note
        //   </button>
        // </div>
