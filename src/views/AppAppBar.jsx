import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import AppBar from 'components/AppBar/AppBar';
import Toolbar, { styles as toolbarStyles } from 'components/ToolBar/Toolbar';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';

const forwardedLink =  React.forwardRef((props, ref) => <RouterLink innerRef={ref} {...props} />);

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

function AppAppBar(props) {
    const { classes } = props;

    return (
        <div>
            <AppBar position="fixed">
                <Toolbar className={classes.toolbar}>
                    <div className={classes.left} />
                    <Link
                        component={forwardedLink}
                        variant="h6"
                        underline="none"
                        color="inherit"
                        className={classes.title}
                        to="/"
                    >
                        {'Thy Art'}
                    </Link>
                    <div className={classes.right}>
                        <Link
                            component={forwardedLink}
                            color="inherit"
                            variant="h6"
                            underline="none"
                            className={classes.rightLink}
                            to="/sign-in/"
                        >
                            {'Sign In'}
                        </Link>
                        <Link
                            component={forwardedLink}
                            variant="h6"
                            underline="none"
                            className={clsx(classes.rightLink, classes.linkSecondary)}
                            to="/sign-up/"
                        >
                            {'Sign Up'}
                        </Link>
                    </div>
                </Toolbar>
            </AppBar>
            <div className={classes.placeholder} />
        </div>
    );
}

AppAppBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AppAppBar);