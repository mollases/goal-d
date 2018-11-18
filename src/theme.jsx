const primary = '#76579C'
const secondary = '#A0B742'
const context = '#44e0db'
const background = '#e8e8e830'

const theme = {
  palette: {
    primary: { main: primary },
    secondary: { main: secondary }
  },
  status: {
    danger: 'orange'
  },
  typography: {
    useNextVariants: true,
    fontSize: 18
  },
  cy: {
    primary,
    secondary,
    context,
    background
  }
}

export default theme
