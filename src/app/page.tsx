"use server";
import { unstable_noStore as noStore } from "next/cache";
import { promises as fs } from "fs";
import Main from "../app/comp/main";
import Mainoriginal from "../app/comp/main_original";
import moment from "moment";
import "bootstrap/dist/css/bootstrap.min.css";
// import '../styles/globals.css';

export default async function IotDashboard() {
  noStore();

  //First day date of current month
  var firstDate = new Date(new Date().getFullYear(), new Date().getMonth(), 1);

  //Last day date of current month
  var lastDate = new Date(
    new Date().getFullYear(),
    new Date().getMonth() + 1,
    0
  );

  // get ac list to diplsay
  const file = await fs.readFile(
    process.cwd() + process.env.FILE_PATH + "/deviceIds.json",
    "utf8"
  );
  const data = JSON.parse(file).map((item: any, index: any) => ({
    value: index + 1,
    label: item,
  }));

  // get TEMP_IOTDATA for D250AC01 device
  const response = await fs.readFile(
    // process.cwd() + `/public/iotdata/roomtemp_${data[0].label}.json`,
    // "utf8"
    process.cwd() + process.env.FILE_PATH + `/roomtemp_D250AC01.json`,
    "utf8"
  );

  const iotData = JSON.parse(response).map((item: any, index: any) => ({
    date: item._id,
    temp: item.temperature,
  }));
  /**********************************************************************/

  // get HUMIDITY_IOTDATA for D250AC01 device
  const humidResponse = await fs.readFile(
    process.cwd() + process.env.FILE_PATH + `/humidity_D250AC01.json`,
    "utf8"
  );

  const humidIotData = JSON.parse(humidResponse).map(
    (item: any, index: any) => ({
      date: item._id,
      humidity: item.humidity,
    })
  );
  /**********************************************************************/

  // get UNITCONSUMPTION  _IOTDATA for D250AC01 device
  const unitconsumResponse = await fs.readFile(
    process.cwd() + process.env.FILE_PATH + `/unitConsumption_D250AC01.json`,
    "utf8"
  );

  const unitconsumIotData = JSON.parse(unitconsumResponse).map(
    (item: any, index: any) => ({
      date: item._id,
      unitConsumption: item.unitConsumption,
    })
  );
  /**********************************************************************/

  /**********************************************************************/
  const interval = 20000; // Interval time in milliseconds
  // const interval = 120000; // Interval time in milliseconds (2 minutes)
  const task = () => {
    // Perform your periodic task here
    // console.log("Performing periodic task...");
  };

  task();

  setInterval(task, interval);
  /**********************************************************************/

  //current month dates
  const getDatesOfMonth = () => {
    // const startDate = new Date(2022, 5 - 1, 1); // Month is zero-based
    // const endDate = new Date(2022, 5, 0);

    // return Array.from({ length: endDate.getDate() }, (_, index) => {
    //   const currentDate = new Date(startDate);
    //   currentDate.setDate(startDate.getDate() + index);
    //   return {
    //     date: moment(new Date(currentDate)).format("YYYY-MM-DD"),
    //   };
    // });

    return Array.from({ length: lastDate.getDate() }, (_, index) => {
      const currentDate = new Date(firstDate);
      currentDate.setDate(firstDate.getDate() + index);
      return {
        // date1: new Date(currentDate), -- This line only for testing don't use this for further coding
        date: moment(new Date(currentDate)).format("YYYY-MM-DD"),
      };
    });
  };

  const devices = process.env.DEVICE ? JSON.parse(process.env.DEVICE) : [];

  return (
    <>
      <Main
        firstDate={firstDate}
        lastDate={lastDate}
        deviceList={data}
        pageiotdata={iotData}
        pagehumidIotData={humidIotData}
        pageunitconsIotData={unitconsumIotData}
        iotDevices={devices}
        getDatesOfMonth={getDatesOfMonth()}
      />
    </>
  );
}
