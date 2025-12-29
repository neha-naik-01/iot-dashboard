"use client";
import React, { useEffect, useState, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

const UnitConsumptionCalendar = ({ unitConsumIotData, getDatesOfMonth, selectedDevice }) => {
  const calendarRef = useRef(null);
  const calendarContainerRef = useRef(null);
  const [calendarRows, setCalendarRows] = useState(5); // Default to 5 rows

  // useEffect(() => {
  //   // Detect the number of rows in the FullCalendar
  //   setTimeout(() => {
  //     const rowCount = document.querySelectorAll(".fc-daygrid-body tr").length;
  //     setCalendarRows(rowCount); // Update state based on detected rows

  //     const calendarContainer = document.querySelector(".full-calendar-container");
  //     if (calendarContainer) {
  //       if (rowCount === 6) {
  //         calendarContainer.classList.add("six-rows");
  //         calendarContainer.classList.remove("five-rows");
  //       } else {
  //         calendarContainer.classList.add("five-rows");
  //         calendarContainer.classList.remove("six-rows");
  //       }
  //     }
  //   }, 100);
  // }, []);

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
      calendarRef.current.getApi().refetchEvents();
    }
  }, [selectedDevice]); // Runs whenever the selected device changes

  const currentUnitConsumIotData = getDatesOfMonth.map((obj1) => {
    if (
      new Date(getDatesOfMonth[0].date).getFullYear() ===
      new Date(unitConsumIotData[0].date).getFullYear() &&
      new Date(getDatesOfMonth[0].date).getMonth() + 1 ===
      new Date(unitConsumIotData[0].date).getMonth() + 1
    ) {
      const foundObj = unitConsumIotData.find(
        (obj2) =>
          new Date(obj1.date).getDate() === new Date(obj2.date).getDate()
      );

      if (foundObj) {
        // Objects with matching IDs found
        return {
          date: foundObj.date,
          unitConsumption: parseFloat(foundObj.unitConsumption) === 0 ? "" : parseFloat(foundObj.unitConsumption),
        };
      } else {
        // Objects with no match found
        return {
          date: obj1.date,
          unitConsumption: "",
        };
      }
      // if unitConsumIotData is is not of current month show empty calendar with no data
    } else {
      return {
        date: obj1.date,
        unitConsumption: "",
      };
    }
  });

  const unitConsumption = currentUnitConsumIotData.map(v => ({
    date: v.date,
    unitConsumption: v.unitConsumption,
    color: v.unitConsumption === "" ? "#eeeeee" : v.unitConsumption > 26 ? "#ffa07a" : "#FCE883", // Adjust colors as needed
  }));

  if (currentUnitConsumIotData.length > 0) {
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div ref={calendarContainerRef} className="full-calendar-container">
          <FullCalendar
            key={selectedDevice} // Force re-render when device changes
            ref={calendarRef}
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            events={unitConsumption.map((item) => ({
              title: item.unitConsumption.toString(),
              start: item.date,
              backgroundColor: item.color, // Customize based on data
            }))}
            dayHeaderContent={(arg) => arg.text.toUpperCase()} // Weekday labels
          />
        </div>
      </div>
    );
  }
};

export default UnitConsumptionCalendar;

