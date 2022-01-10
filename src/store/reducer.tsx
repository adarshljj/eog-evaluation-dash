import * as actions from './actions';
import * as Type from '../Features/Data/Types';
const MAX_SIZE = 250;

const initialState: Type.StateType = {
  metricList: [],
  metricData: [],
  selectedMetric: [],
  dataSize: 0,
  nextObject: [],
};

let tempMetricData: Array<Object> = [];

export const reducer = (state = initialState, action: Type.ActionType) => {
  switch (action.type) {
    case actions.UPDATE_METRIC_NEW:
      const { metric, at, value } = action.data;
      const nextReducedMetricData = [...state.metricData];
      let nextDataSize = state.dataSize;

      const topData = nextReducedMetricData.pop() || { at, [metric]: value };
      if (topData.at === at) {
        nextReducedMetricData.push({ ...topData, [metric]: value });
      } else {
        nextReducedMetricData.push(topData);
        nextReducedMetricData.push({ at, [metric]: value });
        if (state.dataSize > MAX_SIZE) {
          nextReducedMetricData.shift();
        } else {
          nextDataSize = nextReducedMetricData.length;
        }
      }

      return {
        ...state,
        metricData: nextReducedMetricData,
        dataSize: nextDataSize,
        nextObject: {
          ...state.nextObject,
          [metric]: value,
        },
      };
    case actions.SET_METRIC_LIST: {
      return {
        ...state,
        metricList: action.data,
      };
    }
    case actions.SET_HISTORICAL_DATA: {
      const { data } = action;
      if (data.length < 1) {
        return state;
      }

      let previousElement: any = {};
      let index = 0;
      data.map((metricElement: any) => {
        metricElement.measurements.map((e: any) => {
          if (e.metric !== previousElement.metric) {
            index = 0;
          }
          tempMetricData[index] = { ...tempMetricData[index], at: e.at, [e.metric]: e.value };
          previousElement = e;
          index++;
          return null;
        });
        return null;
      });
      return {
        ...state,
        metricData: tempMetricData,
      };
    }

    case actions.CHANGE_SELECTED_METRIC_DATA: {
      return { ...state, selectedMetric: action.data };
    }
    default: {
      return state;
    }
  }
};
