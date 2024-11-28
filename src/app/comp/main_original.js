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
  pageiotdata,
  pagehumidIotData,
  pageunitconsIotData,
  iotDevices,
  getDatesOfMonth,
}) => {
  const [devices, setDevices] = useState(iotDevices);
  const [device, setDevice] = useState(devices[0]);
  const [iotData, setIotData] = useState(pageiotdata);
  const [humidIotData, setHumidIotData] = useState(pagehumidIotData);
  const [unitConsumIotData, setUnitConsumIotData] =
    useState(pageunitconsIotData);
  const initialized = useRef(false);

  useEffect(() => {
    let intervalId;
    //Temperature IoT data
    const updateIotData = async () => {
      try {
        const response = await axios.post("dashboard/api/data/postdata", {
          // selectedAc: deviceLabel,
          selectedAc: device,
        });

        const humidresponse = await axios.post(
          "dashboard/api/data/humidpostdata",
          {
            selectedAc: device,
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

        console.log("5555 :: ", iotData);

        console.log("1234 ::", humidIotData);
      } catch (error) {
        console.log("config :- ", error.message);
      }
    };

    const fetchData = () => {
      if (device.length > 0) {
        updateIotData();
      }
    };

    fetchData(); // Initial call
    // Set interval to fetch data every 4 minutes
    intervalId = setInterval(fetchData, 40000);

    // return () => {
    //   clearInterval(intervalId); // Cleanup interval on component unmount
    // };
  }, [device]);

  return (
    // interval={3000}: Changes the slide every 3 seconds (adjust as needed).
    // wrap={true}: Enables looping back to the first item after the last one.
    // controls={true} and indicators={true}: Add navigation arrows and indicators for manual control.

    <>
      <section className="section-1">
        <div className="container text-center">
          <h5>{moment(new Date(firstDate)).format("MMMM YYYY")}</h5>
        </div>
        <Carousel interval={3000} wrap={true} controls={true} indicators={true}>
          <Carousel.Item>
            <div className="container text-center">
              <p>{devices[0]}</p>
            </div>
            <div className="team row">
              <div className="col-md-6 col-12 mb-4">
                <div className="card h-100">
                  <div className="card-body">
                    <h5 className="card-title">Temperature</h5>
                    <Calendar
                      firstDate={firstDate}
                      lastDate={lastDate}
                      iotData={iotData}
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
                      humidIotData={humidIotData}
                      getDatesOfMonth={getDatesOfMonth}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="team row">
              <div className="col-md-6 col-12 mb-4">
                <div className="card h-100">
                  <div className="card-body">
                    <h5 className="card-title">Unit Consumption</h5>
                    <UnitConsumptionCalendar
                      firstDate={firstDate}
                      lastDate={lastDate}
                      unitConsumIotData={unitConsumIotData}
                      getDatesOfMonth={getDatesOfMonth}
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-12 mb-4">
                <div className="card h-100">
                  <div className="card-body">
                    <h5 className="card-title">Current</h5>
                    <UnitConsumptionCalendar
                      firstDate={firstDate}
                      lastDate={lastDate}
                      unitConsumIotData={unitConsumIotData}
                      getDatesOfMonth={getDatesOfMonth}
                    />
                  </div>
                </div>
              </div>
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <div className="container text-center">
              <p>D250AC02</p>
            </div>
            <div className="team row">
              <div className="col-md-6 col-12 mb-4">
                <div className="card h-100">
                  <div className="card-body">
                    <h5 className="card-title">Temperature</h5>
                    <Calendar
                      firstDate={firstDate}
                      lastDate={lastDate}
                      iotData={iotData}
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
                      humidIotData={humidIotData}
                      getDatesOfMonth={getDatesOfMonth}
                    />
                  </div>
                </div>
              </div>
            </div>{" "}
            <div className="team row">
              <div className="col-md-6 col-12 mb-4">
                <div className="card h-100">
                  <div className="card-body">
                    <h5 className="card-title">Unit Consumption</h5>
                    <UnitConsumptionCalendar
                      firstDate={firstDate}
                      lastDate={lastDate}
                      unitConsumIotData={unitConsumIotData}
                      getDatesOfMonth={getDatesOfMonth}
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-12 mb-4">
                <div className="card h-100">
                  <div className="card-body">
                    <h5 className="card-title">Current</h5>
                    <UnitConsumptionCalendar
                      firstDate={firstDate}
                      lastDate={lastDate}
                      unitConsumIotData={unitConsumIotData}
                      getDatesOfMonth={getDatesOfMonth}
                    />
                  </div>
                </div>
              </div>
            </div>
          </Carousel.Item>
        </Carousel>

        {/* <div className="team row">
          <div className="container text-center">
            <p>{devices[0]}</p>
          </div>
          <div className="col-md-6 col-12 mb-4">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">Temperature</h5>
                <Calendar
                  firstDate={firstDate}
                  lastDate={lastDate}
                  iotData={iotData}
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
                  humidIotData={humidIotData}
                  getDatesOfMonth={getDatesOfMonth}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="team row">
          <div className="col-md-6 col-12 mb-4">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">Unit Consumption</h5>
                <UnitConsumptionCalendar
                  firstDate={firstDate}
                  lastDate={lastDate}
                  unitConsumIotData={unitConsumIotData}
                  getDatesOfMonth={getDatesOfMonth}
                />
              </div>
            </div>
          </div>
          <div className="col-md-6 col-12 mb-4">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">Current</h5>
                <UnitConsumptionCalendar
                  firstDate={firstDate}
                  lastDate={lastDate}
                  unitConsumIotData={unitConsumIotData}
                  getDatesOfMonth={getDatesOfMonth}
                />
              </div>
            </div>
          </div>
        </div> */}
      </section>
    </>
  );
};

export default Main;
