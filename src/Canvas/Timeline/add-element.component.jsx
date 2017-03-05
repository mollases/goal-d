import React, {Component} from 'react';

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
    var endpoint = '/user-details/'+this.props.id + '/topic/' + this.props.topicId + '/post/' + this.props.nodeId;
    var data = {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({body:this.state.value,userId:this.props.id,nodeId:this.props.nodeId,topicId:this.props.topicId})
    }
    let that = this;
    fetch(endpoint,data)
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
