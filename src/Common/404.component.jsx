import React, {Component} from 'react';
import { Link } from 'react-router';

class PageNotFound extends Component {
  constructor(props) {
    super(props)
  }

    render(){
        return(
            <div> Oh no! 404, go <Link to="/login" activeClassName="active">home</Link> </div>
        );
    }
}

export default PageNotFound
