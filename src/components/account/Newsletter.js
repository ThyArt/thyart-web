import React, {Component} from "react";
import { Jumbotron } from "react-bootstrap";

import "../../css/Newsletter.css";
import {
  createNewsletterIfNeeded,
  modifyNewsletterIfNeeded
} from "../../actions/actionsNewsletters";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class Newsletter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      customer: ""
    };
    this.newsletterCreation = this.newsletterCreation.bind(this);
  }



  newsletterCreation = () => {
    if (this.state.artworkId === "" && this.props.artworks.length)
      this.setState({ artworkId: this.props.artworks[0].id });
    if (!this.state.newCustomer) {
      if (this.props.newObj) {
        this.props.dispatch(
            createNewsletterIfNeeded(
                this.props.token
            )
        );
      } else {
        this.props.dispatch(
            modifyNewsletterIfNeeded(
                this.props.token
            )
        );
      }
    }
  };





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
  }

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
  }

  render() {
    return <div>{this.props.modif ? this.editable() : this.nonEditable()}</div>;
  }
}

Newsletter.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  msg: PropTypes.string,
  error: PropTypes.string,
  newsletter: PropTypes.object,
  modif: PropTypes.bool.isRequired,
  table: PropTypes.bool.isRequired,
  artworks: PropTypes.array,
  customers: PropTypes.array,
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  const {
    isFetching,
    msg,
    error,
    newsletter,
    modif,
    newObj,
    table,
    customers,
    dispatch
  } = state.newsletters;

  return {
    isFetching,
    msg,
    error,
    newsletter,
    modif,
    newObj,
    table,
    customers,
    dispatch
  };
}

export default connect(mapStateToProps)(Newsletter);
