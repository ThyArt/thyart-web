import React, { Component } from "react";

class ClientDetails extends Component {
  render() {
    return (
      <div>
        {console.log(this.props.location.state)}
        <h1>Page du client {this.props.location.state.name} {this.props.location.state.family}</h1>
      </div>
    );
  }
}

export default ClientDetails;
