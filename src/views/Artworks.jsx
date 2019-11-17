import React, { Fragment } from 'react';
import { FetchArtworks } from '../http/Artwork';
import { Card } from '@material-ui/core';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import CardMedia from '@material-ui/core/CardMedia';
import { blueGrey } from '@material-ui/core/colors';
import makeStyles from '@material-ui/core/styles/makeStyles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { map } from 'lodash';
import Grid from '@material-ui/core/Grid';

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
  const [{ data, loading }] = FetchArtworks();
  const classes = useStyles();

  console.log(data);
  return (
    <Fragment>
      {loading ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={5} justify="flex-start">
          {map(data.data, artwork => (
            <Grid key={artwork.id} item xs={12} sm={6} md={6} lg={3}>
              <Card className={classes.card}>
                <CardHeader
                  avatar={<Avatar className={classes.avatar}>{artwork.name[0]}</Avatar>}
                  action={
                    <IconButton aria-label="settings">
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
