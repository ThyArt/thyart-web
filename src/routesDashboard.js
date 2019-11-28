// @material-ui/icons
import Person from '@material-ui/icons/Person';
import GroupIcon from '@material-ui/icons/Group';
import UserProfile from 'views/UserProfile';
import Clients from 'views/Clients';
import Calendar from 'views/Calendar';
import Members from 'views/Members';
import Stats from 'views/Stats';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import EventIcon from '@material-ui/icons/Event';
import ContactsIcon from '@material-ui/icons/Contacts';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
// core components/views for Admin layout
// core components/views for RTL layout

const dashboardRoutes = [
  {
    path: '/accueil',
    name: 'Accueil',
    icon: EventIcon,
    component: Calendar,
    layout: '/dashboard'
  },
  {
    path: '/user',
    name: 'Profil Utilisateur',
    icon: AccountCircleIcon,
    component: UserProfile,
    layout: '/dashboard'
  },
  {
    path: '/membres',
    name: 'Membres',
    icon: SupervisorAccountIcon,
    component: Members,
    layout: '/dashboard'
  },
  {
    path: '/clients',
    name: 'Clients',
    icon: ContactsIcon,
    component: Clients,
    layout: '/dashboard'
  },
  {
    path: '/stats',
    name: 'Statistiques',
    icon: EqualizerIcon,
    component: Stats,
    layout: '/dashboard'
  }
];

export default dashboardRoutes;
