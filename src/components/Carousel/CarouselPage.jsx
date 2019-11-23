import React from 'react';
import AwesomeSlider from 'react-awesome-slider';
import withAutoplay from 'react-awesome-slider/dist/autoplay';
import 'react-awesome-slider/dist/styles.css';
import carImg1 from 'assets/img/carousel.png';
import carImg2 from 'assets/img/galerie.png';
import carImg3 from 'assets/img/mess.png';
import makeStyles from '@material-ui/core/styles/makeStyles';

const AutoplaySlider = withAutoplay(AwesomeSlider);
const useStyles = makeStyles({
  container: {
    height: '70vh'
  }
});

export default function CarouselPage() {
  const classes = useStyles();
  return (
    <AutoplaySlider
      play
      cancelOnInteraction={false} // should stop playing on user interaction
      interval={6000}
      infinite
      className={classes.container}
    >
      <div data-src={carImg1} />
      <div data-src={carImg2} />
      <div data-src={carImg3} />
    </AutoplaySlider>
  );
}
