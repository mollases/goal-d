import React, {Component} from 'react';
import { Link } from 'react-router';

class Main extends Component {
  constructor(props) {
    super(props)
  }

    render(){
        return(
            <div>
                <nav className="navbar navbar-default">
                    <div className="container-fluid">
                        <div className="navbar-header">
                        <Link to="/"  className="navbar-brand" activeClassName="active">Goal-d</Link>
                        </div>
                        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                            <ul className="nav navbar-nav">
                                <li><Link to={'/user/' + this.props.params.id} activeClassName="active">user</Link></li>
                                <li><Link to={'/user/' + this.props.params.id + '/map'} activeClassName="active">map</Link></li>
                                <li><Link to="/about" activeClassName="active">about</Link></li>
                            </ul>
                        </div>
                    </div>
                </nav>
                <div className="container">
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default Main
