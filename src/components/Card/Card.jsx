import React from 'react'
import makeStyles from "@material-ui/core/styles/makeStyles";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";

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

    },
    media: {
        height: 140,
    },

}));

export default function Services(props) {
    const classes = useStyles();
    return (
        <Card className={classes.card}>
            <CardActionArea>
                <CardMedia
                    props.
                    component="img"
                    alt="macbook"
                    height="140"
                    image="assets/img/macbook.png"
                    title="macbook"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        props.TitleTypo
                        Ordinateur
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        props.TextType
                        Visualiser facilement les données critiques de votre galerie à
                        travers une interface intuitive. L'interface web permet une
                        compatibilité avec système windows, Mac et linux.
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}
