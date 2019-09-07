import React, { Component } from "react";
import moment from "moment";
import "moment/locale/fr";
import BigCalendar from "react-big-calendar";
import uuidv4 from "uuid/v4";

// Initialize Calendar locale to French
moment.locale("fr");
const local = BigCalendar.momentLocalizer(moment);

export class Scheduler extends Component {
  constructor(props) {
    super(props);


    this.state = {
      events: [
        {
          title: "Mon exposition",
          allDay: true,
          start: moment(),
          end: moment().add(5, "days"),
          id: uuidv4()
        },
        {
          title: "Ma deuxième exposition",
          allDay: true,
          start: moment().add(10, "days"),
          end: moment().add(13, "days"),
          id: uuidv4()
        }
      ]
    };
  }

  getArrayIndex = (array, elem) => {
    for (let i = 0; i < array.length; i++) {
      if (array[i].id === elem.id)
        return (i);
    }
    return (null);
  };

  handleEventSelect = event => {
    if (window.confirm("Voulez vous vraiment supprimer l'événement \"" + event.title + "\"?")) {
      let eventCopy = this.state.events.slice();
      const index = this.getArrayIndex(eventCopy, event);
      eventCopy.splice(index);
      this.setState({ events: eventCopy });
    }
  };

  handleEventCreate = info => {
    const title = prompt("Nom de l'événement?");
    if (title) {
      console.log(info);
      this.setState({
        events: [...this.state.events, {
          title: title,
          allDay: true,
          start: info.start,
          end: info.end,
          id: uuidv4()
        }]
      });
    }
  };

  render() {
    return (
      <div>
        <BigCalendar
          localizer={local}
          views={["month", "agenda"]}
          onView={() => {
          }}
          onSelectEvent={this.handleEventSelect}
          onSelectSlot={this.handleEventCreate}
          selectable={true}
          events={this.state.events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: "700px" }}
          messages={{
            allDay: "Toute la journée",
            previous: "Précédent",
            next: "Suivant",
            today: "Aujourd'hui",
            month: "Mois",
            time: "Durée",
            event: "Evènement",
            noEventsInRange: "Il n'y a pas d'évènements programmés ce mois-ci"
          }}
        />
      </div>
    );
  }
}

export default Scheduler;
