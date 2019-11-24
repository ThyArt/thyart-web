import React, { Fragment, useEffect, useState } from 'react';
import { FetchArtworks, DeleteArtwork } from 'http/Artwork';
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
import { map, filter } from 'lodash';
import Menu from 'components/Menu/Menu';
import Dialog from '@material-ui/core/Dialog';
import Button from 'components/CustomButtons/Button';

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
  const [{ data: fetchData, loading: fetchLoading }] = FetchArtworks();
  const [{ data: deleteData }, deleteArtwork] = DeleteArtwork();

  const classes = useStyles();

  const [artworks, setArtworks] = useState([]);
  const [{ target, artworkId }, setMenuAnchor] = useState({ target: null, artworkId: null });
  const [modalOpen, setModalOpen] = useState(false);

  const menuItems = [
    {
      text: 'supprimer',
      onClick: () => deleteArtwork(artworkId)
    }
  ];

  useEffect(() => {
    setArtworks(fetchData ? fetchData.data : null);
  }, [fetchData]);

  useEffect(() => {
    if (deleteData) {
      setArtworks(filter(artworks, ({ id }) => id !== artworkId));
      setMenuAnchor({ target: null, artworkId: null });
    }
  }, [deleteData]);

  return (
    <Fragment>
      <Menu
        anchorEl={target}
        id={'settings'}
        onClose={() => setMenuAnchor({ target: null, artworkId: null })}
        items={menuItems}
      />
      <Dialog open={modalOpen} onClose={() => setModalOpen(false)}></Dialog>

      <Button type="button" color="primary" onClick={() => setModalOpen(true)}>
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
                      onClick={event =>
                        setMenuAnchor({ target: event.currentTarget, artworkId: artwork.id })
                      }
                    >
                      <MoreVertIcon />
                    </IconButton>
                  }
                  title={artwork.name}
                  subheader={artwork.ref}
                />
                <CardMedia
                  className={classes.media}
                  image={artwork.images ? artwork.images[0].urls.small : ''}
                  title={artwork.images ? artwork.images[0].name : ''}
                />
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Fragment>
  );
}
