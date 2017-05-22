import React, {Component} from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import {green600, amber600, blueGrey600 ,red600} from 'material-ui/styles/colors';


const styles = {
  completed: {
    color: green600,
  },
  active: {
    color: amber600,
  },
  hold: {
    color: blueGrey600,
  },
  discontinued: {
    color: red600,
  },
};

class GoalNode extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Card>
        <CardHeader
          title={this.props.node.label}
          subtitle="Subtitle"
          actAsExpander={true}
          showExpandableButton={true}
        />
        <CardActions>
          <FlatButton className="btn btn-default btn-success" style={styles.completed} label="Completed" />
          <FlatButton className="btn btn-default btn-warning" style={styles.active} label="Active" />
          <FlatButton className="btn btn-default btn-hold" style={styles.hold} label="On Hold" />
          <FlatButton className="btn btn-default btn-danger" style={styles.discontinued} label="Discontinued" />
        </CardActions>
        <CardText expandable={true}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
          Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
          Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
        </CardText>
      </Card>
    );
  }
}

export default GoalNode;