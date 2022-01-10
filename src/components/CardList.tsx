import { Card, CardContent, Typography } from '@material-ui/core';
import React, { FC, useEffect, useState } from 'react';
import { Props } from 'react-select';
import { store } from '../store';

const CardList: FC<Props> = () => {
  const [selectedMetrics, setSelectedMetrics] = useState([]);
  const [topEntry, setTopEntry] = useState([]);
  const [cards, setCards] = useState([]);
  store.subscribe(() => {
    setSelectedMetrics(store.getState().selectedMetric);
    const tempEntry = store.getState().metricData;
    setTopEntry(tempEntry[tempEntry.length - 2]);
  });
  useEffect(() => {
    const tempCards: any = [];
    let i = 0;
    selectedMetrics.forEach((element: any) => {
      tempCards.push(
        <div style={{ height: 150, width: 200, display: 'table-cell' }} key={i}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom style={{ textAlign: 'center' }}>
                {element.name}
              </Typography>
              <Typography variant="h5" gutterBottom style={{ textAlign: 'center' }}>
                {topEntry[element.name]}
              </Typography>
            </CardContent>
          </Card>
        </div>,
      );
      i++;
    });
    setCards(tempCards);
  }, [topEntry, selectedMetrics]);

  return <div style={{ display: 'table', borderSpacing: 25 }}>{cards}</div>;
};

export default CardList;
