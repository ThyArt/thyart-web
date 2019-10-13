import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { map } from 'lodash';
import manageIcon from 'assets/img/manage_icon.png';
import suiviIcon from 'assets/img/suivi_icon.png';
import relationIcon from 'assets/img/relation_icon.png';

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
      image: manageIcon,
      alt: 'manage',
      title: 'Gestion',
      text: "Gérez votre activité, de la réception d'une oeuvre à la facturation."
    },
    {
      image: suiviIcon,
      alt: 'status',
      title: 'Suivi',
      text:
        ' Suivez les oeuvres grâce au code QR avec notre application pour savoir exactement le statut de votre collection.'
    },
    {
      image: relationIcon,
      alt: 'relation',
      title: 'Relation',
      text: 'Restez en contact avec les artistes et vos clients à travers notre plateforme.'
    }
  ];

  return (
    <div className={classes.aboutRoot}>
      <Grid container spacing={10} justify="center" className={classes.aboutContainer}>
        {map(cards, ({ image, alt, title, text }) => (
          <Grid item xs={12} sm={6} md={6} lg={3}>
            <Paper className={classes.aboutPaper}>
              <img src={image} alt={alt} height="100" width="auto" className={classes.aboutLogo} />
              <br />
              <strong className={classes.aboutText}>{title}</strong>
              <br />
              <p className={classes.aboutDesc}>{text}</p>
            </Paper>
          </Grid>
        ))}
      </Grid>
      <div className={classes.aboutQuotation}>
        <em className={classes.aboutQuote}>
          "Mes notes ne suffisent pas pour retrouver quelles oeuvres a acheté un client."
        </em>
        <br />
        <p className={classes.aboutAuthor}>Philipe Eschenlohr, Galerie Raugraff</p>
      </div>
    </div>
  );
}
