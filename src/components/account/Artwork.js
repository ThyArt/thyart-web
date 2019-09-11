import React, { Component } from "react";
import Gallery from "react-photo-gallery";
import Modal from "react-responsive-modal";
import ImageUpload from "./ImageUpload";
import {
  Col,
  FormLabel,
  FormControl,
  FormGroup,
  Button,
  Form,
  DropdownButton,
  DropdownItem,
  Row,
  ToggleButton,
  ButtonToolbar,
  ToggleButtonGroup
} from "react-bootstrap";

import "../../css/Artwork.css";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  getArtWorksIfNeeded,
  getArtWorkIfNeeded,
  modifyArtWorkIfNeeded,
} from "../../actions/actionsArtwork";
import {
  createArtworkIfNeeded,
  sortArtworks,
  eraseArtworkIfNeeded,
  getArtworkByStateIfNeeded
} from "../../actions/actionsArtwork";
import InputGroup from "react-bootstrap/InputGroup";
import Container from "react-bootstrap/Container";

export class Artwork extends Component {
  constructor(props, context) {
    super(props, context);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      currentPhoto: [],
      file: "",
      search: "",
      reference: "",
      addModal: false,
      price: "",
      AWTitle: "",
      AWState: 1,
      detailsModal: false,
      modifMode: false
    };
  }

  componentDidMount() {
    this.props.dispatch(getArtWorksIfNeeded(this.props.token));
  }

  getArtWorkState = () => {
    switch (this.state.AWState) {
      case 1:
        return "exposed";
      case 2:
        return "in_stock";
      case 3:
        return "sold";
      case 4:
        return "incoming";
      default:
        return "exposed";
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
      modifMode: false
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
    this.setState({
      detailsModal: false,
      modifMode: false
    });
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
    this.setState({ detailsModal: true });
    this.props.dispatch(getArtWorkIfNeeded(this.props.token, obj.photo.key));
  };

  handleAddArtworkShow = () => {
    this.setState({ addModal: true });
  };

  handleAddArtworkClose = () => {
    this.setState({
      addModal: false,
      price: "",
      AWTitle: "",
      AWState: 1
    });
  };

  myCallback = (file) => {
    this.setState({ file: file });
  };

  getNewArtworkValidationState = () => {
    if (this.state.file !== "" && this.state.reference !== ""
      && this.state.AWTitle !== "" && this.state.price !== "")
      return "success";
  };

  getVerification = () => {
    if (this.getNewArtworkValidationState() === "success") {
      this.props.dispatch(createArtworkIfNeeded(this.state.file, this.props.token, this.state.AWTitle,
        this.state.price, this.state.reference, this.getArtWorkState()));
      this.setState({
        addModal: false,
        price: "",
        AWTitle: "",
        AWState: 1
      });

    }
  };

  handleChange(e) {
    this.setState({ AWState: e });
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

  onSelectAlert = (eventKey) => {
    const filters = {
      "1": "nameA",
      "2": "nameZ",
      "3": "priceInc",
      "4": "priceDec"
    };
    switch (eventKey) {
      case 1:
      case 2:
      case 3:
      case 4:
        this.props.dispatch(sortArtworks(filters[eventKey.toString()]));
        return;
      case 5:
        this.props.dispatch(getArtworkByStateIfNeeded(this.props.token, "incoming"));
        return;
      case 6:
        this.props.dispatch(getArtworkByStateIfNeeded(this.props.token, "sold"));
        return;
      case 7:
        this.props.dispatch(getArtworkByStateIfNeeded(this.props.token, "exposed"));
        return;
      case 8:
        this.props.dispatch(getArtworkByStateIfNeeded(this.props.token, "in_stock"));
        return;
      case 9:
        this.props.dispatch(getArtWorksIfNeeded(this.props.token, null));
        return;
      default:
        return;
    }
  };

  render() {
    return (
      <div>
        <div>
          <Container fluid>
            <Col xl={10} lg={10} id={"colSearchBarContainer"}>
              <InputGroup className="mb-3">
                <InputGroup.Prepend>
                  <Button bssize='large'
                          id='ajouter'
                          onClick={this.handleAddArtworkShow}>
                    Ajouter
                  </Button>
                </InputGroup.Prepend>
                <FormControl
                  id={"searchBar"}
                  type={"text"}
                  value={this.state.search}
                  onChange={this.onSearchChange}
                  placeholder='Entrer le texte à rechercher...'
                />
                <InputGroup.Append>
                  <Button
                    id={"search"}
                    variant="outline-primary"
                    bsstyle='primary'
                    bssize='large' onClick={this.searchArtworks}>Rechercher</Button>
                  <DropdownButton
                    as={InputGroup.Append}
                    variant="outline-secondary"
                    title="Filtres"
                    id="dropDownFilter"
                  >
                    <DropdownItem eventKey={1} onSelect={this.onSelectAlert}>A-Z</DropdownItem>
                    <DropdownItem eventKey={2} onSelect={this.onSelectAlert}>Z-A</DropdownItem>
                    <DropdownItem eventKey={3} onSelect={this.onSelectAlert}>Prix croissant</DropdownItem>
                    <DropdownItem eventKey={4} onSelect={this.onSelectAlert}>Prix décroissant</DropdownItem>
                    <DropdownItem eventKey={5} onSelect={this.onSelectAlert}>En transit</DropdownItem>
                    <DropdownItem eventKey={6} onSelect={this.onSelectAlert}>Vendu</DropdownItem>
                    <DropdownItem eventKey={7} onSelect={this.onSelectAlert}>Exposé</DropdownItem>
                    <DropdownItem eventKey={8} onSelect={this.onSelectAlert}>En stock</DropdownItem>
                    <DropdownItem divider/>
                    <DropdownItem eventKey={9} onSelect={this.onSelectAlert}>Toutes les catégories</DropdownItem>
                  </DropdownButton>
                </InputGroup.Append>
              </InputGroup>
            </Col>
          </Container>

        </div>

        <Modal dialogClassName="addArtWork-modal" open={this.state.addModal} onClose={this.handleAddArtworkClose}>
          <h1 id='titleModal'>Ajouter une oeuvre</h1>
          <Row>
            <Col xs={6}>
              <ImageUpload callbackFromParent={this.myCallback} style={{ maxWidth: "100%", maxHeight: "100%" }}/>
            </Col>
            <Col xs={6}>
              <Form>
                <FormGroup controlId="formValidationSuccess1" className='addModal'
                           validationState={this.getNewArtworkValidationState()}>
                  <FormLabel>Nom de l'oeuvre</FormLabel>
                  <FormControl type='text' value={this.state.AWTitle} onChange={this.onAWTitleChange}/>
                  <FormLabel>Reference</FormLabel>
                  <FormControl type='text' value={this.state.reference} onChange={this.onReferenceChange}/>
                  <FormLabel>Prix</FormLabel>
                  <FormControl type='number' value={this.state.price} onChange={this.onPriceChange}/>

                  <ButtonToolbar>
                    <ToggleButtonGroup id={"artWorkState"}
                                       type="radio"
                                       value={this.state.AWState}
                                       onChange={this.handleChange}
                                       name="options"
                                       block>
                      <ToggleButton value={1}>Exposé</ToggleButton>
                      <ToggleButton value={2}>Stock</ToggleButton>
                      <ToggleButton value={3}>Vendu</ToggleButton>
                      <ToggleButton value={4}>En transit</ToggleButton>
                    </ToggleButtonGroup>
                  </ButtonToolbar>
                  <Button bsstyle="primary" onClick={this.getVerification} bssize='large'>
                    Valider
                  </Button>
                </FormGroup>
              </Form>
            </Col>
          </Row>
        </Modal>
        {(this.props.artworks && this.props.artworks.length > 0) ?
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
                    onClick={() => this.confirmRemove()} style={{ cursor: "pointer", float: "left" }}
                  >
                    <img src={require("../../static/cross.png")} alt="modify" height="30" width="auto"/>
                  </div>
                  < Button bsstyle="primary" onClick={this.onModifOpen} bssize='large'>
                    {(this.state.modifMode) ? (<div>Détail</div>) : (<div>Modifier</div>)}
                  </Button>
                  {
                    (this.state.modifMode) ? (
                      <div>
                        <FormGroup controlId="formValidationSuccess1" className='addModal'
                                   validationState={this.getNewArtworkValidationState()}>
                          <FormLabel>Nom de l'oeuvre</FormLabel>
                          <FormControl type='text' value={this.state.AWTitle} onChange={this.onAWTitleChange}/>
                          <FormLabel>Reference</FormLabel>
                          <FormControl type='text' value={this.state.reference} onChange={this.onReferenceChange}/>
                          <FormLabel>Prix</FormLabel>
                          <FormControl type='number' value={this.state.price} onChange={this.onPriceChange}/>

                          <ButtonToolbar>
                            <ToggleButtonGroup id={"artWorkState"}
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
                        < Button bsstyle="primary" onClick={this.onModifValidation} bssize='large'
                                 className='confirmModal'>
                          Valider
                        </Button>
                      </div>
                    ) : (
                      <div>
                        <Row className='detailsModalRows'>
                          <Col sm={12}>
                            {this.props.artwork.images[0] ?
                              <img src={this.props.artwork.images[0].urls['origin']} alt="image" className='detailsModalImage'/> :
                              null
                            }
                          </Col>
                          <Col sm={12} className='detailsModalCols'>
                            <Row>
                              <Col sm={3}>
                                Titre:
                              </Col>
                              <Col sm={9}>
                                {this.props.artwork.name}
                              </Col>
                            </Row>
                            <Row>
                              <Col sm={3}>
                                Référence:
                              </Col>
                              <Col sm={9}>
                                {this.props.artwork.ref}
                              </Col>
                            </Row>
                            <Row>
                              <Col sm={3}>
                                Prix:
                              </Col>
                              <Col sm={9}>
                                {this.props.artwork.price}
                              </Col>
                            </Row>
                            <Row>
                              <Col sm={3}>
                                État:
                              </Col>
                              <Col sm={9}>
                                {this.props.artwork.state}
                              </Col>
                            </Row>
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
  };
}

export default connect(mapStateToProps)(Artwork);