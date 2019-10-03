import React, {Component} from "react";
import { Jumbotron } from "react-bootstrap";

import "../../css/Newsletter.css";
import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import {
  createNewsletterIfNeeded
} from "../../actions/actionsNewsletters";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Select from "react-dropdown-select";
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';

class Newsletter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedCustomers: [],
      editorState: EditorState.createEmpty(),
    };
    this.newsletterCreation = this.newsletterCreation.bind(this);
  }

  onEditorStateChange = editorState => {
    this.setState({ editorState });
  };

  componentDidMount() {
    console.log(this.props.customers);
  }

  newsletterCreation = () => {
        this.props.dispatch(
            createNewsletterIfNeeded(
                this.props.token
            )
        );
    };

  setSelectedCustomers(customers) {
    this.setState({selectedCustomers: customers});
  };

  editable() {
    return (
        <div>
          <Jumbotron className="newsletterJumbotron">
            <h2 className="newsletterJumbotronTitle">Sélection des clients</h2>

            <Select
                options={this.props.customers}
                labelField="last_name"
                valueField="id"
                onChange={(customers) => this.setSelectedCustomers(customers)}
                multi={true}
            />
          </Jumbotron>

          <Jumbotron className="newsletterJumbotron">
            <h2 className="newsletterJumbotronTitle">Texte</h2>

            <div style={{ backgroundColor: "white" }}>
              <Editor
                  editorState={this.state.editorState}
                  wrapperClassName="demo-wrapper"
                  editorClassName="demo-editor"
                  onEditorStateChange={this.onEditorStateChange}
              />
            </div>
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
  customers: PropTypes.array,
  dispatch: PropTypes.func.isRequired,
  isCustomersFetching: PropTypes.bool
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
    dispatch,
    isCustomersFetching
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
    dispatch,
    isCustomersFetching
  };
}

export default connect(mapStateToProps)(Newsletter);
