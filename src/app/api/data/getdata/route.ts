import { NextResponse } from "next/server";
import { promises as fs } from "fs";

export async function GET() {
  try {
    // get ac list to diplsay
    const file = await fs.readFile(
      // process.cwd() + "/public/iotdata/deviceIds.json",
      // "utf8"
      process.cwd() + process.env.FILE_PATH + "/deviceIds.json",
      "utf8"
    );
    const data = JSON.parse(file).map((item: any, index: any) => ({
      value: index + 1,
      label: item,
    }));
    // return data;
    return NextResponse.json({
      message: "devicelist fetched",
      success: true,
      data,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.mesage }, { status: 500 });
  }
}
