import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log("API Route - Environment check:", {
      hasSupabaseUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
      hasServiceKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
    });

    console.log("API Route - Request body:", {
      step: body.step,
      hasData: !!body.data,
    });

    // Insert form data into Supabase
    console.log("API Route - Attempting Supabase insert...");
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
      console.error(
        "API Route - Supabase error details:",
        JSON.stringify(error, null, 2)
      );
      return NextResponse.json(
        {
          success: false,
          message: "Database error",
          error: error.message || "Failed to save to database",
        },
        { status: 500 }
      );
    }

    console.log(
      "API Route - Successfully saved to Supabase:",
      JSON.stringify(data, null, 2)
    );

    return NextResponse.json({
      success: true,
      message: `Successfully processed step ${body.step}`,
      data: data,
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : JSON.stringify(error);
    console.error("Error processing form submission:", errorMessage);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to process form submission",
        error: errorMessage,
      },
      { status: 500 }
    );
  }
}
