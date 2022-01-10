import { gql } from '@apollo/client';

export const SUBSCRIPTION_QUERY = gql`
  subscription {
    newMeasurement {
      metric
      at
      value
      unit
    }
  }
`;

export const HISTORICAL_DATA_QUERY = gql`
  query ($input: [MeasurementQuery]) {
    getMultipleMeasurements(input: $input) {
      metric
      measurements {
        metric
        value
        unit
        at
      }
    }
  }
`;

export const METRIC_NAME_LIST = gql`
  query {
    getMetrics
  }
`;
