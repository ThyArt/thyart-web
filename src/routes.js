// @material-ui/icons
import Person from '@material-ui/icons/Person';
import SignIn from 'views/SignIn';
import SignUp from 'views/SignUp';
import LandingPage from "./views/LandingPage";
// core components/views for Admin layout
// core components/views for RTL layout

const landingRoutes = [
  {
    path: 'sign-in',
    name: 'Connection',
    icon: Person,
    component: SignIn,
    layout: '/'
  },
  {
    path: 'sign-up',
    name: 'Inscription',
    icon: Person,
    component: SignUp,
    layout: '/'
  },
  {
    path: '',
    name: 'Landing',
    icon: Person,
    component: LandingPage,
    layout: '/'
  }
];

export default landingRoutes;
