import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log("Received form submission for step:", body.step);
    console.log("Form data:", body.data);

    // Insert form data into Supabase
    const { data, error } = await supabaseAdmin
      .from("form_submissions")
      .insert([
        {
          step: body.step,
          data: body.data,
          submitted_at: new Date().toISOString(),
          status: body.step === 3 ? "completed" : "in_progress",
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Supabase error:", error);
      throw error;
    }

    console.log("Successfully saved to Supabase:", data);

    return NextResponse.json({
      success: true,
      message: `Successfully processed step ${body.step}`,
      data: data,
    });
  } catch (error) {
    console.error("Error processing form submission:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to process form submission",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
