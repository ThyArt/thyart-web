import React, { Fragment, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/fr';
import uuidv4 from 'uuid/v4';
import _ from 'lodash';

import 'react-big-calendar/lib/css/react-big-calendar.css';

export default function() {
  moment.locale('fr');
  const local = momentLocalizer(moment);
  const [events, setEvents] = useState([
    {
      title: 'Mon exposition',
      allDay: true,
      start: moment(),
      end: moment().add(5, 'days'),
      id: uuidv4()
    },
    {
      title: 'Ma deuxième exposition',
      allDay: true,
      start: moment().add(10, 'days'),
      end: moment().add(13, 'days'),
      id: uuidv4()
    }
  ]);

  function handleEventDelete(event) {
    if (window.confirm('Voulez vous vraiment supprimer l\'événement "' + event.title + '" ?')) {
      setEvents(_.filter(events, e => e.id !== event.id));
    }
  }

  function handleEventCreate(info) {
    const title = prompt("Nom de l'événement ?");
    if (title) {
      setEvents([
        ...events,
        {
          title: title,
          allDay: true,
          start: info.start,
          end: moment(info.end).add(1, 'days'),
          id: uuidv4()
        }
      ]);
    }
  }

  return (
    <Fragment>
      <Calendar
        localizer={local}
        views={['month', 'agenda']}
        onDoubleClickEvent={handleEventDelete}
        onSelectSlot={handleEventCreate}
        selectable={true}
        events={events}
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
      />
    </Fragment>
  );
}
