import React from 'react'
import makeStyles from "@material-ui/core/styles/makeStyles";
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles(theme=>({
    root: {
        flexGrow: 1,
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
        height: '250px',
        width: "auto"
    },
    mediaV: {
        height: '250px',
        width: "auto",
        marginLeft: "170px"
    }

}));

export default function Services() {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={6}>
                    <Card className={classes.card}>
                        <CardActionArea>
                            <CardMedia className={classes.mediaH}
                                component="img"
                                alt="macbook"
                                image={require('assets/img/macbook.png')}
                                title="macbook"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    Ordinateur
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    Visualiser facilement les données critiques de votre galerie à
                                    travers une interface intuitive. L'interface web permet une
                                    compatibilité avec système windows, Mac et linux.
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
                <Grid item xs={6}>
                    <Card className={classes.card}>
                        <CardActionArea>
                            <CardMedia className={classes.mediaV}
                                component="img"
                                alt="Iphone"
                                image={require('assets/img/iPhone-X-Mockup.png')}
                                title="Iphone"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    Téléphone
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    La version mobile du site vous permet de consulter les
                                    informations de votre galerie tout en étant en déplacement
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
            </Grid>
        </div>
    );
}