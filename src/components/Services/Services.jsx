import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import _ from 'lodash';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },

  card: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    margin: 'auto',
    maxWidth: 500,
    height: 420
  },
  mediaH: {
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '100%'
  },
  mediaV: {
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '30%'
  }
}));

const macbookDesc =
  'Visualiser facilement les données critiques de votre galerie à\n' +
  "                                    travers une interface intuitive. L'interface web permet une\n" +
  '                                    compatibilité avec système windows, Mac et linux.';

const iPhoneDesc =
  'La version mobile du site vous permet de consulter les\n' +
  '                                    informations de votre galerie tout en étant en déplacement';

export default function Services() {
  const classes = useStyles();
  const cardsSpec = {
    macbook: {
      cardMedia: {
        className: classes.mediaH,
        component: 'img',
        alt: 'macbook',
        image: require('assets/img/macbook.png'),
        title: 'macbook'
      },
      cardContent: {
        typoTitle: 'Ordinateur',
        typoText: macbookDesc
      }
    },
    iphone: {
      cardMedia: {
        className: classes.mediaV,
        component: 'img',
        alt: 'iPhone',
        image: require('assets/img/iPhone-X-Mockup.png'),
        title: 'iPhone'
      },
      cardContent: {
        typoTitle: 'Téléphone',
        typoText: iPhoneDesc
      }
    }
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        {_.map(cardsSpec, (item, index) => (
          <Grid item xs={6} key={index}>
            <Card className={classes.card}>
              <CardActionArea>
                <CardMedia {...item.cardMedia} />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {item.cardContent.typoTitle}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    {item.cardContent.typoText}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
