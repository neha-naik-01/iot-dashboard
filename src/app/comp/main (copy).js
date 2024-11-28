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
  const [iotDataD250AC01, setIotDataD250AC01] = useState(pageiotdata);
  const [humidIotDataD250AC01, setHumidIotDataD250AC01] =
    useState(pagehumidIotData);
  const [iotDataD250AC02, setIotDataD250AC02] = useState(null);
  const [humidIotDataD250AC02, setHumidIotDataD250AC02] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0); // 0 for D250AC01, 1 for D250AC02

  useEffect(() => {
    let intervalId;
    //Temperature IoT data
    const updateIotData = async () => {
      // console.log("test", activeIndex);

      try {
        if (activeIndex === 0) {
          const response = await axios.post("dashboard/api/data/postdata", {
            // selectedAc: deviceLabel,
            selectedAc: iotDevices[0],
          });

          const humidresponse = await axios.post(
            "dashboard/api/data/humidpostdata",
            {
              selectedAc: iotDevices[1],
            }
          );

          setIotDataD250AC01(
            response.data.response.map((item, index) => ({
              date: item._id,
              temp: item.temperature,
            }))
          );

          setHumidIotDataD250AC01(
            humidresponse.data.response.map((item, index) => ({
              date: item._id,
              humidity: item.humidity,
            }))
          );
        } else if (activeIndex === 1) {
        }
      } catch (error) {
        console.log("config :- ", error.message);
      }
    };

    const fetchData = () => {
      updateIotData();
    };
  }, [activeIndex]);

  return (
    // interval={3000}: Changes the slide every 3 seconds (adjust as needed).
    // wrap={true}: Enables looping back to the first item after the last one.
    // controls={true} and indicators={true}: Add navigation arrows and indicators for manual control.
    <section className="section-1">
      <div className="container text-center">
        <h5>{moment(new Date(firstDate)).format("MMMM YYYY")}</h5>
      </div>

      {/* {iotDevices.map((device, index) => (
        <li key={index}>{device}</li>
      ))} */}

      <Carousel
        interval={3000}
        wrap={true}
        controls={true}
        indicators={true}
        onSlide={(newIndex) => setActiveIndex(newIndex)}
      >
        {/* Carousel Item for Device D250AC01 */}
        <Carousel.Item>
          {iotDevices.map((device, index) => (
            <li key={index}>{device}</li>
          ))}

          <div className="container text-center">
            <p>{iotDevices[0]}</p>
          </div>
          {/* row -1 */}
          <div className="team row">
            <div className="col-md-6 col-12 mb-4">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">Temperature</h5>
                  <Calendar
                    firstDate={firstDate}
                    lastDate={lastDate}
                    iotData={iotDataD250AC01}
                    getDatesOfMonth={getDatesOfMonth}
                  />
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12 mb-4">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">Humidity</h5>
                  <HumidCalendar
                    firstDate={firstDate}
                    lastDate={lastDate}
                    humidIotData={humidIotDataD250AC01}
                    getDatesOfMonth={getDatesOfMonth}
                  />
                </div>
              </div>
            </div>
          </div>
          {/* row -2 */}
          <div className="team row">
            <div className="col-md-6 col-12 mb-4">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">Unit COnsumption</h5>
                  <Calendar
                    firstDate={firstDate}
                    lastDate={lastDate}
                    iotData={iotDataD250AC01}
                    getDatesOfMonth={getDatesOfMonth}
                  />
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12 mb-4">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">Current</h5>
                  <HumidCalendar
                    firstDate={firstDate}
                    lastDate={lastDate}
                    humidIotData={humidIotDataD250AC01}
                    getDatesOfMonth={getDatesOfMonth}
                  />
                </div>
              </div>
            </div>
          </div>
        </Carousel.Item>

        {/* Carousel Item for Device D250AC02 */}
        <Carousel.Item>
          <div className="container text-center">
            <p>{iotDevices[1]}</p>
          </div>
          <div className="team row">
            <div className="col-md-6 col-12 mb-4">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">Temperature</h5>
                  <Calendar
                    firstDate={firstDate}
                    lastDate={lastDate}
                    iotData={iotDataD250AC01}
                    getDatesOfMonth={getDatesOfMonth}
                  />
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12 mb-4">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">Humidity</h5>
                  <HumidCalendar
                    firstDate={firstDate}
                    lastDate={lastDate}
                    humidIotData={humidIotDataD250AC01}
                    getDatesOfMonth={getDatesOfMonth}
                  />
                </div>
              </div>
            </div>
          </div>
        </Carousel.Item>
      </Carousel>
    </section>
  );
};

export default Main;
