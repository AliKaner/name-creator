import { NextResponse } from "next/server";
import { generateNames } from "@/lib/generator";
import { GenerateRequest, GenerateResponse } from "@/lib/types";

// Basic in-memory rate limiter (not ideal for serverless/multi-instance, but works for simple setups)
const rateLimitMap = new Map<string, { count: number; lastReset: number }>();
const WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS = 20;

export async function POST(request: Request) {
  try {
    // 1. Rate Limiting Logic
    const ip = request.headers.get("x-forwarded-for") ?? "127.0.0.1";
    const now = Date.now();
    
    if (!rateLimitMap.has(ip)) {
      rateLimitMap.set(ip, { count: 1, lastReset: now });
    } else {
      const data = rateLimitMap.get(ip)!;
      if (now - data.lastReset > WINDOW_MS) {
        // Reset window
        data.count = 1;
        data.lastReset = now;
      } else {
        data.count++;
        if (data.count > MAX_REQUESTS) {
          return new NextResponse("Too Many Requests", {
            status: 429,
            headers: {
              "Retry-After": Math.ceil((WINDOW_MS - (now - data.lastReset)) / 1000).toString(),
            },
          });
        }
      }
    }

    // 2. Body Parsing & Generation
    const body = await request.json() as GenerateRequest;
    
    if (!body.preset) {
      return NextResponse.json({ error: "Preset is required" }, { status: 400 });
    }

    const count = body.count || 5;
    const results = generateNames(body.preset, count, body.override, body.withMeaning);

    const response: GenerateResponse = { results };

    return NextResponse.json(response);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to generate names" }, { status: 500 });
  }
}
