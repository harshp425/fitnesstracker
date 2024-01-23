import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const StrengthVolumeChart = ({ data }) => {
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
        <XAxis dataKey="date" />
        <YAxis domain={['dataMin - 100', 'dataMax + 200']}/>
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="volume_load" stroke="#FFA500" activeDot={{ r: 8 }} />
      </LineChart>
    );
  };
  
  export default StrengthVolumeChart;