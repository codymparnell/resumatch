import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

const client = new Anthropic();

export async function POST(req: NextRequest) {
  const { resume, jobDescription } = await req.json();

  if (!resume || !jobDescription) {
    return NextResponse.json(
      { error: "Resume and job description are required." },
      { status: 400 }
    );
  }

  const prompt = `You are an expert resume writer and career coach. A job seeker needs you to tailor their resume to a specific job posting.

RESUME:
${resume}

JOB DESCRIPTION:
${jobDescription}

Please analyze both and return a JSON response with exactly these three fields:

{
  "bullets": "Rewritten resume bullet points tailored to this specific job. Keep the format as bullet points (one per line starting with •). Make each bullet start with a strong action verb and incorporate keywords from the job description where genuine.",
  "keywords": "A comma-separated list of important keywords/skills from the job description that are missing or underrepresented in the resume. Focus on hard skills, tools, certifications, and specific requirements.",
  "coverLetter": "A concise, personalized cover letter (3 short paragraphs) tailored to this specific job. First paragraph: hook and why this role. Second paragraph: 2-3 specific achievements from the resume relevant to this job. Third paragraph: brief close and call to action."
}

Respond ONLY with valid JSON. No explanation, no markdown, just the JSON object.`;

  try {
    const message = await client.messages.create({
      model: "claude-opus-4-6",
      max_tokens: 2000,
      messages: [{ role: "user", content: prompt }],
    });

    const text =
      message.content[0].type === "text" ? message.content[0].text : "";
    const cleaned = text.replace(/^```json\s*/i, "").replace(/```\s*$/, "").trim();
    const parsed = JSON.parse(cleaned);

    return NextResponse.json(parsed);
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}
