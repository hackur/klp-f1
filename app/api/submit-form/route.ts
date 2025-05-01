import { NextResponse } from "next/server";

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log("Received form submission for step:", body.step);
    console.log("Form data:", body.data);

    // Simulate processing delay
    await delay(1000);

    // For testing: randomly fail 10% of the time
    if (Math.random() < 0.1) {
      throw new Error("Random failure for testing");
    }

    // In a real application, you would process and store the data here
    // For now, we'll just echo back success

    return NextResponse.json({
      success: true,
      message: `Successfully processed step ${body.step}`,
      data: body.data,
    });
  } catch (error) {
    console.error("Error processing form submission:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to process form submission",
      },
      { status: 500 }
    );
  }
}
