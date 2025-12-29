import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { selectedAc } = reqBody;

    // Read temperature data
    const tempData = JSON.parse(
      await fs.readFile(
        process.cwd() + process.env.FILE_PATH + `/roomtemp_${selectedAc}.json`,
        "utf8"
      )
    );

    // Read unit consumption data
    const unitConsumptionData = JSON.parse(
      await fs.readFile(
        process.cwd() +
          process.env.FILE_PATH +
          `/unitConsumption_${selectedAc}.json`,
        "utf8"
      )
    );

    // Read humidity data
    const humidityData = JSON.parse(
      await fs.readFile(
        process.cwd() + process.env.FILE_PATH + `/humidity_${selectedAc}.json`,
        "utf8"
      )
    );

    return NextResponse.json({
      message: "Data fetched successfully",
      success: true,
      tempData,
      unitConsumptionData,
      humidityData,
      selectedAc,
    });
  } catch (error: any) {
    // return NextResponse.json({ error: error.mesage }, { status: 500 });

    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
