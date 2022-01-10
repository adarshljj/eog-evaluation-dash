import React, { useEffect, useState } from 'react';
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { store } from '../store';

const Graph = () => {
  const [graphData, setGraphData] = useState([]);
  const [selectedMetric, setMetricName] = useState([]);
  const [size, setSize] = useState(0);
  const [Lines, setLines] = useState([]);
  store.subscribe(() => {
    setGraphData(store.getState().metricData);
    setSize(store.getState().dataSize);
    setMetricName(store.getState().selectedMetric);
  });

  useEffect(() => {
    const tempLines: any = [];
    let i = 0;
    selectedMetric.forEach((element: any) => {
      tempLines.push(
        <Line
          key={i}
          type="monotone"
          dot={false}
          dataKey={element.name}
          stroke={element.color}
          animationDuration={300}
        />,
      );
      i++;
    });
    setLines(tempLines);
  }, [selectedMetric]);

  const calDataMax = (dataCount: number) => (dataMax: number) =>
    dataCount > 250 ? dataMax : dataMax + (250 - dataCount) * 1000;
  const CustomizedLabel = ({ x, y, payload }: any) => {
    const dateObj = new Date(payload.value);
    return (
      <g transform={`translate(${x},${y})`}>
        <text x={0} y={0} dy={16}>
          {dateObj.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
          })}
        </text>
      </g>
    );
  };
  const convertTimestamp = (timestamp: any) => {
    const dt = new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    }).format(timestamp);
    return dt;
  };

  const CustomizedToolTip = ({ active, payload, label }: any) => {
    let length;
    var rows = [];

    if (active && payload && payload.length) {
      length = payload.length;
      for (var i = 0; i < length; i++) {
        rows.push(
          <p
            key={i}
            className="text"
            style={{ color: payload[i].stroke }}
          >{`${payload[i].dataKey} : ${payload[i].value}`}</p>,
        );
      }
      return (
        <div
          style={{
            backgroundColor: '#ffffffaa',
            padding: '10px',
            borderColor: '#000000aa',
            borderStyle: 'solid',
            borderWidth: '1px',
            borderRadius: '3px',
          }}
          className="custom-tooltip"
        >
          <p className="label">{convertTimestamp(label)}</p>
          {rows}
        </div>
      );
    }

    return null;
  };
  if (selectedMetric.length > 0) {
    return (
      <div style={{ padding: 50, backgroundColor: '#fff', borderRadius: 5, marginBottom: 20 }}>
        <div className="highlight-bar-charts" style={{ userSelect: 'none', width: '100%', textAlign: 'right' }}>
          <ResponsiveContainer width="97%" height={400}>
            <LineChart
              width={500}
              height={300}
              data={graphData}
              margin={{
                top: 5,
                right: 50,
                left: 0,
                bottom: 5,
              }}
            >
              <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
              <XAxis dataKey="at" tick={<CustomizedLabel />} domain={['dataMin', calDataMax(size)]} />
              <YAxis />
              <Tooltip content={<CustomizedToolTip />} />;
              <Legend />
              {Lines}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  } else {
    return <div style={{ textAlign: 'center' }}> Select a metric to view data</div>;
  }
};

export default Graph;
