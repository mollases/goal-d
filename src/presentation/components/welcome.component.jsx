import React from 'react'

import Grid from '@material-ui/core/Grid'

import GoalCanvas from './canvas/goal-canvas.component.jsx'
import companyDiagram from './canvas/companyDiagram.json'
import gameOfThrones from './canvas/gameOfThrones.json'
import architectureDiagram from './canvas/architectureDiagram.json'

const Welcome = () => (
  <div>
    <h1>Goal-d</h1>
    <h4>Create concept maps of almost anything!</h4>
    <Grid container spacing={24}>
      <Grid md={6} xs={12} lg={12} item>
        <GoalCanvas map={companyDiagram} id='companyDiagram' label='how do I start a company?' />
      </Grid>
      <Grid md={6} xs={12} lg={12} item>
        <GoalCanvas map={gameOfThrones} id='gameOfThrones' label='game of thrones?' />
      </Grid>
      <Grid md={6} xs={12} lg={12} item>
        <GoalCanvas map={architectureDiagram} id='architectureDiagram' label='Goal-d architecture diagram' />
      </Grid>
    </Grid>
  </div>
)

export default Welcome
