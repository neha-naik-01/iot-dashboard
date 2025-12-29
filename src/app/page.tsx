"use server";
import { unstable_noStore as noStore } from "next/cache";
import moment from "moment";
//import "bootstrap/dist/css/bootstrap.min.css";
import Mainfullcalendar from "../app/comp/mainfullCalendar";
import axios, { AxiosResponse }  from "axios";
import { getAcData } from "@/lib/getAcData"; 

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
    return Array.from({ length: lastDate.getDate() }, (_, index) => {
      const currentDate = new Date(firstDate);
      currentDate.setDate(firstDate.getDate() + index);
      return {
        date: moment(new Date(currentDate)).format("YYYY-MM-DD"),
      };
    });
  };

  const devices = process.env.DEVICE ? JSON.parse(process.env.DEVICE) : [];

  const resp = await getAcData(devices[0]);
  
  // const resp: AxiosResponse<any, any> = await axios.post(
  //   process.env.URL + "/api/data/postdata",
  //   {
  //     selectedAc: devices[0],
  //   }
  // );
    
  return (
    <>
      <Mainfullcalendar
        // pageiotdata={resp.data.tempData}
        pageiotdata={resp.tempData}
        // pagehumidIotData={resp.data.humidityData}
        pagehumidIotData={resp.humidityData}
        // pageunitconsIotData={resp.data.unitConsumptionData}
        pageunitconsIotData={resp.unitConsumptionData}
        iotDevices={devices}
        getDatesOfMonth={getDatesOfMonth()}
      />
    </>
  );
}
