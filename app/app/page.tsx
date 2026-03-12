"use client";

import { useState } from "react";

const FREE_LIMIT = 3;
const STORAGE_KEY = "resumatch_uses";

function getUses(): number {
  if (typeof window === "undefined") return 0;
  return parseInt(localStorage.getItem(STORAGE_KEY) || "0", 10);
}

function incrementUses() {
  localStorage.setItem(STORAGE_KEY, String(getUses() + 1));
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <button
      onClick={copy}
      className="text-xs px-3 py-1 rounded-md bg-gray-100 hover:bg-gray-200 text-gray-600 transition"
    >
      {copied ? "Copied!" : "Copy"}
    </button>
  );
}

export default function AppPage() {
  const [resume, setResume] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    bullets: string;
    keywords: string;
    coverLetter: string;
  } | null>(null);
  const [error, setError] = useState("");
  const [usesLeft, setUsesLeft] = useState(() => FREE_LIMIT - getUses());

  const handleGenerate = async () => {
    if (usesLeft <= 0) return;
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await fetch("/api/tailor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resume, jobDescription: jobDesc }),
      });

      const data = await res.json();
      if (!res.ok || data.error) throw new Error(data.error || "Unknown error");

      incrementUses();
      setUsesLeft(FREE_LIMIT - getUses());
      setResult(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <a href="/" className="text-indigo-600 text-sm hover:underline">
            ← Home
          </a>
          <h1 className="text-2xl font-bold text-gray-900 mt-2">
            Tailor Your Resume
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Paste your resume and a job description below. We&apos;ll do the
            rest.
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Your Resume
            </label>
            <textarea
              value={resume}
              onChange={(e) => setResume(e.target.value)}
              rows={10}
              placeholder="Paste your resume here..."
              className="w-full border border-gray-300 rounded-lg p-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-y"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Job Description
            </label>
            <textarea
              value={jobDesc}
              onChange={(e) => setJobDesc(e.target.value)}
              rows={10}
              placeholder="Paste the job description here..."
              className="w-full border border-gray-300 rounded-lg p-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-y"
            />
          </div>

          {usesLeft > 0 ? (
            <button
              onClick={handleGenerate}
              disabled={loading || !resume.trim() || !jobDesc.trim()}
              className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 text-white font-semibold py-3 rounded-lg transition text-sm"
            >
              {loading ? "Generating..." : "Generate Tailored Resume"}
            </button>
          ) : (
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-3">
                You&apos;ve used your {FREE_LIMIT} free generations.
              </p>
              <a
                href="https://buy.stripe.com/YOUR_STRIPE_LINK"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-lg transition text-sm"
              >
                Get 20 more for $9 →
              </a>
            </div>
          )}

          {usesLeft > 0 && usesLeft <= FREE_LIMIT && (
            <p className="text-xs text-center text-gray-400">
              {usesLeft} free generation{usesLeft !== 1 ? "s" : ""} remaining
            </p>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg p-3">
              {error}
            </div>
          )}
        </div>

        {result && (
          <div className="mt-10 space-y-6">
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-semibold text-gray-800">
                  Tailored Bullet Points
                </h2>
                <CopyButton text={result.bullets} />
              </div>
              <pre className="text-sm text-gray-700 whitespace-pre-wrap font-sans leading-relaxed">
                {result.bullets}
              </pre>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-semibold text-gray-800">
                  Missing Keywords
                </h2>
                <CopyButton text={result.keywords} />
              </div>
              <p className="text-sm text-gray-700 leading-relaxed">
                {result.keywords}
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-semibold text-gray-800">Cover Letter</h2>
                <CopyButton text={result.coverLetter} />
              </div>
              <pre className="text-sm text-gray-700 whitespace-pre-wrap font-sans leading-relaxed">
                {result.coverLetter}
              </pre>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
