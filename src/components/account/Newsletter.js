import React, {Component} from 'react';
import { Jumbotron} from "react-bootstrap";

import "../../css/Newsletter.css";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class Newsletter extends Component {
  /*constructor(props) {
    super(props);
  }*/


  editable() {
    return (
        <div>

          <Jumbotron className="newsletterJumbotron">
            <h2 className="newsletterJumbotronTitle">Sélection des clients</h2>


          </Jumbotron>

          <Jumbotron className="newsletterJumbotron">
            <h2 className="newsletterJumbotronTitle">Texte</h2>

          </Jumbotron>
        </div>
    );
  };

  nonEditable() {
    return (
        <div>
          <Jumbotron className="newsletterJumbotron">
            <h2 className="newsletterJumbotronTitle">Sélection des clients</h2>

          </Jumbotron>

          <Jumbotron className="newsletterJumbotron">
            <h2 className="newsletterJumbotronTitle">Texte</h2>

          </Jumbotron>
        </div>
    );
  };

  render() {
    return (
        <div>

          {this.props.modif ? this.editable() : this.nonEditable()}

        </div>
    );
  }
}

Newsletter.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  msg: PropTypes.string,
  error: PropTypes.string,
  billing: PropTypes.object,
  modif: PropTypes.bool.isRequired,
  table: PropTypes.bool.isRequired,
  artworks: PropTypes.array,
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  const {
    isFetching,
    msg,
    error,
    billing,
    modif,
    table,
    artworks,
    dispatch
  } = state.billings;

  return {
    isFetching,
    msg,
    error,
    billing,
    modif,
    table,
    artworks,
    dispatch
  }
}

export default connect(
    mapStateToProps
)(Newsletter);