import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import styles from 'assets/jss/material-dashboard-react/layouts/adminStyle';
import Sidebar from 'components/Sidebar/Sidebar';
import dashboardRoute from 'routesDashboard';
import bgImage from 'assets/img/sidebar-2.jpg';
import logo from 'assets/img/reactlogo.png';
import { Switch, Route, Redirect } from 'react-router-dom';
import Footer from 'components/Footer/Footer';

const useStyles = makeStyles(styles);

const switchRoutes = (
  <Switch>
    {dashboardRoute.map((prop, key) => {
      if (prop.layout === '/dashboard') {
        return <Route path={prop.layout + prop.path} component={prop.component} key={key} />;
      }
      return null;
    })}
    <Redirect from={'/dashboard'} to={'/dashboard/accueil'} />
  </Switch>
);

export default function DashBoardLayout({ ...rest }) {
  const [image] = React.useState(bgImage);
  const [color] = React.useState('blue');
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const mainPanel = React.createRef();
  const classes = useStyles();
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const getRoute = () => {
    return window.location.pathname;
  };
  return (
    <div className={classes.wrapper}>
      <Sidebar
        routes={dashboardRoute}
        logoText={'Thy Art'}
        logo={logo}
        image={image}
        handleDrawerToggle={handleDrawerToggle}
        open={mobileOpen}
        color={color}
        {...rest}
      />
      <div className={classes.mainPanel} ref={mainPanel}>
        {getRoute() ? (
          <div className={classes.content}>
            <div className={classes.container}>{switchRoutes}</div>
          </div>
        ) : (
          <div className={classes.map}>{switchRoutes}</div>
        )}
        {getRoute() ? <Footer /> : null}
      </div>
    </div>
  );
}
