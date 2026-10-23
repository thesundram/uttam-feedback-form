import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return NextResponse.json({ error: "Please provide a valid review." }, { status: 400 });
    }
    const name = typeof body.name === "string" ? body.name.trim().slice(0, 100) : "";
    const email = typeof body.email === "string" ? body.email.trim() : "";
    const phone = typeof body.phone === "string" ? body.phone.trim() : "";
    const company = typeof body.company === "string" ? body.company.trim().slice(0, 150) : "";
    const feedback = typeof body.feedback === "string" ? body.feedback.trim().slice(0, 1500) : "";
    const rating = Number(body.rating);

    if (!name) return NextResponse.json({ error: "Name is required." }, { status: 400 });
    if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Please provide a valid email address." }, { status: 400 });
    }
    if (phone && !/^\d{10}$/.test(phone)) {
      return NextResponse.json({ error: "Please provide a 10-digit phone number." }, { status: 400 });
    }
    if (!Number.isInteger(rating) || rating < 1 || rating > 5) return NextResponse.json({ error: "Please provide a valid star rating." }, { status: 400 });

    const scriptUrl = process.env.GOOGLE_SCRIPT_URL;
    if (!scriptUrl) {
      console.error("Submission failed: GOOGLE_SCRIPT_URL environment variable is not configured.");
      return NextResponse.json({ error: "Service configuration error: GOOGLE_SCRIPT_URL is missing." }, { status: 500 });
    }

    const upstream = await fetch(scriptUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, company, feedback, rating, timestamp: typeof body.timestamp === "string" ? body.timestamp : new Date().toISOString(), source: "Steel Construction Expo Asia 2026", email, phone }),
      cache: "no-store",
      signal: AbortSignal.timeout(10000),
    });
    if (!upstream.ok) {
      return NextResponse.json({ error: "The feedback service could not accept your response. Please try again." }, { status: 502 });
    }
    const result: unknown = await upstream.json();
    if (!result || typeof result !== "object" || !("ok" in result) || result.ok !== true) {
      return NextResponse.json({ error: "The feedback service could not save your review. Please try again." }, { status: 502 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Unable to submit feedback right now. Please try again." }, { status: 500 });
  }
}
