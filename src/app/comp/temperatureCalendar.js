"use client";
import React, { useEffect, useState, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

const TemperatureCalendar = ({ iotData, getDatesOfMonth, selectedDevice }) => {
  const calendarRef = useRef(null);
  const calendarContainerRef = useRef(null);
  const [calendarRows, setCalendarRows] = useState(5); // Default to 5 rows

  useEffect(() => {
    if (calendarContainerRef.current) {
      const rowCount = calendarContainerRef.current.querySelectorAll(".fc-daygrid-body tr").length;
  
      if (rowCount === 6) {
        calendarContainerRef.current.classList.add("six-rows");
        calendarContainerRef.current.classList.remove("five-rows");
      } else {
        calendarContainerRef.current.classList.add("five-rows");
        calendarContainerRef.current.classList.remove("six-rows");
      }
    }
  }, []);  

  useEffect(() => {
    if (calendarRef.current) {
      // Ensure FullCalendar API is available before calling refetchEvents
      const calendarApi = calendarRef.current.getApi();
      if (calendarApi) {
        calendarApi.refetchEvents(); // Refresh events when selectedDevice changes
      }
    }
  }, [selectedDevice]); // Runs whenever the selected device changes

  const currentIotData = getDatesOfMonth.map((obj1) => {
    if (
      new Date(getDatesOfMonth[0].date).getFullYear() ===
      new Date(iotData[0].date).getFullYear() &&
      new Date(getDatesOfMonth[0].date).getMonth() + 1 ===
      new Date(iotData[0].date).getMonth() + 1
    ) {
      const foundObj = iotData.find(
        (obj2) => new Date(obj1.date).getDate() === new Date(obj2.date).getDate()
      );

      if (foundObj) {
        return {
          date: foundObj.date,
          temp: parseFloat(foundObj.temp) === 0 ? "" : parseFloat(foundObj.temp),
        };
      } else {
        return {
          date: obj1.date,
          temp: "",
        };
      }
    } else {
      return {
        date: obj1.date,
        temp: "",
      };
    }
  });

  const temperature = currentIotData.map((v) => ({
    date: v.date,
    temp: v.temp,
    color: v.temp === "" ? "#eeeeee" : v.temp > 26 ? "#ffa07a" : "#FCE883", // Adjust colors as needed
  }));

  return (
    currentIotData.length > 0 && (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div ref={calendarContainerRef} className="full-calendar-container">
          <FullCalendar
            key={selectedDevice} // Force re-render when device changes
            ref={calendarRef}
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            events={temperature.map((item) => ({
              title: item.temp.toString(),
              start: item.date,
              backgroundColor: item.color, // Customize based on data
            }))}
            dayHeaderContent={(arg) => arg.text.toUpperCase()} // Weekday labels
          />
        </div>
      </div>
    )
  );
};

export default TemperatureCalendar;
