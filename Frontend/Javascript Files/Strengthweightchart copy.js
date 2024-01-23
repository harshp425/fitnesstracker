import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const StrengthWeightChart = ({ data }) => {
    return (
      <LineChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis domain={['dataMin-30', 'dataMax + 50']}/>
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="weight" stroke="#32CD32" activeDot={{ r: 8 }} />
      </LineChart>
    );
  };
  
  export default StrengthWeightChart;