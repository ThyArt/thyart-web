import { drawerWidth, transition } from 'assets/jss/material-dashboard-react';

const appStyle = theme => ({
  wrapper: {
    position: 'relative',
    top: '0',
    height: '100vh'
  },
  mainPanel: {
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`
    },
    overflow: 'auto',
    position: 'relative',
    float: 'right',
    ...transition,
    maxHeight: '100%',
    width: '100%',
    overflowScrolling: 'touch'
  },
  content: {
    marginTop: '0px',
    padding: '30px 15px',
    height: 'calc(100vh - 110px)'
  },
  container: {
    height: '100%'
  },
  map: {
    marginTop: '0px'
  }
});

export default appStyle;
