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
    console.log(evt)
    this.props.onSubmitPressed()
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
