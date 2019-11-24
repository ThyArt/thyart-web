import React, { Fragment, useEffect, useState } from 'react';
import { FetchArtworks, DeleteArtwork, AddArtwork } from 'http/Artwork';
import {
  Card,
  CircularProgress,
  CardMedia,
  Avatar,
  IconButton,
  CardHeader,
  Grid,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogContentText,
  DialogActions
} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { blueGrey } from '@material-ui/core/colors';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { map, filter, forEach, isEmpty } from 'lodash';
import Menu from 'components/Menu/Menu';
import Button from 'components/CustomButtons/Button';
import { StateInStock, StateExposed, StateIncoming, StateSold } from 'variables/artwork';
import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import TextField from 'components/Form/TextField';

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 345
  },
  media: {
    height: 0,
    paddingTop: '56.25%' // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: 'rotate(180deg)'
  },
  avatar: {
    backgroundColor: blueGrey[500]
  }
}));

export default function Artworks() {
  const artworkStates = [
    {
      key: 'En stock',
      value: StateInStock
    },
    {
      key: 'Exposé',
      value: StateExposed
    },
    {
      key: "En cours d'arrivage",
      value: StateIncoming
    },
    {
      key: 'Vendu',
      value: StateSold
    }
  ];

  const [{ data: fetchData, loading: fetchLoading }] = FetchArtworks();
  const [{ data: deleteData }, deleteArtwork] = DeleteArtwork();
  const [{ data: createData }, addArtwork] = AddArtwork();

  const classes = useStyles();

  const modalDefault = {
    open: false,
    title: '',
    name: '',
    price: 0,
    ref: '',
    state: StateInStock,
    onClick: () => {}
  };
  const targetDefault = {
    artwork: null,
    deleted: false,
    created: false
  };

  const [artworks, setArtworks] = useState([]);
  const [modal, setModal] = useState(modalDefault);
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [target, setTarget] = useState(targetDefault);

  const menuItems = [
    {
      text: 'supprimer',
      onClick: () => deleteArtwork(target.artwork.id)
    }
  ];

  useEffect(() => setArtworks(fetchData ? fetchData.data : null), [fetchData]);
  useEffect(() => setTarget(prevState => ({ ...prevState, deleted: Boolean(deleteData) })), [
    deleteData
  ]);
  useEffect(
    () =>
      setTarget(({ artwork: prevArtwork, ...rest }) => ({
        ...rest,
        artwork: createData ? createData.data : prevArtwork,
        created: Boolean(createData)
      })),
    [createData]
  );

  useEffect(() => {
    const functions = {
      deleted: () =>
        setArtworks(artworks => filter(artworks, ({ id }) => id !== target.artwork.id)),
      created: () => setArtworks(artworks => [target.artwork, ...artworks])
    };

    forEach(functions, (func, key) => {
      if (target[key]) {
        func();
        setMenuAnchor(null);
        setModal(modalDefault);
        setTarget(targetDefault);
      }
    });
  }, [target, targetDefault, modalDefault]);

  const { open: modalOpen, title: modalTitle, onClick: onClickModal, ...rest } = modal;

  const modalFields = [
    {
      content: "Nom de l'oeuvre",
      label: 'Nom',
      type: 'text',
      value: 'name'
    },
    {
      content: "Réference de l'oeuvre",
      label: 'ref',
      type: 'text',
      value: 'ref'
    },
    {
      content: "Etat actuel de l'oeuvre",
      label: 'Etat',
      select: true,
      value: 'state',
      items: artworkStates
    },
    {
      content: "Prix de l'oeuvre",
      label: 'prix',
      type: 'number',
      value: 'price'
    }
  ];
  const modalCreate = {
    open: true,
    title: 'Ajouter une oeuvre',
    name: '',
    price: 0,
    ref: '',
    state: StateInStock,
    onClick: data => {
      addArtwork({ data: data });
    }
  };

  return (
    <Fragment>
      <Dialog open={modalOpen} onClose={() => setModal(modalDefault)}>
        <DialogTitle>{modalTitle}</DialogTitle>
        <DialogContent>
          <GridContainer spacing={3}>
            {map(modalFields, ({ content, value, ...rest }) => (
              <Fragment key={value}>
                <GridItem xs={6}>
                  <DialogContentText style={{ marginTop: '10%' }}>{content}</DialogContentText>
                </GridItem>
                <GridItem xs={6}>
                  <TextField
                    {...rest}
                    value={modal[value]}
                    onChange={e => setModal({ ...modal, [value]: e.target.value })}
                  />
                </GridItem>
              </Fragment>
            ))}
          </GridContainer>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setModal(modalDefault)} color="transparent">
            Annuler
          </Button>
          <Button onClick={() => onClickModal(rest)} color="primary">
            Valider
          </Button>
        </DialogActions>
      </Dialog>

      <Menu
        anchorEl={menuAnchor}
        id={'settings'}
        onClose={() => {
          setMenuAnchor(null);
          setTarget(targetDefault);
        }}
        items={menuItems}
      />

      <Button type="button" color="primary" onClick={() => setModal(modalCreate)}>
        Ajouter une oeuvre
      </Button>

      {fetchLoading ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={5} justify="flex-start">
          {map(artworks, artwork => (
            <Grid key={artwork.id} item xs={12} sm={6} md={6} lg={3}>
              <Card className={classes.card}>
                <CardHeader
                  avatar={<Avatar className={classes.avatar}>{artwork.name[0]}</Avatar>}
                  action={
                    <IconButton
                      aria-label="settings"
                      onClick={event => {
                        setMenuAnchor(event.currentTarget);
                        setTarget({ ...targetDefault, artwork: artwork });
                      }}
                    >
                      <MoreVertIcon />
                    </IconButton>
                  }
                  title={artwork.name}
                  subheader={artwork.ref}
                />
                <CardMedia
                  className={classes.media}
                  image={!isEmpty(artwork.images) ? artwork.images[0].urls.small : ''}
                  title={!isEmpty(artwork.images) ? artwork.images[0].name : ''}
                />
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Fragment>
  );
}
