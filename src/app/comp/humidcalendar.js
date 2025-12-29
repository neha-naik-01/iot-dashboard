// "use client";
// import React, { useEffect, useState, useRef } from "react";
// import FullCalendar from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid";

// const HumidCalendar = ({ humidIotData, getDatesOfMonth, selectedDevice }) => {
//   const calendarRef = useRef(null);
//   const [calendarRows, setCalendarRows] = useState(5); // Default to 5 rows

//   useEffect(() => {
//     // Detect the number of rows in the FullCalendar
//     setTimeout(() => {
//       const rowCount = document.querySelectorAll(".fc-daygrid-body tr").length;
//       setCalendarRows(rowCount); // Update state based on detected rows

//       const calendarContainer = document.querySelector(".full-calendar-container");
//       if (calendarContainer) {
//         if (rowCount === 6) {
//           calendarContainer.classList.add("six-rows");
//           calendarContainer.classList.remove("five-rows");
//         } else {
//           calendarContainer.classList.add("five-rows");
//           calendarContainer.classList.remove("six-rows");
//         }
//       }
//     }, 100);
//   }, []);

//   useEffect(() => {
//     if (calendarRef.current) {
//       calendarRef.current.getApi().refetchEvents();
//     }
//   }, [selectedDevice]); // Runs whenever the selected device changes

//   const currentHumidIotData = getDatesOfMonth.map((obj1) => {
//     // fetch data only if iotdata is of current month
//     if (
//       new Date(getDatesOfMonth[0].date).getFullYear() ===
//       new Date(humidIotData[0].date).getFullYear() &&
//       new Date(getDatesOfMonth[0].date).getMonth() + 1 ===
//       new Date(humidIotData[0].date).getMonth() + 1
//     ) {
//       const foundObj = humidIotData.find(
//         (obj2) =>
//           new Date(obj1.date).getDate() === new Date(obj2.date).getDate()
//       );

//       if (foundObj) {
//         // Objects with matching IDs found
//         return {
//           date: foundObj.date,
//           humidity: parseFloat(foundObj.humidity),
//         };
//       } else {
//         // Objects with no match found
//         return {
//           date: obj1.date,
//           humidity: "",
//         };
//       }
//       // if humidIotData is is not of current month show empty calendar with no data
//     } else {
//       return {
//         date: obj1.date,
//         humidity: "",
//       };
//     }
//   });

//   const getHumidityClass = (humidity) => {
//     if (humidity === "") return "#eeeeee"; // Light gray for empty
//     if (humidity <= 30) return "#add8e6"; // Light blue
//     if (humidity <= 60) return "#5cacee"; // Medium blue
//     return "#1e3a8a"; // Dark blue
//   };

//   const humidity = currentHumidIotData.map(v => ({
//     date: v.date,
//     humidity: v.humidity,
//     color: getHumidityClass(v.humidity) // Call function with humidity value
//   }));

//   if (currentHumidIotData.length > 0) {
//     return (
//       <div
//         style={{ display: "flex", justifyContent: "center" }}
//       >
//         <div ref={calendarRef} className="full-calendar-container">
//           <FullCalendar
//             ref={calendarRef}
//             plugins={[dayGridPlugin]}
//             initialView="dayGridMonth"
//             events={humidity.map((item) => ({
//               title: item.humidity.toString(),
//               start: item.date,
//               backgroundColor: item.color, // Customize based on data
//             }))}
//             dayHeaderContent={(arg) => arg.text.toUpperCase()} // Weekday labels
//           />
//         </div>
//       </div>
//     );
//   }
// };

// export default HumidCalendar;

"use client";
import React, { useEffect, useState, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

const HumidCalendar = ({ humidIotData, getDatesOfMonth, selectedDevice }) => {
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
      // Ensure FullCalendar API is available before calling refetchEvents
      const calendarApi = calendarRef.current.getApi();
      if (calendarApi) {
        calendarApi.refetchEvents(); // Refresh events when selectedDevice changes
      }
    }
  }, [selectedDevice]); // Runs whenever the selected device changes

  const currentHumidIotData = getDatesOfMonth.map((obj1) => {
    if (
      new Date(getDatesOfMonth[0].date).getFullYear() ===
      new Date(humidIotData[0].date).getFullYear() &&
      new Date(getDatesOfMonth[0].date).getMonth() + 1 ===
      new Date(humidIotData[0].date).getMonth() + 1
    ) {
      const foundObj = humidIotData.find(
        (obj2) => new Date(obj1.date).getDate() === new Date(obj2.date).getDate()
      );

      if (foundObj) {
        return {
          date: foundObj.date,
          humidity: parseFloat(foundObj.humidity) === 0 ? "" : parseFloat(foundObj.humidity),
        };
      } else {
        return {
          date: obj1.date,
          humidity: "",
        };
      }
    } else {
      return {
        date: obj1.date,
        humidity: "",
      };
    }
  });

  const getHumidityClass = (humidity) => {
    if (humidity === "") return "#eeeeee"; // Light gray for empty
    if (humidity <= 30) return "#add8e6"; // Light blue
    if (humidity <= 60) return "#5cacee"; // Medium blue
    return "#1e3a8a"; // Dark blue
  };

  const humidity = currentHumidIotData.map(v => ({
    date: v.date,
    humidity: v.humidity,
    color: getHumidityClass(v.humidity) // Call function with humidity value
  }));

  // console.log('humidity :: ', humidity);
  
  return (
    currentHumidIotData.length > 0 && (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div ref={calendarContainerRef} className="full-calendar-container">
          <FullCalendar
            key={selectedDevice} // Force re-render when device changes
            ref={calendarRef}
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            events={humidity.map((item) => ({
              title: item.humidity.toString(),
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

export default HumidCalendar;
