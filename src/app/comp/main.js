"use client";
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Calendar from "./calendar";
import HumidCalendar from "./humidcalendar";
import UnitConsumptionCalendar from "./unitconsumptioncalendar";
import moment from "moment";
import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";

const Main = ({
  firstDate,
  lastDate,
  deviceList,
  pageiotdata,
  pagehumidIotData,
  pageunitconsIotData,
  iotDevices,
  getDatesOfMonth,
}) => {
  const [iotData, setIotData] = useState(pageiotdata);
  const [humidIotData, setHumidIotData] = useState(pagehumidIotData);
  const [unitConsumptionIotData, setunitConsumptionIotData] =
    useState(pageunitconsIotData);
  const [activeIndex, setActiveIndex] = useState(0); // 0 for D250AC01, 1 for D250AC02 and so on....

  useEffect(() => {
    let intervalId;
    //pull data for each device from api
    const updateIotData = async () => {
      try {
        const response = await axios.post("dashboard/api/data/postdata", {
          // selectedAc: deviceLabel,
          selectedAc: iotDevices[activeIndex],
        });

        const humidresponse = await axios.post(
          "dashboard/api/data/humidpostdata",
          {
            selectedAc: iotDevices[activeIndex],
          }
        );

        const unitConsumptionresponse = await axios.post(
          "dashboard/api/data/unitconsumptionpostdata",
          {
            selectedAc: iotDevices[activeIndex],
          }
        );

        setIotData(
          response.data.response.map((item, index) => ({
            date: item._id,
            temp: item.temperature,
          }))
        );

        setHumidIotData(
          humidresponse.data.response.map((item, index) => ({
            date: item._id,
            humidity: item.humidity,
          }))
        );

        setunitConsumptionIotData(
          unitConsumptionresponse.data.response.map((item, index) => ({
            date: item._id,
            unitConsumption: item.unitConsumption,
          }))
        );
      } catch (error) {
        console.log("config :- ", error.message);
      }
    };

    updateIotData();
  }, [activeIndex, iotDevices]);

  // interval={3000}: Changes the slide every 3 seconds (adjust as needed).
  // wrap={true}: Enables looping back to the first item after the last one.
  // controls={true} and indicators={true}: Add navigation arrows and indicators for manual control.
  // onSlide={(newIndex) => setActiveIndex(newIndex)}
  // pause={false}  // Prevents the carousel from pausing on hover

  return (
    <section className="section-1">
      <div className="container text-center">
        <span>{moment(new Date(firstDate)).format("MMMM YYYY")}</span>
      </div>

      <Carousel
        interval={3000}
        wrap={true}
        controls={true}
        indicators={true}
        pause={false}
        onSlide={(newIndex) => setActiveIndex(newIndex)}
      >
        {iotDevices.map((device, index) => (
          <Carousel.Item key={index}>
            <div className="container text-center">
              <p>{device}</p>
            </div>
            {/* row - index */}
            <div className="team row">
              <div className="col-md-6 col-12 mb-4">
                <div className="card">
                  <div className="card-body">
                    <span className="card-title">Unit Consumption</span>
                    <UnitConsumptionCalendar
                      firstDate={firstDate}
                      lastDate={lastDate}
                      unitConsumIotData={unitConsumptionIotData}
                      getDatesOfMonth={getDatesOfMonth}
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-12 mb-4">
                <div className="card">
                  <div className="card-body">
                    <span className="card-title">Temperature</span>
                    <Calendar
                      firstDate={firstDate}
                      lastDate={lastDate}
                      // iotData={iotData[device]}
                      iotData={iotData}
                      getDatesOfMonth={getDatesOfMonth}
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-12 mb-4">
                <div className="card">
                  <div className="card-body">
                    <span className="card-title">Humidity</span>
                    <HumidCalendar
                      firstDate={firstDate}
                      lastDate={lastDate}
                      // humidIotData={humidIotData[device]}
                      humidIotData={humidIotData}
                      getDatesOfMonth={getDatesOfMonth}
                    />
                  </div>
                </div>
              </div>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </section>
  );
};

export default Main;
