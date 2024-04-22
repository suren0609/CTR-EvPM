import React, { useEffect, useRef, useState } from "react";
import styles from "./Chart.module.scss";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { getGraphDataAction } from "store/actions";
import { useDispatch, useSelector } from "react-redux";
import { graphSelector } from "store/selectors";
import { setEventType } from "store/slices/graphSlice";
import CustomSelect from "components/CustomSelect/CustomSelect";
import { MutatingDots } from "react-loader-spinner";

const Chart = () => {
  const dispatch = useDispatch();

  const { graphData, eventType, graphLoading } = useSelector(graphSelector);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (!isFirstRender.current) {
      dispatch(getGraphDataAction({ eventType: eventType }));
    } else {
      isFirstRender.current = false;
    }
  }, [eventType]);

  console.log(graphData);

  const clickFuncForSelect = (e: any) => {
    if (e.target.getAttribute("data-name") === "Click-Through") {
      dispatch(setEventType("click"));
    } else if (e.target.getAttribute("data-name") === "View") {
      dispatch(setEventType("view"));
    } else {
      return;
    }
  };

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  const options = {
    responsive: true,
    axisY: {
      suffix: "%",
    },
    scales: {
      y: {},
      x: {},
    },
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "CTR/EvPM",
      },
    },
  };

  const labels = Object.keys(graphData);
  const rates = labels.map((lab) => graphData[lab].rate);

  const dataCtr = {
    labels,
    datasets: [
      {
        label: eventType === "click" ? "CTR" : "EVPM",
        data: rates,
        borderColor: "#0ef",
        backgroundColor: "rgba(0, 238, 255, 0.713)",
        className: styles.first_line,
      },
    ],
  };
  return (
    <section className={styles.Chart} id="graph">
      <div className={styles.graphBody}>
        <CustomSelect
          defaultText={"Click-Through"}
          optionsList={["Click-Through", "View"]}
          clickFunctionality={clickFuncForSelect}
        />
        {graphLoading && (
          <MutatingDots
            visible={true}
            height="100"
            width="100"
            color="#0ef"
            secondaryColor="#0ef"
            radius="12.5"
            ariaLabel="mutating-dots-loading"
            wrapperStyle={{}}
            wrapperClass={styles.loadingWrapper}
          />
        )}
        <Line options={options} data={dataCtr} />
      </div>
    </section>
  );
};

export default Chart;
