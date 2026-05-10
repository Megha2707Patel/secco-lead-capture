// Import Next.js response helper
import { NextResponse } from "next/server";

// Import Supabase client creator
import { createClient } from "@supabase/supabase-js";

// Create POST API route
export async function POST(request: Request) {
  try {
    // Read form data from request body
    const body = await request.json();

    // Create server-side Supabase client using secret/service role key
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // Save lead to Supabase first
    const { data, error } = await supabase
      .from("leads")
      .insert([
        {
          full_name: body.full_name,
          email: body.email,
          company: body.company || null,
          source: body.source,
          message: body.message || null,
        },
      ])
      .select()
      .single();

    // If Supabase insert fails, return a clear error
    if (error) {
      console.error("Supabase insert failed:", error.message);

      // PostgreSQL error code 23505 means unique constraint violation
      // This is used for duplicate email handling
      if (error.code === "23505") {
        return NextResponse.json(
          { error: "This email has already submitted a lead." },
          { status: 400 }
        );
      }

      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    // Try webhook after successful database save
    try {
      const webhookResponse = await fetch(process.env.WEBHOOK_URL!, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",

          // Required by Secco Squared so they can identify your submission
          "X-Candidate-Name": process.env.CANDIDATE_NAME!,
        },

        // Send saved lead data to webhook
        body: JSON.stringify(data),
      });

      // If webhook returns a non-success status, log it
      if (!webhookResponse.ok) {
        console.error(
          "Webhook failed with status:",
          webhookResponse.status,
          await webhookResponse.text()
        );
      } else {
        // This will show in your terminal locally, and Vercel logs after deployment
        console.log("Webhook sent successfully");
      }
    } catch (webhookError) {
      // Log webhook failure, but do not fail user submission
      console.error("Webhook failed:", webhookError);
    }

    // Return success even if webhook failed
    return NextResponse.json(
      { message: "Lead submitted successfully", lead: data },
      { status: 201 }
    );
  } catch (error) {
    console.error("Unexpected lead submission error:", error);

    return NextResponse.json(
      { error: "Something went wrong while submitting the lead" },
      { status: 500 }
    );
  }
}