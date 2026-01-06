"use client";
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import TemperatureCalendar from "./temperatureCalendar";
import HumidCalendar from "./humidcalendar";
import UnitConsumptionCalendar from "./unitconsumptioncalendar";
import moment from "moment";
import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";
import { poppins } from "../styles/fonts"; // Adjust path based on location
import { getAcData } from "@/lib/getAcData";

const Main = ({
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
  // const [currentMonth, setCurrentMonth] = useState('');
  const [activeIndex, setActiveIndex] = useState(0); // 0 for D250AC01, 1 for D250AC02 and so on....

  // useEffect(() => {
  //   setCurrentMonth(moment().format("MMMM YYYY"));
  // }, []);

  useEffect(() => {
    const updateIotData = async () => {
      try {
        // const response = await axios.post("dashboard/api/data/postdata", {
        //   selectedAc: iotDevices[activeIndex],
        // });

        const response = await getAcData(iotDevices[activeIndex]);
        
        if (response) {
          setunitConsumptionIotData(response.unitConsumptionData.map((item, index) => ({
            date: item._id,
            unitConsumption: item.unitConsumption,
          })) || []);

          setHumidIotData(response.humidityData.map((item, index) => ({
            date: item._id,
            humidity: item.humidity,
          })) || []);

          setIotData(response.tempData.map((item, index) => ({
            date: item._id,
            temp: item.temperature,
          })) || []);
        }

      } catch (error) {
        console.log("config :- ", error.message);
      }
    };

    updateIotData();
  }, [activeIndex]);

  useEffect(() => {
    const today = moment().format("YYYY-MM-DD");

    const todayEntry = iotData.find(entry => entry.date === today && entry.temp > 26);

    console.log('todayEntry :: ', todayEntry);
  }, [iotData]);

  return (
    <section>
      <div className="parent-container">
        {/* <span className={`month-display font-bold ${poppins.className}`}>{currentMonth}</span> */}
        <span className={`month-display font-bold ${poppins.className}`}>{moment().format("MMMM YYYY")}</span>
      </div>


      <Carousel
        interval={10000}
        wrap={true}
        controls={false}
        indicators={false}
        pause={false}
        onSlide={(newIndex) => setActiveIndex(newIndex)}
        slide={true}
        fade={false}
      >
        {iotDevices.map((device, index) => (
          <Carousel.Item key={index}>
            <div className="page-wrapper text-center">
              <p className="iot-device">{device}</p>

              <div className="sectiondiv">
                <div className="row justify-content-center ml-10 mr-10">
                  <div className="col-lg-6 col-md-6 col-12 mb-2">
                    <div className="card shadow-md rounded-lg">
                      <div className="calendar-header"><span className={poppins.className} >Unit Consumption (kWh)</span></div>
                      <UnitConsumptionCalendar
                        key={activeIndex}
                        unitConsumIotData={unitConsumptionIotData}
                        getDatesOfMonth={getDatesOfMonth}
                        selectedDevice={device}
                      />
                    </div>
                  </div>

                  <div className="col-lg-6 col-md-6 col-12 mb-2">
                    <div className="card shadow-md rounded-lg">
                      <div className="calendar-header"><span className={poppins.className} >Temperature (&deg;C)</span></div>
                      <TemperatureCalendar
                        key={activeIndex}
                        iotData={iotData}
                        getDatesOfMonth={getDatesOfMonth}
                        selectedDevice={device}
                      />
                    </div>
                  </div>

                  <div className="col-lg-6 col-md-6 col-12 mb-2">
                    <div className="card shadow-md rounded-lg">
                      <div className="calendar-header"><span className={poppins.className} >Humidity (%)</span></div>
                      <HumidCalendar
                        key={activeIndex}
                        humidIotData={humidIotData}
                        getDatesOfMonth={getDatesOfMonth}
                        selectedDevice={device}
                      />
                    </div>
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
