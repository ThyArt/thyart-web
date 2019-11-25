import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { map } from 'lodash';
import Typography from '@material-ui/core/Typography';

const styles = makeStyles(theme => ({
  aboutRoot: {
    flexGrow: 1
  },
  aboutContainer: {
    width: '100%',
    margin: '0'
  },
  aboutPaper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    height: '100%',
    minWidth: '300px'
  },
  aboutText: {
    fontSize: '26px'
  },
  aboutDesc: {
    marginTop: '10%',
    marginBottom: '10%',
    fontSize: '20px'
  },
  aboutLogo: {
    marginTop: '10%',
    marginBottom: '10%'
  },
  aboutQuotation: {
    fontSize: '30px',
    padding: '5%',
    marginLeft: '10%'
  },
  aboutQuote: {
    color: '#4A4A4A'
  },
  aboutAuthor: {
    color: '#9B9B9B'
  }
}));

export default function() {
  const classes = styles();

  const cards = [
    {
      alt: 'Abonnement',
      title: "L'abonnement",
      price: "150€/mois",
      text: "Enumération des fonctionnalité",
      cardContent: {
        typoTitle: 'Téléphone',
      }
    },
    {
      alt: 'Service',
      title: "L'accompagnement",
      price: "50€ toutes les 100 données ajoutées",
      text: "Enumération des fonctionnalité"
    }
  ];

  return (
    <div className={classes.aboutRoot}>
      <Grid container spacing={10} justify="center" className={classes.aboutContainer}>
        {map(cards, ({ image, alt, title, price, text }, index) => (
          <Grid item xs={12} sm={6} md={6} lg={3} key={index}>
            <Paper className={classes.aboutPaper}>
              <br />
              <strong className={classes.aboutText}>{title}</strong>
              <br />
              <Typography gutterBottom variant="h5" component="h2">
                {price}
              </Typography>
              <br />
              <p className={classes.aboutDesc}>{text}</p>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
