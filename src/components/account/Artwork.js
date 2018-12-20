import React, { Component } from "react";
import Gallery from 'react-photo-gallery';
import Modal from "react-responsive-modal";
import { Col, ControlLabel, FormControl, FormGroup, Button, Form, Glyphicon, DropdownButton, MenuItem } from "react-bootstrap";

import '../../css/Artwork.css';

class Artwork extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      currentPhoto: [],
      currentName: '',
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

  onDetailClose = () => {
    this.setState({ detailsModal: false });
  };

  handleImageClick = (event, obj) => {
    this.setState({ detailsModal: true, currentPhoto: [obj.photo], currentName: obj.photo.name });
  };

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

              <Button bsSize='large' className='complexButton'>
                <Glyphicon glyph='glyphicon glyphicon-plus'/>
              </Button>{' '}
            </FormGroup>
          </Form>
        </div>

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

export default Artwork;
