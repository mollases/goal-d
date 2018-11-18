import React from 'react'

import Grid from '@material-ui/core/Grid'

import GoalCanvas from './canvas/goal-canvas.component.jsx'
import companyDiagram from './canvas/companyDiagram.json'

const Welcome = () => (
  <div>
    <h1>Goal-d</h1>
    <h4>With Goal-d, you can create relationship maps of almost anything!</h4>
    <Grid container spacing={24}>
      <Grid md={6} xs={12} lg={12} item>
        <GoalCanvas map={companyDiagram} id='companyDiagram' label='how do I start a company?' />
      </Grid>
      {/* <Grid md={6} xs={12} lg={12} item>
        <GoalCanvas map={[]} id='aNewProject' label='how do I help reduce climate change?' />
      </Grid>
      <Grid md={6} xs={12} lg={12} item>
        <GoalCanvas map={[]} id='peopleInTouch' label='how are people related?' />
      </Grid> */}
    </Grid>
  </div>
)

export default Welcome
