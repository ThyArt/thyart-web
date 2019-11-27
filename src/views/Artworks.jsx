import React, { Fragment, useEffect, useState } from 'react';
import { FetchArtworks, DeleteArtwork, AddArtwork, PatchArtwork } from 'http/Artwork';
import {
  Card,
  CircularProgress,
  CardMedia,
  Avatar,
  IconButton,
  CardHeader,
  Grid
} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { blueGrey } from '@material-ui/core/colors';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { map, filter, forEach, isEmpty, pick, findIndex, find, slice } from 'lodash';
import Menu from 'components/Menu/Menu';
import Button from 'components/CustomButtons/Button';
import { StateInStock, StateExposed, StateIncoming, StateSold } from 'variables/artwork';
import CreateModal from 'components/Modal/Artwork/CreateModal';

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
  const [{ data: patchData }, patchArtwork] = PatchArtwork();

  const classes = useStyles();

  const modalDefault = {
    open: false,
    title: '',
    name: '',
    price: 0,
    ref: '',
    state: StateInStock,
    files: [],
    initialFiles: [],
    filesModified: false,
    onClick: () => {}
  };
  const targetDefault = {
    artwork: null,
    deleted: false,
    created: false,
    updated: false
  };

  const [artworks, setArtworks] = useState([]);
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [target, setTarget] = useState(targetDefault);
  const [createModal, setCreateModal] = useState({
    open: false,
    name: '',
    price: 0,
    ref: '',
    state: StateInStock,
    files: []
  });

  const {
    open: cmopen,
    name: cmname,
    price: cmprice,
    ref: cmref,
    state: cmstate
  } = createModal;

  const updateCreateModal = (field, value) => setCreateModal({ ...createModal, [field]: value });
  const closeCreateModal = () => setCreateModal({
    open: false,
    name: '',
    price: 0,
    ref: '',
    state: StateInStock,
    files: []
  });

  const createModalFields = [
    {
      content: "Nom de l'oeuvre",
      label: 'Nom',
      type: 'text',
      value: cmname,
      onChange: e => updateCreateModal('name', e.target.value)
    },
    {
      content: "Réference de l'oeuvre",
      label: 'ref',
      type: 'text',
      value: cmref,
      onChange: e => updateCreateModal('ref', e.target.value)
    },
    {
      content: "Etat actuel de l'oeuvre",
      label: 'Etat',
      select: true,
      value: cmstate,
      items: artworkStates,
      onChange: e => updateCreateModal('state', e.target.value)
    },
    {
      content: "Prix de l'oeuvre",
      label: 'prix',
      type: 'number',
      value: cmprice,
      onChange: e => updateCreateModal('price', e.target.value)
    }
  ];

  const menuItems = [
    {
      text: 'supprimer',
      onClick: () => deleteArtwork(target.artwork.id)
    },
    {
      text: 'modifier',
      onClick: () => {}
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
        artwork: patchData ? patchData.data : prevArtwork,
        updated: Boolean(patchData)
      })),
    [patchData]
  );
  useEffect(() => {
    setTarget(({ artwork: prevArtwork, ...rest }) => ({
      ...rest,
      artwork: createData ? createData.data : prevArtwork,
      created: Boolean(createData)
    }));
  }, [createData]);

  useEffect(() => {
    const functions = {
      deleted: () =>
        setArtworks(artworks => filter(artworks, ({ id }) => id !== target.artwork.id)),
      created: () => setArtworks(artworks => [target.artwork, ...artworks]),
      updated: () =>
        setArtworks(artworks => {
          const index = findIndex(artworks, ({ id }) => id === target.artwork.id);
          return [...slice(artworks, 0, index), target.artwork, ...slice(artworks, index + 1)];
        })
    };

    forEach(functions, (func, key) => {
      if (target[key]) {
        func();
        setMenuAnchor(null);
        closeCreateModal();
        setTarget(targetDefault);
      }
    });
  }, [target, targetDefault, modalDefault]);

  return (
    <Fragment>
      <CreateModal
        open={cmopen}
        textFields={createModalFields}
        onChangeFiles={files => updateCreateModal('files', files)}
        onSubmit={() => addArtwork(pick(createModal, ['name', 'ref', 'state', 'price']), createModal.files)}
        onClose={closeCreateModal}
      />

      <Menu
        anchorEl={menuAnchor}
        id={'settings'}
        onClose={() => {
          setMenuAnchor(null);
          setTarget(targetDefault);
        }}
        items={menuItems}
      />

      <Button
        type="button"
        color="primary"
        onClick={() => updateCreateModal('open', true)}
      >
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
