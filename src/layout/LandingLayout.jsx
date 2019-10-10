import React from 'react';
import withRoot from 'withRoot';
import { withStyles } from '@material-ui/core/styles';
import AppBar from "../components/AppBar/AppBar";
import Toolbar, {styles as toolbarStyles} from "../components/ToolBar/Toolbar";
import Link from "@material-ui/core/Link";
import clsx from "clsx";
import { Switch, Route, Redirect } from "react-router-dom";
import landingRoutes from "routes";

const switchRoutes = (
    <Switch>
        {landingRoutes.map((prop, key) => {
                if (prop.layout === '/') {
                    return <Route path={prop.layout + prop.path} component={prop.component} key={key} />;
            }
            return null;
        })}
        <Redirect from="/" to="/user" />
    </Switch>
);
const styles = theme => ({
    title: {
        fontSize: 24,
    },
    placeholder: toolbarStyles(theme).root,
    toolbar: {
        justifyContent: 'space-between',
    },
    left: {
        flex: 1,
    },
    leftLinkActive: {
        color: theme.palette.common.white,
    },
    right: {
        flex: 1,
        display: 'flex',
        justifyContent: 'flex-end',
    },
    rightLink: {
        fontSize: 16,
        color: theme.palette.common.white,
        marginLeft: theme.spacing(3),
    },
    linkSecondary: {
        color: theme.palette.secondary.main,
    },
});

function LandingLayout(props) {
    const { classes } = props;
    const getRoute = () => {
        return window.location.pathname !== '/admin/maps';
    };

    return (
        <div>
            <AppBar position="fixed">
                <Toolbar className={classes.toolbar}>
                    <div className={classes.left} />
                    <Link
                        variant="h6"
                        underline="none"
                        color="inherit"
                        className={classes.title}
                        href="/"
                    >
                        {'ThyArt'}
                    </Link>
                    <div className={classes.right}>
                        <Link
                            color="inherit"
                            variant="h6"
                            underline="none"
                            className={classes.rightLink}
                            href="/sign-in/"
                        >
                            {'Connexion'}
                        </Link>
                        <Link
                            variant="h6"
                            underline="none"
                            className={clsx(classes.rightLink, classes.linkSecondary)}
                            href="/sign-up/"
                        >
                            {'Inscription'}
                        </Link>
                    </div>
                </Toolbar>
            </AppBar>
            {getRoute() ? (
                <div className={classes.content}>
                    <div className={classes.container}>{switchRoutes}</div>
                </div>
            ) : (
                <div className={classes.map}>{switchRoutes}</div>
            )}
            <div className={classes.placeholder} />
        </div>
    );
}

export default withRoot(withStyles(styles)(LandingLayout));
