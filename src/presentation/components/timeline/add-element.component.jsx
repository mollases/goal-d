import React from 'react'

import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import CardActions from '@material-ui/core/CardActions'

const classes = theme => ({
  card: {
    display: 'flex'
  },
  details: {
    display: 'flex',
    flexDirection: 'column'
  },
  content: {
    flex: '1 0 auto'
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  },
  dense: {
    marginTop: 19
  },
  menu: {
    width: 200
  }
})

const AddElement = ({ value, onChange, onPost }) => (
  <Card className={classes.card}>
    <div className={classes.details}>
      <CardContent className={classes.content}>
        <Typography variant='h4'>
          Add an Element
        </Typography>
        <Typography variant='h5'>
          <TextField
            value={value}
            onChange={onChange}
            label='TODO: support Markdown'
            placeholder='Placeholder'
            fullWidth
            multiline
            className={classes.textField}
            margin='normal'
          />
        </Typography>
      </CardContent>
      <CardActions>
        <Button color='primary'>
          Post
        </Button>
      </CardActions>
    </div>
  </Card>
)

export default AddElement
