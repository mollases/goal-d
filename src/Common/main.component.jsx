import React, {Component} from 'react';
import { Link } from 'react-router';

class Main extends Component {
  constructor(props) {
    super(props)
  }

    render(){
        let children = null;
        if (this.props.children) {
          children = React.cloneElement(this.props.children, {
            auth: this.props.route.auth //sends auth instance from route to children
          })
        }

        return(
            <div>
                <nav className="navbar navbar-default">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <Link to="/login"  className="navbar-brand" activeClassName="active">Goal-d</Link>
                        </div>
                        <div className="collapse navbar-collapse">
                            <ul className="nav navbar-nav">
                                <li><Link to={'/user/' + this.props.route.auth.getActiveUser()} activeClassName="active">user</Link></li>
                                <li><Link to="/about" activeClassName="active">about</Link></li>
                            </ul>
                        </div>
                    </div>
                </nav>
                <div className="row">
                    <div className="container col-md-offset-2 col-md-8">
                        {children}
                    </div>
                </div>
            </div>
        );
    }
}

export default Main
