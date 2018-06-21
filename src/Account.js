import React, {Component} from "react";

class Account extends Component {
  constructor(props) {
    super(props);
  }


  render() {
    return (
        <div>
          <h2>You are connected</h2>
          <h3>Token:</h3>
          <p>{this.props.location.state.token}</p>
        </div>
    );
  }
}

export default Account;
