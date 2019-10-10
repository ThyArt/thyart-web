import React from 'react';
import withRoot from 'withRoot';
import { Switch, Route } from "react-router-dom";
import landingRoutes from "routes";
import appStyle from 'assets/jss/material-dashboard-react/layouts/adminStyle';
import makeStyles from "@material-ui/core/styles/makeStyles";
import AppAppBar from "views/AppAppBar";
import SignInSide from "views/SignIn";
import SignUp from 'views/SignUp';

const switchRoutes = (
    <Switch>
        {landingRoutes.map((prop, key) => {
                if (prop.layout === '/') {
                    console.log('return: ');
                    console.log(prop.layout+ prop.path);
                    console.log(prop.component);
                    return <Route exact path={'/sign-in/#/'} component={SignInSide} key={key} />;
                    /*return <Route path={prop.layout + prop.path} component={prop.component} key={key} />;*/
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
        console.log('get route :' + window.location.pathname);
        return window.location.pathname !== '/admin/maps';
    };

    return (
        <div>
            <AppAppBar/>
            <Switch>
                <Route exact path={'/sign-in'} component={SignInSide}/>;
            </Switch>
            {/*{getRoute() ? (
                <div className={classes.content}>
                    {console.log('first')}
                    {console.log(classes)}
                    <div className={classes.container}>
                        {switchRoutes}
                    </div>
                </div>
            ) : (
                <div className={classes.map}>{switchRoutes}</div>
            )}*/}
            <div className={classes.placeholder} />
        </div>
    );
}

export default withRoot(LandingLayout);