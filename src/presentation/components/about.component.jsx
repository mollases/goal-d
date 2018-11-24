import React from 'react'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

const About = () => (
  <div>
    <h3>About</h3>
    <p>
      Goal-D was inspired by all of the different ways data can be represented for better understanding.
    </p>
    <br />
    <h4>The technology behind the project includes:</h4>
    <List>
      <ListItem><ListItemText>cytoscape for the graphing engine</ListItemText></ListItem>
      <ListItem><ListItemText>Material UI as the UI framework</ListItemText></ListItem>
      <ListItem><ListItemText>React as the front end framework</ListItemText></ListItem>
      <ListItem><ListItemText>Auth0 for authentication</ListItemText></ListItem>
      <ListItem><ListItemText>AWS</ListItemText></ListItem>
      <ListItem><ListItemText>cloudfront for distribution</ListItemText></ListItem>
      <ListItem><ListItemText>s3 for file hosting</ListItemText></ListItem>
      <ListItem><ListItemText>lambdas for compute cycles</ListItemText></ListItem>
      <ListItem><ListItemText>dynamodb for storage</ListItemText></ListItem>
    </List>
  </div>
)

export default About
