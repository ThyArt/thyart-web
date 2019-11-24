import React, { Fragment, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/fr';
import uuidv4 from 'uuid/v4';
import _ from 'lodash';
import Cookies from 'universal-cookie';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import Button from 'components/CustomButtons/Button';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import GridItem from '../components/Grid/GridItem';
import TextField from '@material-ui/core/TextField';
import GridContainer from 'components/Grid/GridContainer';

import 'react-big-calendar/lib/css/react-big-calendar.css';

export default function() {
  moment.locale('fr');
  const local = momentLocalizer(moment);
  const cookie = new Cookies();

  const [key, setKey] = useState(Math.random());
  const [currentEvent, setCurrentEvent] = useState({});
  const [eventInfos, setEventInfos] = useState({});
  const [newEventName, setNewEventName] = useState('');
  const [deleteModal, setDeleteModal] = useState(false);
  const [createModal, setCreateModal] = useState(false);

  if (!cookie.get('events')) {
    cookie.set('events', [], { path: '/' });
  }

  const formatEvents = () => {
    return cookie.get('events');
  };

  const handleEventDelete = () => {
    let _events = cookie.get('events');
    _events = _.filter(_events, e => e.id !== currentEvent.id);
    cookie.set('events', _events, { path: '/' });
    setKey(Math.random());
    setCurrentEvent({});
    setDeleteModal(false);
  };

  const handleDeleteModalOpen = event => {
    setCurrentEvent({ id: event.id, title: event.title });
    setDeleteModal(true);
  };

  const handleCreateModalOpen = info => {
    setEventInfos(info);
    setCreateModal(true);
  };

  const handleEventCreate = () => {
    const _events = cookie.get('events');
    const _newEventName = newEventName || 'Démo';
    cookie.set(
      'events',
      [
        ..._events,
        {
          title: _newEventName,
          allDay: true,
          start: eventInfos.start,
          end: moment(eventInfos.end).add(1, 'days'),
          id: uuidv4()
        }
      ],
      { path: '/' }
    );
    setKey(Math.random());
    setCreateModal(false);
    setNewEventName('');
    setEventInfos({});
  };

  return (
    <Fragment>
      <Calendar
        localizer={local}
        views={['month', 'agenda']}
        onDoubleClickEvent={handleDeleteModalOpen}
        onSelectSlot={handleCreateModalOpen}
        selectable={true}
        events={formatEvents()}
        startAccessor="start"
        endAccessor="end"
        style={{ height: '700px' }}
        messages={{
          allDay: 'Toute la journée',
          previous: 'Précédent',
          next: 'Suivant',
          today: "Aujourd'hui",
          month: 'Mois',
          time: 'Durée',
          event: 'Evènement',
          noEventsInRange: "Il n'y a pas d'évènements programmés ce mois-ci"
        }}
        key={key}
      />

      <Dialog open={deleteModal} onClose={() => setDeleteModal(false)}>
        <DialogTitle>Voulez-vous vraiment supprimer {currentEvent.title} ?</DialogTitle>
        <DialogActions>
          <Button onClick={() => setDeleteModal(false)} color="transparent">
            Annuler
          </Button>
          <Button onClick={handleEventDelete} color="primary">
            Valider
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={createModal} onClose={() => setCreateModal(false)}>
        <DialogTitle>Création d'un nouvel évènement ?</DialogTitle>
        <DialogContent>
          <GridContainer spacing={3}>
            <GridItem xs={6}>
              <DialogContentText style={{ marginTop: '10%' }}>
                Nom de l'évènement :
              </DialogContentText>
            </GridItem>
            <GridItem xs={6}>
              <TextField
                label={"Nom de l'évènement"}
                type={'text'}
                value={newEventName}
                onChange={event => setNewEventName(event.target.value)}
                autoFocus={true}
              />
            </GridItem>
          </GridContainer>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCreateModal(false)} color="transparent">
            Annuler
          </Button>
          <Button onClick={handleEventCreate} color="primary">
            Valider
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}
