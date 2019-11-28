import React, { useEffect, useState } from 'react';
import {
  XYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  VerticalBarSeries
} from 'react-vis';
import { makeStyles } from '@material-ui/core';
import { GetStats } from 'http/Stats';
import { each } from 'lodash';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';

const useStyle = makeStyles({
  container: {
    width: '550px',
    height: '450px',
    textAlign: 'center',
    fontweight: 'bold'
  }
});

export default function Stats() {
  const classes = useStyle();
  const [stats, setStats] = useState([]);
  const [{ data: currentData }, refresh] = GetStats();

  useEffect(() => {
    refresh();
  }, [refresh]);

  useEffect(() => {
    if (currentData) {
      setStats(currentData);
    }
  }, [currentData]);

  const formatResult = () => {
    const tmp = [];
    each(stats, obj => {
      tmp.push(
        { x: 'Jour', y: obj.daily },
        { x: 'Semaine', y: obj.weekly },
        { x: 'Mois', y: obj.monthly },
        { x: 'Trimestre', y: obj.trimester },
        { x: 'Semestre', y: obj.semester },
        { x: 'Année', y: obj.yearly }
      );
    });
    return tmp;
  };
  return (
    <Card className={classes.container}>
      <CardHeader title={"Chiffre d'affaire en K€"} />
      <CardContent>
        {currentData ? (
          <XYPlot xType="ordinal" width={500} height={350} xDistance={100}>
            <VerticalGridLines />
            <HorizontalGridLines />
            <XAxis />
            <YAxis />
            <VerticalBarSeries data={formatResult()} />
          </XYPlot>
        ) : null}
      </CardContent>
    </Card>
  );
}
