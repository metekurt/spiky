import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import monthNames from "../constants";

const LineChart = (props) => {
  const [options, setObject] = useState({
    chart: {
      height: 350,
      type: "line",
      dropShadow: {
        enabled: true,
        color: "#000",
        top: 18,
        left: 7,
        blur: 10,
        opacity: 0.2,
      },
      toolbar: {
        show: false,
      },
      events: {
        click(event, chartContext, config) {
          if (config.dataPointIndex !== -1) {
            props.selectedIndex(config.dataPointIndex);
          }
        },
      },
    },
    colors: ["#77B6EA", "#545454"],
    dataLabels: {
      enabled: true,
      offsetY: -4,
      background: {
        enabled: false,
      },
    },
    stroke: {
      curve: "smooth",
    },
    title: {
      text: `Average High & Low Temperature for ${props.city}`,
      align: "center",
    },
    grid: {
      borderColor: "#e7e7e7",
      row: {
        colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
        opacity: 0.5,
      },
    },
    markers: {
      size: 1,
    },
    xaxis: {
      categories: props.data.map((date) => {
        return (
          date["datetime"].split("-")[2] +
          " " +
          monthNames[parseInt(date["datetime"].split("-")[1], 10) - 1]
        );
      }),
    },
    yaxis: {
      title: {
        text: "Temperature",
      },
      min: -10,
      max: 40,
    },
    legend: {
      position: "top",
      horizontalAlign: "right",
      floating: true,
      offsetY: -25,
      offsetX: -5,
    },
  });

  const [series, setSeries] = useState([
    {
      name: "High",
      data: [],
    },
    {
      name: "Low",
      data: [],
    },
  ]);

  useEffect(() => {
    setSeries([
      {
        data: props.data.map((day) => day["max_temp"]),
      },
      {
        data: props.data.map((day) => day["min_temp"]),
      },
    ]);
    setObject({
      title: {
        text: `Average High & Low Temperature for ${props.city}`,
        align: "center",
      },
    });
  }, [props]);

  return (
    <div>
      <Chart
        options={options}
        series={series}
        type="line"
        width={620}
        height={320}
      />
    </div>
  );
};

export default LineChart;
