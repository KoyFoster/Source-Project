/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import './index.css';
import { RTGTools } from '../../RTGraph';
// import { RTDGen } from '../../RTDGen';
// import { Ticker } from '../../RTDGen/Timer';
import {
  Brush,
  CartesianGrid,
  Legend,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
  Line,
  ResponsiveContainer,
  LineChart,
  AreaChart,
  Label,
} from 'recharts';

const sampleData = [
  { name: 'Page A', uv: 4000, pv: 2400, amt: 2400, time: 1 },
  { name: 'Page B', uv: 3000, pv: 1398, amt: 2210, time: 3 },
  { name: 'Page C', uv: 2000, pv: -9800, amt: 2290, time: 9 },
  { name: 'Page D', uv: 2780, pv: 3908, amt: 2000, time: 10 },
  { name: 'Page E', uv: 2500, pv: 4800, amt: 2181, time: 12 },
  { name: 'Page F', uv: 1220, pv: 3800, amt: 2500, time: 16 },
  { name: 'Page G', uv: 2300, pv: 4300, amt: 2100, time: 18 },
  { name: 'Page H', time: 24 },
];

const Card = (props) => <div className="Card" {...props}></div>;

const Sound = (props) => {
  // const Update = () => setUpdate(!update);
  // const [update, setUpdate] = useState(false);
  const [data, setData] = useState(sampleData);
  const [TICK, setTicker] = useState();

  // initialize
  useEffect(() => {}, []);

  // Generate Lines
  const keyColors = ['#119999', '#991199', '#999911', '#111199', '#119911'];
  let i = 0;
  let ITEMS1 = null;
  let ITEMS2 = null;
  ITEMS1 =
    data.length > 0
      ? RTGTools.getItems({ uv: 0, pv: 0, amt: 0 }, ['AREA'], keyColors, {
          dot: true,
          type: 'monotone',
        })
      : null;

  // console.log("LINES:", ITEMS1, ITEMS2);
  // console.log("data:", data);
  return (
    <div className="Sound">
      <Card>
        <header>DEMO</header>
      </Card>
      <Card>
        <header>WAVES</header>
        <Card style={{ display: 'flex', width: '512px', height: '256px' }}>
          <ResponsiveContainer>
            <AreaChart data={data} stackOffset="silhouette">
              <Tooltip key="Tooltip" />
              <Legend key="Legend" />
              <CartesianGrid stroke="#f5f5f5" />
              <YAxis
                domain={['auto', 'auto']} /* dataKey="date" type="monotone" */
              />
              <XAxis dataKey="time" type="number"></XAxis>
              {ITEMS1}
            </AreaChart>
          </ResponsiveContainer>
        </Card>
      </Card>
    </div>
  );
};

export { Sound };
