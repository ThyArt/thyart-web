import React, { Fragment } from 'react';
import { makeStyles } from "@material-ui/styles";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

const styles = makeStyles(theme => ({
  aboutRoot: {
    flexGrow: 1,
    backgroundColor: '#f4f5f7',
  },
  aboutContainer: {
    width: '100%',
  },
  AboutPaper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: '100%',
  },
  aboutText: {
    fontSize: '26px',
  },
  aboutDesc: {
    marginTop: '10%',
    marginBottom: '10%',
    fontSize: '20px',
  },
  aboutLogo: {
    marginTop: '10%',
    marginBottom: '10%',
  },
  aboutQuotation: {
    fontSize: '30px',
    padding: '5%',
  },
  aboutQuote: {
    color: '#4A4A4A',
  },
  aboutAuthor: {
    color: '#9B9B9B',
  },
}));

export default function () {
  const classes = styles();

  return (
      <div className={classes.aboutRoot}>
        <Grid container spacing={10} justify="center" className={classes.aboutContainer}>
          <Grid item xs={3}>
            <Paper className={classes.AboutPaper}>
              <img
                  src={require("assets/img/manage_icon.png")}
                  alt="manage"
                  height="120"
                  width="auto"
                  className={classes.aboutLogo}
              />
              <br/>
              <strong className={classes.aboutText}>Gestion</strong>
              <br/>
              <p className={classes.aboutDesc}>
                Gérez votre activité, de la réception d'une oeuvre à la
                facturation.
              </p>
            </Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper className={classes.AboutPaper}>
              <img
                  src={require("assets/img/suivi_icon.png")}
                  alt="manage"
                  height="120"
                  width="auto"
                  className={classes.aboutLogo}
              />
              <br/>
              <strong className={classes.aboutText}>Suivi</strong>
              <br/>
              <p className={classes.aboutDesc}>
                Suivez les oeuvres grâce au code QR avec notre application pour
                savoir exactement le statut de votre collection.
              </p>
            </Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper className={classes.AboutPaper}>
              <img
                  src={require("assets/img/relation_icon.png")}
                  alt="manage"
                  height="120"
                  width="auto"
                  className={classes.aboutLogo}
              />
              <br/>
              <strong className={classes.aboutText}>Relation</strong>
              <br/>
              <p className={classes.aboutDesc}>
                Restez en contact avec les artistes et vos clients à travers
                notre plateforme.
              </p>
            </Paper>
          </Grid>
        </Grid>
        <div className={classes.aboutQuotation}>
          <em className={classes.aboutQuote}>
            "Mes notes ne suffisent pas pour retrouver quelles oeuvres a acheté
            un client."
          </em>
          <br/>
          <p className={classes.aboutAuthor}>Philipe Eschenlohr, Galerie Raugraff</p>
        </div>
      </div>
  );
};
