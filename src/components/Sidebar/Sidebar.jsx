import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { deleteCookies } from 'http/Cookie.js';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Icon from '@material-ui/core/Icon';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
// core components
import styles from 'assets/jss/material-dashboard-react/components/sidebarStyle';

const useStyles = makeStyles(styles);

function logout() {
  deleteCookies().then(() => (window.location.href = '/'));
}

export default function Sidebar(props) {
  const classes = useStyles();
  // verifies if routeName is the one active (in browser input)
  function activeRoute(routeName) {
    return window.location.href.indexOf(routeName) > -1;
  }
  const { color, logo, image, logoText, routes } = props;
  const links = (
    <List className={classes.list}>
      {routes.map((prop, key) => {
        const activePro = ' ';
        const listItemClasses = classNames({
          [` ${classes[color]}`]: activeRoute(prop.layout + prop.path)
        });
        const whiteFontClasses = classNames({
          [` ${classes.whiteFont}`]: activeRoute(prop.layout + prop.path)
        });
        return (
          <NavLink
            to={prop.layout + prop.path}
            className={activePro + classes.item}
            activeClassName="active"
            key={key}
          >
            <ListItem button className={classes.itemLink + listItemClasses}>
              {typeof prop.icon === 'string' ? (
                <Icon
                  className={classNames(classes.itemIcon, whiteFontClasses, {
                    [classes.itemIconRTL]: props.rtlActive
                  })}
                >
                  {prop.icon}
                </Icon>
              ) : (
                <prop.icon
                  className={classNames(classes.itemIcon, whiteFontClasses, {
                    [classes.itemIconRTL]: props.rtlActive
                  })}
                />
              )}
              <ListItemText
                primary={props.rtlActive ? prop.rtlName : prop.name}
                className={classNames(classes.itemText, whiteFontClasses, {
                  [classes.itemTextRTL]: props.rtlActive
                })}
                disableTypography
              />
            </ListItem>
          </NavLink>
        );
      })}
      <a href="/" onClick={() => logout()}>
        <ListItem className={classNames(classes.itemLink, classes.bottomElement)}>
          <ExitToAppIcon className={classNames(classes.itemIcon, classes.whiteFont)} />
          <ListItemText
            primary="Déconnexion"
            className={classNames(classes.itemText, classes.whiteFont)}
            disableTypography
          />
        </ListItem>
      </a>
    </List>
  );
  const brand = (
    <div className={classes.logo}>
      <a
        className={classNames(classes.logoLink, {
          [classes.logoLinkRTL]: props.rtlActive
        })}
        href="/"
      >
        <div className={classes.logoImage}>
          <img src={logo} alt="logo" className={classes.img} />
        </div>
        {logoText}
      </a>
    </div>
  );
  return (
    <div>
      <Hidden mdUp implementation="css">
        <Button onClick={props.handleDrawerToggle} className={classes.menuIcon} size="large">
          <MenuIcon />
        </Button>
        <Drawer
          variant="temporary"
          anchor={'left'}
          open={props.open}
          classes={{
            paper: classNames(classes.drawerPaper)
          }}
          onClose={props.handleDrawerToggle}
          ModalProps={{
            keepMounted: true // Better open performance on mobile.
          }}
        >
          {brand}
          <div className={classes.sidebarWrapper}>{links}</div>
          {image !== undefined ? (
            <div className={classes.background} style={{ backgroundImage: `url(${image})` }} />
          ) : null}
        </Drawer>
      </Hidden>
      <Hidden smDown implementation="css">
        <Drawer
          anchor={'left'}
          variant="permanent"
          open
          classes={{
            paper: classNames(classes.drawerPaper)
          }}
        >
          {brand}
          <div className={classes.sidebarWrapper}>{links}</div>
          {image !== undefined ? (
            <div className={classes.background} style={{ backgroundImage: `url(${image})` }} />
          ) : null}
        </Drawer>
      </Hidden>
    </div>
  );
}

Sidebar.propTypes = {
  rtlActive: PropTypes.bool,
  handleDrawerToggle: PropTypes.func,
  bgColor: PropTypes.oneOf(['purple', 'blue', 'green', 'orange', 'red']),
  logo: PropTypes.string,
  image: PropTypes.string,
  logoText: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object),
  open: PropTypes.bool
};
