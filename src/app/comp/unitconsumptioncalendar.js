"use client";
import React, { useEffect, useState, useRef } from "react";
import { unstable_noStore as noStore } from "next/cache";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";

const Calendarmain = ({
  firstDate,
  lastDate,
  unitConsumIotData,
  getDatesOfMonth,
}) => {
  noStore();

  const heatmapRef = useRef(null);

  useEffect(() => {
    const svg = heatmapRef.current.querySelector("svg");
    if (svg) {
      // svg.setAttribute("viewBox", "0 10 800 200"); // Adjust the viewBox as needed
      // svg.setAttribute("viewBox", "-25 10 170 65"); // Adjust the viewBox as needed
      svg.setAttribute("viewBox", "-5 11 150 53"); // Adjust the viewBox as needed
      svg.setAttribute("preserveAspectRatio", "xMinYMin meet"); // Optional: control aspect ratio
    }
  }, []);

  function shiftDate(date, numDays) {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + numDays);
    return newDate;
  }

  const currentUnitConsumIotData = getDatesOfMonth.map((obj1) => {
    // fetch data only if iotdata is of current month
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
          unitConsumption: parseFloat(foundObj.unitConsumption),
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

  if (currentUnitConsumIotData.length > 0) {
    return (
      <div
        ref={heatmapRef}
        style={{ display: "flex", justifyContent: "center" }}
      >
        <CalendarHeatmap
          // key={1}
          style={{ paddingTop: 20 }}
          startDate={shiftDate(firstDate, -1)}
          endDate={lastDate}
          values={currentUnitConsumIotData}
          classForValue={(value) => {
            if (value != null) {
              if (value.unitConsumption === "") {
                return "color-empty";
              } else if (value.unitConsumption > 26) {
                return "color-high";
              } else {
                return "color-medium";
              }
            }
          }}
          horizontal={false}
          showWeekdayLabels={true}
          showMonthLabels={false}
          showOutOfRangeDays={false}
          gutterSize={1}
          transformDayElement={(element, value, index) => (
            <g key={index}>
              <text
                x={element["props"].x + parseFloat(element["props"].width) / 3}
                y={
                  element["props"].y +
                  parseFloat(element["props"].height) / -7.5
                }
                style={{
                  fontSize: "0.14em",
                  fill:
                    new Date(value.date).setHours(0, 0, 0, 0) ===
                    new Date().setHours(0, 0, 0, 0)
                      ? "#046307"
                      : "#000000",
                  textAnchor: "middle",
                  dominantBaseline: "middle",
                  alignmentBaseline: "middle",
                  fontWeight:
                    new Date(value.date).setHours(0, 0, 0, 0) ===
                    new Date().setHours(0, 0, 0, 0)
                      ? "bold"
                      : "normal",
                }}
              >
                {new Date(value.date).getDate()}
              </text>
              {React.cloneElement(element, {
                width: "8%",
                height: 5,
                rx: 3,
                ry: 3,
              })}
              <text
                x={element["props"].x + 4}
                y={element["props"].y + 3}
                style={{
                  cursor: "default",
                  fontSize: "0.12em",
                  fill:
                    new Date(value.date).setHours(0, 0, 0, 0) ===
                    new Date().setHours(0, 0, 0, 0)
                      ? "#04630"
                      : "#FFFF",
                  textAnchor: "middle",
                  dominantBaseline: "middle",
                  alignmentBaseline: "middle",
                  fontWeight: "bold",
                  // new Date(value.date).setHours(0, 0, 0, 0) ===
                  // new Date().setHours(0, 0, 0, 0)
                  //   ? "bold"
                  //   : "normal",
                }}
                onClick={() => {
                  // if (value.temp !== "") {
                  //   this.props.barChartCalendarData(value.date);
                  // } else {
                  //   this.props.barChartCalendarData(0);
                  // }
                }}
              >
                {value.unitConsumption}
              </text>
            </g>
          )}
        />
      </div>
    );
  }
};

export default Calendarmain;
