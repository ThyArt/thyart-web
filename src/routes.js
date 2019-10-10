// @material-ui/icons
import Person from '@material-ui/icons/Person';
import SignInSide from "views/SignIn";
import SignUp from "views/SignIn";
// core components/views for Admin layout
// core components/views for RTL layout

const landingRoutes = [
    {
        path: 'sign-in',
        name: 'Connection',
        icon: Person,
        component: SignInSide,
        layout: '/'
    },
    {
        path: 'sign-up',
        name: 'Inscription',
        icon: Person,
        component: SignUp,
        layout: '/'
    }
];

export default landingRoutes;
