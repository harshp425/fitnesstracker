import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const StrengthRepChart = ({ data }) => {
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
        <YAxis domain={[0, 'dataMax + 20']}/>
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="reps" stroke="#000080" activeDot={{ r: 8 }} />
      </LineChart>
    );
  };
  
  export default StrengthRepChart;