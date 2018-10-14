import React, {Component} from 'react';
import moment from "moment";
import 'moment/locale/fr';
import BigCalendar from "react-big-calendar";

// Initialize Calendar locale to French
moment.locale('fr');
const local = BigCalendar.momentLocalizer(moment);

class Scheduler extends Component {
  constructor(props) {
    super(props);


    this.state = {
      events: [
        {
          title: "Mon exposition",
          allDay: true,
          start: moment(),
          end: moment().add(5, 'days')
        },
        {
          title: "Ma deuxième exposition",
          allDay: true,
          start: moment().add(10, 'days'),
          end: moment().add(13, 'days')
        }
      ]
    };
  }

  getArrayIndex = (array, elem) => {
    for (let i = 0; i < array.length; i++) {
      if (array[i] === elem)
        return (i);
    }
    return (null);
  };

  handleEventSelect = event => {
    if (window.confirm('Do you really want to the event \"' + event.title + '\"?')) {
      let eventCopy = this.state.events.slice();
      const index = this.getArrayIndex(eventCopy, event);
      eventCopy.splice(index);
      this.setState({events: eventCopy});
    }
  };

  handleEventCreate = info => {
    const title = prompt('Title of the event?');
    if (title) {
      this.setState({events: [...this.state.events, {title: title, allDay: true, start: info.start, end: info.end}]});
    }
  };

  render() {
    return (
        <div>
          <BigCalendar
              localizer={local}
              views={['month', 'agenda']}
              onView={() => {}}
              onSelectEvent={this.handleEventSelect}
              onSelectSlot={this.handleEventCreate}
              selectable={true}
              events={this.state.events}
              startAccessor="start"
              endAccessor="end"
              style={{ height: '700px' }}
          />
        </div>
    );
  }
}

export default Scheduler;
