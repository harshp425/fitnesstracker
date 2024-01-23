import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const EnduranceIntensityChart = ({ data }) => {
    return (
      <LineChart
        width={1100}
        height={400}
        data={data}
        margin={{
          top: 10, right: 10, left: 80, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" label={{ value: 'Date', position: 'insideBottomRight', offset: -10 }}/>
        <YAxis domain={['dataMin - 10', 'dataMax + 50']}label={{ value: 'Intensity', angle: -90, position: 'insideLeft' }}/>
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="intensity" stroke="#008080" activeDot={{ r: 8 }} />
      </LineChart>
    );
  };
  
  export default EnduranceIntensityChart;