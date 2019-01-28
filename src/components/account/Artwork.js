import React, { Component } from "react";
import Gallery from 'react-photo-gallery';
import Modal from "react-responsive-modal";
import ImageUpload from './ImageUpload';
import { Col, ControlLabel, FormControl, FormGroup, Button, Form, Glyphicon, DropdownButton, MenuItem } from "react-bootstrap";

import '../../css/Artwork.css';
import ToggleButton from "react-bootstrap/es/ToggleButton";
import ButtonToolbar from "react-bootstrap/es/ButtonToolbar";
import ToggleButtonGroup from "react-bootstrap/es/ToggleButtonGroup";
import Row from "react-bootstrap/es/Row";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {createArtworkIfNeeded, uploadImageIfNeeded} from "../../actions/actions";

class Artwork extends Component {
  constructor(props, context) {
    super(props, context);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      currentPhoto: [],
      file: '',
      currentName: '',
      reference: '',
      addModal: false,
      price:'',
      AWTitle: '',
      AWState: 1,
      detailsModal: false,
      photos: [
        {
          src: 'https://images.pexels.com/photos/821754/pexels-photo-821754.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
          name: 'Some old phones',
          width: 4,
          height: 3
        },
        {
          src: 'https://images.pexels.com/photos/823841/pexels-photo-823841.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
          name: 'Blue light',
          width: 5,
          height: 3.5
        },
        {
          src: 'https://images.pexels.com/photos/1484671/pexels-photo-1484671.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
          name: 'Green Leaf',
          width: 3,
          height: 4
        },
        {
          src: 'https://images.pexels.com/photos/1647972/pexels-photo-1647972.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
          name: 'The cliff',
          width: 3,
          height: 4
        },
        {
          src: 'https://images.pexels.com/photos/1287086/pexels-photo-1287086.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
          name: 'The enlightened forest',
          width: 4,
          height: 3
        },
        {
          src: 'https://images.pexels.com/photos/976994/pexels-photo-976994.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
          name: 'Reflections',
          width: 4,
          height: 3
        }
      ]
    };

  }

  onNameChange = event => {
    this.setState({ currentName: event.target.value });
  };

  onAWTitleChange = event => {
    this.setState({ AWTitle: event.target.value });
  };

  onPriceChange = event => {
    this.setState({ price: event.target.value });
  };

  onReferenceChange = event => {
    this.setState({ reference: event.target.value });
  };

  onDetailClose = () => {
    this.setState({ detailsModal: false });
  };

  handleImageClick = (event, obj) => {
    this.setState({ detailsModal: true, currentPhoto: [obj.photo], currentName: obj.photo.name });
  };

  handleAddArtworkShow = () => {
    this.setState({addModal: true});
  };

  handleAddArtworkClose = () => {
    this.setState({addModal: false});
  };

  myCallback = (file) => {
    this.setState({file: file});
  };

  getVerification = () => {
    if (this.state.file !== '' && this.state.reference !== ''
        && this.state.AWTitle !== '' && this.state.price !== '') {
      let answer = this.props.dispatch(createArtworkIfNeeded(this.state.file, this.props.token, this.state.AWTitle,
      this.state.price, this.state.reference, this.getArtWorkState()));
      console.log(answer);
      //this.props.dispatch(uploadImageIfNeeded(this.state.file, this.props.token, answer.))
    }
  };
  
  getArtWorkState = () => {
    switch (this.state.AWState) {
      case 1:
        return 'exposed';
      case 2:
        return 'in_stock';
      case 3:
        return 'sold';
      case 4:
        return 'incoming';
      default:
        return 'exposed;'
    }
  };

  handleChange(e) {
    this.setState({AWState: e});
  }

  render() {
    return (
      <div id='page'>
        <div id='toolbar'>
          <Form inline>
            <FormGroup bsSize='large'>
              <FormControl type='text' placeholder='Enter text to search...' id='searchBar'/>{' '}

              <Button bsStyle='primary' bsSize='large'>Search</Button>{' '}

              <DropdownButton bsSize='large' className='complexButton' title={<span><Glyphicon glyph='glyphicon glyphicon-filter'/></span>}>
                <MenuItem eventKey={1}>Photographies</MenuItem>
                <MenuItem eventKey={2}>Peintures</MenuItem>
                <MenuItem eventKey={3}>Sculptures</MenuItem>
                <MenuItem divider/>
                <MenuItem eventKey={5}>Toutes les catégories</MenuItem>
              </DropdownButton>{' '}

              <Button bsSize='large' className='complexButton' onClick={this.handleAddArtworkShow}>
                <Glyphicon glyph='glyphicon glyphicon-plus'/>
              </Button>

            </FormGroup>
          </Form>
        </div>

        <Modal dialogClassName="addArtWork-modal" open={this.state.addModal} onClose={this.handleAddArtworkClose}>
          <h1 id='titleModal'>Ajouter une oeuvre</h1>
          <Row>
            <Col xs="6">
              <ImageUpload callbackFromParent={this.myCallback}/>
            </Col>
            <Col xs="6">
              <form>
              <FormGroup controlId="formValidationSuccess1" validationState="null" className='addModal'>
                <ControlLabel>Nom de l'oeuvre</ControlLabel>
                <FormControl type='text' value={this.state.AWTitle} onChange={this.onAWTitleChange}/>
                <ControlLabel>Reference</ControlLabel>
                <FormControl type='text' value={this.state.reference} onChange={this.onReferenceChange}/>
                <ControlLabel>Prix</ControlLabel>
                <FormControl type='number' value={this.state.price} onChange={this.onPriceChange}/>

                <ButtonToolbar>
                  <ToggleButtonGroup id={'artWorkState'}
                                     type="radio"
                                     value={this.state.AWState}
                                     onChange={this.handleChange}
                                     name="options">
                    <ToggleButton value={1}>Exposé</ToggleButton>
                    <ToggleButton value={2}>Stock</ToggleButton>
                    <ToggleButton value={3}>Vendu</ToggleButton>
                    <ToggleButton value={4}>En transit</ToggleButton>
                  </ToggleButtonGroup>
                </ButtonToolbar>
                <Button bsStyle="primary" onClick={this.getVerification} bsSize='large'>
                  Valider
                </Button>
              </FormGroup>
              </form>
            </Col>
          </Row>
        </Modal>

        <Gallery photos={this.state.photos} direction={"column"} onClick={this.handleImageClick}/>

        <Modal open={this.state.detailsModal} onClose={this.onDetailClose}>
          <h1 id='titleModal'>Détails de l'oeuvre</h1>

          <Col sm={5} id='photoModal'>
            <Gallery photos={this.state.currentPhoto}/>
          </Col>

          <Col sm={6}>
            <FormGroup className='infosModal'>
              <ControlLabel>Nom de l'oeuvre</ControlLabel>
              <FormControl type='text' value={this.state.currentName} onChange={this.onNameChange}/>
            </FormGroup>
          </Col>

          <Button bsStyle="primary" onClick={this.onDetailClose} bsSize='large' className='confirmModal'>
            Valider
          </Button>
        </Modal>
      </div>
    );
  }
}

Artwork.propTypes = {
  isLogged: PropTypes.bool.isRequired,
  isFetching: PropTypes.bool.isRequired,
  token: PropTypes.string,
  msg: PropTypes.string,
  error: PropTypes.string,
  mail: PropTypes.string,
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  const {
    isLogged,
    isFetching,
    token,
    msg,
    error,
    mail
  } = state;

  return {
    isLogged,
    isFetching,
    token,
    msg,
    error,
    mail
  }
}

export default connect(mapStateToProps)(Artwork);

//export default Artwork;
