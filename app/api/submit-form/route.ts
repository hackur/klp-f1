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

    if (tableExists === null) {
      // Execute raw SQL to create table
      const { error } = await supabaseAdmin.from("form_submissions").insert([
        {
          step: 0,
          data: {},
          status: "in_progress",
        },
      ]);

      // If the table doesn't exist, this will fail with a specific error
      if (error?.code === "42P01") {
        // Table doesn't exist, create it
        const { error: createError } = await supabaseAdmin
          .from("_sqlquery")
          .rpc("execute", {
            query_text: `
          CREATE TABLE IF NOT EXISTS form_submissions (
            id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
            step INTEGER NOT NULL,
            data JSONB NOT NULL,
            submitted_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
            status TEXT NOT NULL CHECK (status IN ('in_progress', 'completed')),
            created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
          );
          
          CREATE INDEX IF NOT EXISTS idx_form_submissions_status ON form_submissions(status);
          CREATE INDEX IF NOT EXISTS idx_form_submissions_submitted_at ON form_submissions(submitted_at);
        `,
          });

        if (createError) {
          console.error("Error creating table:", createError);
          throw createError;
        }
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
