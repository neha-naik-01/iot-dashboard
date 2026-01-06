"use server";

import { promises as fs } from "fs";

export async function getAcData(selectedAc: string) {
  const basePath = process.cwd() + process.env.FILE_PATH;

  const tempData = JSON.parse(
    await fs.readFile(`${basePath}/roomtemp_${selectedAc}.json`, "utf8")
  );

  const unitConsumptionData = JSON.parse(
    await fs.readFile(`${basePath}/unitConsumption_${selectedAc}.json`, "utf8")
  );

  const humidityData = JSON.parse(
    await fs.readFile(`${basePath}/humidity_${selectedAc}.json`, "utf8")
  );

  return { tempData, unitConsumptionData, humidityData };
}
