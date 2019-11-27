import React from 'react';
import { XYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines, VerticalBarSeries} from 'react-vis';
import { Paper } from '@material-ui/core';

const data = [
  { x: 'Jour', y: 10 },
  { x: 'Semaine', y: 5 },
  { x: 'Mois', y: 15 },
  { x: 'Trimestre', y: 15 },
  { x: 'Semestre', y: 15 },
  { x: 'Année', y: 15 }
];

export default function Stats() {
  return (
    <Paper>
      <XYPlot xType="ordinal" width={300} height={300} xDistance={100}>
        <VerticalGridLines />
        <HorizontalGridLines />
        <XAxis />
        <YAxis />
        <VerticalBarSeries data={data} />
      </XYPlot>
    </Paper>
  );
}
