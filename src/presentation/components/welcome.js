import React from 'react'

import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import { NavLink } from 'react-router-dom'
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

import { GoalCanvasExample } from './canvas'
import companyDiagram from './canvas/companyDiagram.json'
import gameOfThrones from './canvas/gameOfThrones.json'
import architectureDiagram from './canvas/architectureDiagram.json'

const style = {
  centerFit: {
    width: '100%',
    height: 'auto'
  },
  centered: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  },
  text: {
    'fontSize': '20px',
    'left': '50%',
    '-webkit-transform': 'translate(-50%, -50%)',
    '-ms-transform': 'translate(-50%, -50%)',
    'transform': 'translate(-50%, -50%)',
    'textAlign': 'center'
  },
  textGrouping: {
    textAlign: 'center'
  }
}

const Welcome = ({ classes }) => (
  <Grid container spacing={24}>
    <Grid xs={12} item className='magiccontainer'>
      <img src='demo.gif' height={'80%'} className={classes.centerFit} />
      <div className='overlay'>
        <NavLink to={'/demo'} activeClassName='active' className={classes.centered}>
          <Button className={classes.text}>click for a demo</Button>
        </NavLink>
      </div>
    </Grid>
    <Grid container>
      <Grid md={6} sm={12} lg={6} item>
        <GoalCanvasExample map={gameOfThrones} id='gameOfThrones' label='who knows who?' />
      </Grid>
      <Grid md={6} sm={12} lg={6} item>
        <Typography variant='h5' gutterBottom className={classes.textGrouping}>For Students</Typography>
        <List>
          <ListItem><ListItemText>Determine how all of the facets of your project connect to each other</ListItemText></ListItem>
          <ListItem><ListItemText>Find out who knows who and how they're connected</ListItemText></ListItem>
        </List>
      </Grid>
    </Grid>
    <Grid container>
      <Grid md={6} sm={12} lg={6} item>
        <Typography variant='h5' gutterBottom className={classes.textGrouping}>For Project Managers</Typography>
        <List>
          <ListItem><ListItemText>Explore the contract you intend to get into before its too late</ListItemText></ListItem>
          <ListItem><ListItemText>Find where all of your resources are and who can make moves using those resources</ListItemText></ListItem>
        </List>
      </Grid>
      <Grid md={6} sm={12} lg={6} item>
        <GoalCanvasExample map={companyDiagram} id='companyDiagram' label='' />
      </Grid>
    </Grid>
    <Grid container>
      <Grid md={6} sm={12} lg={6} item>
        <GoalCanvasExample map={architectureDiagram} id='architectureDiagram' label='' />
      </Grid>
      <Grid md={6} sm={12} lg={6} item>
        <Typography variant='h5' gutterBottom className={classes.textGrouping}>For Engineers</Typography>
        <List>
          <ListItem><ListItemText>Determine how all of your projects dependencies connect to each other</ListItemText></ListItem>
          <ListItem><ListItemText>Add attributes like project owners, team locations or their architecture diagrams</ListItemText></ListItem>
        </List>
      </Grid>
    </Grid>
  </Grid>
)

export default withStyles(style)(Welcome)
