import React from 'react';
import withRoot from 'withRoot';
import { Switch, Route } from "react-router-dom";
import landingRoutes from "routes";
import appStyle from 'assets/jss/material-dashboard-react/layouts/adminStyle';
import makeStyles from "@material-ui/core/styles/makeStyles";
import AppAppBar from "views/AppAppBar";

const switchRoutes = (
    <Switch>
        {landingRoutes.map((prop, key) => {
                if (prop.layout === '/') {
                    return <Route path={prop.layout + prop.path} component={prop.component} key={key} />;
            }
                console.log('return null');
            return null;
        })}
    </Switch>
);

const useStyles = makeStyles(appStyle);

function LandingLayout(props) {
    const classes = useStyles();
    const getRoute = () => {
        return window.location.pathname !== '/admin/maps';
    };

    return (
        <div>
            <AppAppBar/>
            <div className={classes.wrapper}>
                {getRoute() ? (
                    <div className={classes.content}>
                        <div className={classes.container}>
                            {switchRoutes}
                        </div>
                    </div>
                ) : (
                    <div className={classes.map}>{switchRoutes}</div>
                )}
            </div>
            <div className={classes.placeholder} />
        </div>
    );
}

export default withRoot(LandingLayout);