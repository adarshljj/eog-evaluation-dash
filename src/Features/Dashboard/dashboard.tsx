import { useQuery, useSubscription } from '@apollo/client';
import React, { FC, useEffect } from 'react';
import { Props } from 'react-select';
import CardList from '../../components/CardList';
import Graph from '../../components/Graph';
import MetricSelector from '../../components/Select';
import { store } from '../../store';
import * as Actions from '../../store/actions';
import { METRIC_NAME_LIST, SUBSCRIPTION_QUERY } from '../Data/queries';

const Dashboard: FC<Props> = () => {
  const MetricNameResponse = useQuery(METRIC_NAME_LIST);

  useEffect(() => {
    if (MetricNameResponse.data) {
      store.dispatch(Actions.InitiateMetrics(MetricNameResponse.data.getMetrics));
    }
  }, [MetricNameResponse.data]);
  const SubscriptionResponse = useSubscription(SUBSCRIPTION_QUERY);
  useEffect(() => {
    if (SubscriptionResponse.data) {
      store.dispatch(Actions.UpdateMetricsNew(SubscriptionResponse.data.newMeasurement));
    }
  }, [SubscriptionResponse.data]);

  return (
    <div style={{ marginLeft: 30, marginRight: 30 }}>
      <MetricSelector />
      <CardList />
      <Graph />
    </div>
  );
};

export default Dashboard;
