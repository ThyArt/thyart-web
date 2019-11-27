// @material-ui/icons
import Person from '@material-ui/icons/Person';
import GroupIcon from '@material-ui/icons/Group';
import UserProfile from 'views/UserProfile';
import Clients from 'views/Clients';
import Calendar from 'views/Calendar';
import Members from 'views/Members';
import Stats from 'views/Stats';
// core components/views for Admin layout
// core components/views for RTL layout

const dashboardRoutes = [
  {
    path: '/accueil',
    name: 'Accueil',
    icon: Person,
    component: Calendar,
    layout: '/dashboard'
  },
  {
    path: '/user',
    name: 'Profil Utilisateur',
    icon: Person,
    component: UserProfile,
    layout: '/dashboard'
  },
  {
    path: '/membres',
    name: 'Membres',
    icon: GroupIcon,
    component: Members,
    layout: '/dashboard'
  },
  {
    path: '/clients',
    name: 'Clients',
    icon: Person,
    component: Clients,
    layout: '/dashboard'
  },
  {
    path: '/stats',
    name: 'Statistiques',
    icon: Person,
    component: Stats,
    layout: '/dashboard'
  }
];

export default dashboardRoutes;
