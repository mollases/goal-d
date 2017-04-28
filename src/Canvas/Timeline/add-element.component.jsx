import React, {Component} from 'react';
import Config from './../../Services/config.service.jsx';

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
        <div>
          <textarea className="form-control" rows="3" value={this.state.value} onChange={this.handleChange} />
          <button type="button" className="btn btn-default btn-sm" onClick={this.onClickHandler}>
            <span className="glyphicon glyphicon-pushpin" aria-hidden="true"></span> Pin Note
          </button>
        </div>
    );
  }
}

export default AddElement
