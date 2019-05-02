import React, { Component } from "react";
import Gallery from 'react-photo-gallery';
import Modal from "react-responsive-modal";
import ImageUpload from './ImageUpload';
import {Col,
  ControlLabel,
  FormControl,
  FormGroup,
  Button,
  Form,
  Glyphicon,
  DropdownButton,
  MenuItem,
  Row,
  ToggleButton,
  ButtonToolbar,
  ToggleButtonGroup} from "react-bootstrap";

import '../../css/Artwork.css';
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {getArtWorksIfNeeded, getArtWorkIfNeeded, modifyArtWorkIfNeeded} from "../../actions/actionsArtwork";
import {createArtworkIfNeeded, sortArtworkByState, eraseArtworkIfNeeded} from "../../actions/actionsArtwork";

export class Artwork extends Component {
  constructor(props, context) {
    super(props, context);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      currentPhoto: [],
      file: '',
      search: '',
      reference: '',
      addModal: false,
      price:'',
      AWTitle: '',
      AWState: 1,
      detailsModal: false,
      modifMode: false
    };
  }

  componentDidMount(){
    this.props.dispatch(getArtWorksIfNeeded(this.props.token));
  }

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
        return 'exposed';
    }
  };

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

  onSearchChange = event => {
    this.setState({ search: event.target.value });
  };

  onDetailOpen = () => {
    this.setState({
      modifMode: false,
    });
  };

  onModifOpen = () => {
    this.setState({
      modifMode: !this.state.modifMode,
      price: this.props.artwork.price,
      AWTitle: this.props.artwork.name,
      AWState: this.props.artwork.state,
      reference: this.props.artwork.ref
    });
  };

  onDetailClose = () => {
    this.setState({ detailsModal: false ,
      modifMode: false});
  };

  onModifValidation = () => {
    this.setState({
      detailsModal: false,
      modifMode: false
    });
    this.props.dispatch(modifyArtWorkIfNeeded(this.props.token, this.state.AWTitle, this.state.reference,
      this.getArtWorkState(), this.state.price, this.props.artwork.id));
  };

  handleImageClick = (event, obj) => {
    this.setState({ detailsModal: true});
    this.props.dispatch(getArtWorkIfNeeded(this.props.token, obj.photo.key));
  };

  handleAddArtworkShow = () => {
    this.setState({addModal: true});
  };

  handleAddArtworkClose = () => {
    this.setState({
      addModal: false,
      price:'',
      AWTitle: '',
      AWState: 1
    });
  };

  myCallback = (file) => {
    this.setState({file: file});
  };

  getNewArtworkValidationState = () => {
    if (this.state.file !== '' && this.state.reference !== ''
      && this.state.AWTitle !== '' && this.state.price !== '')
      return 'success';
  };

  getVerification = () => {
    if (this.getNewArtworkValidationState() === 'success') {
      this.props.dispatch(createArtworkIfNeeded(this.state.file, this.props.token, this.state.AWTitle,
        this.state.price, this.state.reference, this.getArtWorkState()));
      this.setState({
        addModal: false,
        price:'',
        AWTitle: '',
        AWState: 1
      });

    }
  };

  handleChange(e) {
    this.setState({AWState: e});
  }

  confirmRemove = () => {
    this.props.dispatch(eraseArtworkIfNeeded(this.props.token, this.props.artwork.id));
    this.setState({
      detailsModal: false
    });
  };

  searchArtworks = () => {
    this.props.dispatch(getArtWorksIfNeeded(this.props.token, this.state.search));
  };

  onSelectAlert = (eventKey) =>{
    switch (eventKey) {
      //a-z
      case 1:
        this.props.artworks.sort( function( a, b ) {
          a = a.name.toLowerCase();
          b = b.name.toLowerCase();

          return a < b ? -1 : a > b ? 1 : 0;
        });
        this.forceUpdate();
        return;
      //z-a
      case 2:
        this.props.artworks.sort( function( a, b ) {
          a = a.name.toLowerCase();
          b = b.name.toLowerCase();

          return a < b ? -1 : a > b ? 1 : 0;
        });
        this.props.artworks.reverse();
        this.forceUpdate();
        return;
      //prix croissant
      case 3:
        this.props.artworks.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        this.forceUpdate();
        return;
      //prix decroissant
      case 4:
        this.props.artworks.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
        this.forceUpdate();
        return;
      //En transit
      case 5:
        this.props.dispatch(sortArtworkByState(this.props.token, 'incoming'));
        return;
      //vendu
      case 6:
        this.props.dispatch(sortArtworkByState(this.props.token, 'sold'));
        return;
      //expose
      case 7:
        this.props.dispatch(sortArtworkByState(this.props.token, 'exposed'));
        return;
      //en stock
      case 8:
        this.props.dispatch(sortArtworkByState(this.props.token, 'in_stock'));
        return;
      //all
      case 9:
        this.props.dispatch(getArtWorksIfNeeded(this.props.token, null));
        return;
      default:
        return;
    }
  };

  render() {
    return (
      <div id='page'>
        <div id='toolbar'>
          <Form inline>
            <FormGroup bsSize='large'>
              <FormControl type='text' value={this.state.search} onChange={this.onSearchChange}
                           placeholder='Enter text to search...' id='searchBar'/>{' '}

              <Button bsStyle='primary' bsSize='large' onClick={this.searchArtworks}>Search</Button>{' '}

              <DropdownButton bsSize='large' className='complexButton'
                              title={<span><Glyphicon glyph='glyphicon glyphicon-filter'/></span>}>
                <MenuItem eventKey={1} onSelect={this.onSelectAlert}>A-Z</MenuItem>
                <MenuItem eventKey={2} onSelect={this.onSelectAlert}>Z-A</MenuItem>
                <MenuItem eventKey={3} onSelect={this.onSelectAlert}>Prix croissant</MenuItem>
                <MenuItem eventKey={4} onSelect={this.onSelectAlert}>Prix décroissant</MenuItem>
                <MenuItem eventKey={5} onSelect={this.onSelectAlert}>En transit</MenuItem>
                <MenuItem eventKey={6} onSelect={this.onSelectAlert}>Vendu</MenuItem>
                <MenuItem eventKey={7} onSelect={this.onSelectAlert}>Exposé</MenuItem>
                <MenuItem eventKey={8} onSelect={this.onSelectAlert}>En stock</MenuItem>
                <MenuItem divider/>
                <MenuItem eventKey={9} onSelect={this.onSelectAlert}>Toutes les catégories</MenuItem>
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
            <Col xs={6}>
              <ImageUpload callbackFromParent={this.myCallback}/>
            </Col>
            <Col xs={6}>
              <form>
                <FormGroup controlId="formValidationSuccess1" className='addModal'
                           validationState={this.getNewArtworkValidationState()}>
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
        { (this.props.artworks && this.props.artworks.length > 0) ?
          (<Gallery photos={this.props.artworks} direction={"column"} onClick={this.handleImageClick}/>
          ) : null
        }
        <Modal open={this.state.detailsModal} onClose={this.onDetailClose} onOpen={this.onDetailOpen}>
          <h1 id='titleModal'>Détails de l'oeuvre</h1>
          {
            (this.props.artwork != null) ?
              (
                <div>

                  <div
                    className="remove"
                    onClick={() => this.confirmRemove()} style={{ cursor: 'pointer', float: 'left'}}
                  >
                    <img src={require('../../static/cross.png')} alt="modify" height="30" width="auto" />
                  </div>
                  < Button bsStyle = "primary" onClick={this.onModifOpen} bsSize='large'>
                    {(this.state.modifMode) ? (<div>Détail</div>) : (<div>Modifier</div>)}
                  </Button>
                  {
                    (this.state.modifMode) ? (
                      <div>
                        <FormGroup controlId="formValidationSuccess1" className='addModal'
                                   validationState={this.getNewArtworkValidationState()}>
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
                        </FormGroup>
                        < Button bsStyle = "primary" onClick={this.onModifValidation} bsSize='large' className='confirmModal'>
                          Valider
                        </Button>
                      </div>
                    ) : (
                      <div>
                        <Row>
                          <Col sm={5} id='photoModal'>
                            { (this.props.artwork != null && this.props.artwork.images != null) ?
                              (<img src={this.props.artwork.src} alt=''/>
                              ): null
                            }
                          </Col>
                        </Row>
                        <Row>
                          <Col sm={2}>
                            Titre:
                          </Col>
                          <Col sm={2}>
                            {this.props.artwork.name}
                          </Col>
                        </Row>
                        <Row>
                          <Col sm={2}>
                            Référence:
                          </Col>
                          <Col sm={2}>
                            {this.props.artwork.ref}
                          </Col>
                        </Row>
                        <Row>
                          <Col sm={2}>
                            Prix:
                          </Col>
                          <Col sm={2}>
                            {this.props.artwork.price}
                          </Col>
                        </Row>
                        <Row>
                          <Col sm={2}>
                            État:
                          </Col>
                          <Col sm={2}>
                            {this.props.artwork.state}
                          </Col>
                        </Row>
                      </div>
                    )
                  }
                </div>
              ) :
              null
          }
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
  artworks: PropTypes.array,
  artwork: PropTypes.object,
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  const {
    isFetching,
    msg,
    error,
    artworks,
    artwork
  } = state.artworks;

  return {
    isFetching,
    msg,
    error,
    artworks,
    artwork
  }
}

export default connect(mapStateToProps)(Artwork);