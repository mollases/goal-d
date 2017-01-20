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
    var endpoint = '/user-details/'+this.props.id + '/post/' + this.props.node.id;
    var data = {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({'body':this.state.value,'id':this.props.id})
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
          <textarea value={this.state.value} onChange={this.handleChange} />
          <button onClick={this.onClickHandler}>
            add note
          </button>
        </div>
    );
  }
}

export default AddElement
