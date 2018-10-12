import React, {Component} from 'react';
import moment from "moment";
import BigCalendar from "react-big-calendar";

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

  render() {
    return (
        <div>
          <BigCalendar
              localizer={local}
              views={['month', 'agenda']}
              onView={() => {}}
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
