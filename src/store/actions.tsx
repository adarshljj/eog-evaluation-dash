export const SET_METRIC_LIST = 'SET_METRIC_LIST';
export const SET_HISTORICAL_DATA = 'SET_HISTORICAL_DATA';
export const CHANGE_SELECTED_METRIC_DATA = 'CHANGE_SELECTED_METRIC_DATA';
export const UPDATE_METRIC_NEW = 'UPDATE_METRIC_NEW';

export function InitiateMetrics(data: []) {
  return {
    type: SET_METRIC_LIST,
    data,
    info: 'Initialize the metrics name.',
  };
}

export function InitiateHistoricalData(data: []) {
  return {
    type: SET_HISTORICAL_DATA,
    data,
    info: 'Initialize the metrics data.',
  };
}

export function ChangeSelectedMetric(data: any) {
  return {
    type: CHANGE_SELECTED_METRIC_DATA,
    data,
    info: 'Change selected metrics data.',
  };
}
export function UpdateMetricsNew(data: any) {
  return {
    type: UPDATE_METRIC_NEW,
    data,
    info: 'Change selected metrics data.',
  };
}
