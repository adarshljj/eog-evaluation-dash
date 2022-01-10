import { useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { HISTORICAL_DATA_QUERY } from '../Features/Data/queries';
import { store } from '../store';
import * as Actions from '../store/actions';

const animatedComponents = makeAnimated();

type SelectObjectType = {
  value: string;
  label: string;
};

type LineObject = {
  name: string;
  color: string;
};

type InputType = {
  metricName: string;
  after: number;
};

function MetricSelector() {
  const [options, setOptions] = useState([]);
  const [input, setInput] = useState<Array<InputType>>([]);
  const [metricList, setMetricList] = useState([]);
  let prevState: any = { metricList: [], selectedMetric: [] };
  const colorGrid = ['#2D4263', '#C84B31', '#864879', '#7D1935', '#4E9F3D', '#347474'];
  store.subscribe(() => {
    const newState = store.getState();
    if (prevState.metricList !== newState.metricList) {
      setMetricList(newState.metricList);
    }
    prevState = newState;
  });
  const temp: any = [];
  const inputTemp: any = [];

  useEffect(() => {
    metricList.forEach((e: any) => {
      inputTemp.push({ metricName: e, after: Math.floor(Date.now() / 1000) - 1800 });
      temp.push({ value: e, label: e });
    });

    setInput(inputTemp);
    setOptions(temp);
  }, [metricList]);

  const HistoricalResponse = useQuery<any>(HISTORICAL_DATA_QUERY, {
    variables: {
      input,
    },
  });
  useEffect(() => {
    if (HistoricalResponse.data) {
      store.dispatch(Actions.InitiateHistoricalData(HistoricalResponse.data.getMultipleMeasurements));
    }
  }, [HistoricalResponse.loading, HistoricalResponse.data]);
  return (
    <div style={{ marginTop: 20, marginLeft: 300, marginRight: 300 }}>
      <Select
        components={animatedComponents}
        options={options}
        closeMenuOnSelect={false}
        isMulti
        onChange={(e: any) => {
          let arr: Array<LineObject> = [];
          let i = 0;
          e.forEach((element: SelectObjectType) => {
            arr.push({ name: element.value, color: colorGrid[i] });
            i++;
          });
          store.dispatch(Actions.ChangeSelectedMetric(arr));
        }}
      />
    </div>
  );
}

// const mapStateToProps = (state: any) => ({
//   metricList: state.metricList,
//   selectedMetric: state.selectedMetric,
// });

// function mapDispatchToProps(dispatch: any) {
//   return {
//     ChangeSelectedMetric: (p: any) => dispatch(Action.ChangeSelectedMetric(p)),
//   };
// }

export default MetricSelector;
