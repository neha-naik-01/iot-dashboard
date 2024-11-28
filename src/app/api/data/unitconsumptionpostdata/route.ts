import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { selectedAc } = reqBody;

    //get iotdata for seleted ac
    const response = JSON.parse(
      await fs.readFile(
        process.cwd() + process.env.FILE_PATH + `/unitConsumption_${selectedAc}.json`,
        "utf8"
      )
    );

    return NextResponse.json({
      message: "Data fetched successfully",
      success: true,
      response,
      selectedAc,
    });

    console.log(response);
  } catch (error: any) {
    return NextResponse.json({ error: error.mesage }, { status: 500 });
  }
}
