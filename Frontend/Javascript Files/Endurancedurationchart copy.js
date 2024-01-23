import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const EndurancedurationChart = ({ data }) => {
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
        <XAxis dataKey="date" label={{ value: 'Date', position: 'insideBottomRight', offset: -10 }}/>
        <YAxis domain={['dataMin - 2', 'dataMax + 6']} label={{ value: 'Distance', angle: -90, position: 'insideLeft' }}/>
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="distance" stroke="#191970" activeDot={{ r: 8 }} />
      </LineChart>
    );
  };
  
  export default EndurancedurationChart;