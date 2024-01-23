import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const EndurancepaceChart = ({ data }) => {
    return (
      <LineChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 10, right: 10, left: 80, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="duration" label={{ value: 'Duration', position: 'insideBottomRight', offset: -10 }} />
        <YAxis domain={['dataMin - 1', 'dataMax + 5']} label={{value: 'Pace', angle: -90, position: 'insideLeft' }}/>
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="pace" stroke="#800000" activeDot={{ r: 8 }} />
      </LineChart>
    );
  };
  
  export default EndurancepaceChart;