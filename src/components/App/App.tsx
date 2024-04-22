// import React, { useState, useEffect } from "react";
// import axios from "axios";

// interface IItem {
//   CTR: number;
//   EvPM: number;
//   click_count: number;
//   event_count: number;
//   impressions: number;
//   mm_dma: number;
//   site_id: string;
// }

// const App = () => {
//   const [data, setData] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // useEffect(() => {
//   //   fetchData();
//   // }, []);

//   const fetchData = async (eventType: any) => {
//     setIsLoading(true);
//     setError(null);
//     try {
//       const response = await axios.get(
//         `/api/aggregated_data?event_type=${eventType}`
//       );
//       setData(response.data);
//     } catch (error: any) {
//       setError(error);
//     }
//     setIsLoading(false);
//   };

//   if (isLoading) return <div>Loading...</div>;
//   // if (error) return <div>Error: {error.message}</div>;

//   return (
//     <div>
//       <h1>Aggregated Data</h1>
//       <select onChange={(e: any) => fetchData(e.target.value)}>
//         <option value="all">All</option>
//         <option value="click">Click</option>
//         <option value="view">View</option>
//       </select>
//       <table>
//         <thead>
//           <tr>
//             <th>mm_dma</th>
//             <th>site_id</th>
//             <th>impressions</th>
//             <th>CTR</th>
//             <th>EvPM</th>
//           </tr>
//         </thead>
//         <tbody>
//           {data.map((item: IItem, index: number) => (
//             <tr key={index}>
//               <td>{item.mm_dma}</td>
//               <td>{item.site_id}</td>
//               <td>{item.impressions}</td>
//               <td>{item.CTR}</td>
//               <td>{item.EvPM}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default App;

// App.tsx
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Chart from "./Chart";
// import Table from "./Table";

// const App: React.FC = () => {
//   const [data, setData] = useState<any[]>([]);
//   const [isLoading, setIsLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);
//   const [eventType, setEventType] = useState<string>("all");

//   useEffect(() => {
//     fetchData();
//   }, [eventType]);

//   const fetchData = async () => {
//     setIsLoading(true);
//     setError(null);
//     try {
//       const response = await axios.get(
//         `http://127.0.0.1:5000/api/aggregated_data?event_type=${eventType}`
//       );
//       setData(response.data);
//     } catch (error: any) {
//       setError(error.message);
//     }
//     setIsLoading(false);
//   };

//   if (isLoading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;

//   return (
//     <div>
//       <h1>Aggregated Data</h1>
//       <select value={eventType} onChange={(e) => setEventType(e.target.value)}>
//         <option value="all">All</option>
//         <option value="click">Click</option>
//         <option value="view">View</option>
//       </select>
//       <Chart data={data} />
//       <Table data={data} />
//     </div>
//   );
// };

// export default App;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   BarChart,
//   Bar,
// } from "recharts";

// const BackendUrl = "http://127.0.0.1:5000";

// const App = () => {
//   const [ctrData, setCtrData] = useState([]);
//   const [evpmData, setEvpmData] = useState([]);
//   const [aggregationData, setAggregationData] = useState([]);
//   const [selectedField, setSelectedField] = useState("");

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       const ctrResponse = await axios.get(
//         `${BackendUrl}/api/graphs?event_type=click`
//       );
//       setCtrData(ctrResponse.data);

//       const evpmResponse = await axios.get(
//         `${BackendUrl}/api/graphs?event_type=view`
//       );
//       setEvpmData(evpmResponse.data);

//       const aggregationResponse = await axios.get(
//         `${BackendUrl}/api/aggregations?field=mm_dma`
//       );
//       setAggregationData(aggregationResponse.data);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   const handleSelectChange = async (e: any) => {
//     const selectedValue = e.target.value;
//     setSelectedField(selectedValue);
//     try {
//       const aggregationResponse = await axios.get(
//         `${BackendUrl}/api/aggregations?field=${selectedValue}`
//       );
//       setAggregationData(aggregationResponse.data);
//     } catch (error) {
//       console.error("Error fetching aggregation data:", error);
//     }
//   };

//   return (
//     <div>
//       <h1>CTR and EvPM Data</h1>
//       <div>
//         <h2>CTR Data</h2>
//         <LineChart width={800} height={400} data={ctrData}>
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis dataKey="reg_time" />
//           <YAxis />
//           <Tooltip />
//           <Legend />
//           <Line type="monotone" dataKey="CTR" stroke="#8884d8" />
//         </LineChart>
//       </div>
//       <div>
//         <h2>EvPM Data</h2>
//         <LineChart width={800} height={400} data={evpmData}>
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis dataKey="reg_time" />
//           <YAxis />
//           <Tooltip />
//           <Legend />
//           <Line type="monotone" dataKey="EvPM" stroke="#82ca9d" />
//         </LineChart>
//       </div>
//       <div>
//         <h2>Aggregation Data</h2>
//         <select onChange={handleSelectChange} value={selectedField}>
//           <option value="mm_dma">mm_dma</option>
//           <option value="site_id">site_id</option>
//         </select>
//         <BarChart width={800} height={400} data={aggregationData}>
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis dataKey={selectedField} />
//           <YAxis />
//           <Tooltip />
//           <Legend />
//           <Bar dataKey="impression_count" fill="#8884d8" />
//         </BarChart>
//       </div>
//     </div>
//   );
// };

// export default App;

import Chart from "components/Chart/Chart";
import Header from "components/Header/Header";
import styles from "./App.module.scss";
import Table from "components/Table/Table";

const App = () => {
  return (
    <div className={styles.App}>
      <Header />
      <Chart />
      <Table />
    </div>
  );
};

export default App;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   BarChart,
//   Bar,
// } from "recharts";
// import { useDispatch, useSelector } from "react-redux";
// import { getGraphDataAction } from "store/actions";
// import { RootState } from "store";
// import Header from "components/Header/Header";

// const App = () => {
//   // const [ctrData, setCtrData] = useState([]);

//   const dispatch = useDispatch();

//   const { graphData } = useSelector((state: RootState) => state.graph);

//   useEffect(() => {
//     dispatch(getGraphDataAction({ eventType: "click" }));
//   }, []);

//   const labels = Object.keys(graphData);
//   const ctrs = labels.map((lab) => {
//     return { ctr: graphData[lab].rate, date: lab };
//   });

//   return (
//     <div>
//       <Header />
//       <div>
//         <h2>CTR Data</h2>
//         <LineChart width={1400} height={700} data={ctrs}>
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis dataKey={"date"} />
//           <YAxis />
//           <Tooltip />
//           <Legend />
//           <Line type="monotone" dataKey="ctr" stroke="#8884d8" />
//         </LineChart>
//       </div>
//     </div>
//   );
// };

// export default App;
