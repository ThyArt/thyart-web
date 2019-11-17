// @material-ui/icons
import Event from '@material-ui/icons/Event';
import Person from '@material-ui/icons/Person';
import GroupIcon from '@material-ui/icons/Group';
import Brush from '@material-ui/icons/Brush';

import UserProfile from 'views/UserProfile';
import Clients from 'views/Clients';
import Calendar from 'views/Calendar';
import Members from 'views/Members';
import Artworks from 'views/Artworks';

const dashboardRoutes = [
  {
    path: '/accueil',
    name: 'Accueil',
    icon: Event,
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
    path: '/artworks',
    name: 'Oeuvre d\'arts',
    icon: Brush,
    component: Artworks,
    layout: '/dashboard'
  }
];

export default dashboardRoutes;
