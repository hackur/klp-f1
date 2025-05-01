import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

// Create table if it doesn't exist
async function ensureTableExists() {
  try {
    // Check if table exists
    const { data: tableExists } = await supabaseAdmin
      .from("form_submissions")
      .select("id")
      .limit(1);

    // If table doesn't exist, we'll get null. Let's try to insert and catch any table-not-exists error
    if (tableExists === null) {
      try {
        // Attempt to insert a test record
        const { error: insertError } = await supabaseAdmin
          .from("form_submissions")
          .insert({
            step: 0,
            data: {},
            status: "in_progress",
          });

        if (insertError?.code === "42P01") {
          // Table doesn't exist, create it using REST API
          const baseUrl = process.env.SUPABASE_URL;
          const apiKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

          const response = await fetch(
            `${baseUrl}/rest/v1/rpc/create_form_table`,
            {
              method: "POST",
              headers: {
                apikey: apiKey!,
                Authorization: `Bearer ${apiKey}`,
                "Content-Type": "application/json",
                Prefer: "return=minimal",
              },
            }
          );

          if (!response.ok) {
            throw new Error(`Failed to create table: ${await response.text()}`);
          }
        }
      } catch (error) {
        console.error("Error during table creation:", error);
        throw error;
      }
    }
  } catch (error) {
    console.error("Error checking/creating table:", error);
    throw error;
  }
}

export async function POST(request: Request) {
  // Ensure table exists before proceeding
  await ensureTableExists();
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
