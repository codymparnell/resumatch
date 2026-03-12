import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="max-w-3xl mx-auto px-6 pt-24 pb-16 text-center">
        <span className="inline-block bg-indigo-50 text-indigo-700 text-xs font-semibold px-3 py-1 rounded-full mb-6 tracking-wide uppercase">
          Free to try · No signup
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight mb-5">
          Tailor your resume to any job in{" "}
          <span className="text-indigo-600">60 seconds</span>
        </h1>
        <p className="text-lg text-gray-500 mb-8 max-w-xl mx-auto">
          Paste your resume and a job description. Get rewritten bullet points,
          missing keywords, and a custom cover letter — instantly.
        </p>
        <Link
          href="/app"
          className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white text-base font-semibold px-8 py-4 rounded-xl transition shadow"
        >
          Try it free →
        </Link>
        <p className="text-xs text-gray-400 mt-3">
          3 free generations. No credit card required.
        </p>
      </section>

      {/* How it works */}
      <section className="bg-gray-50 py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-10">
            How it works
          </h2>
          <div className="grid sm:grid-cols-3 gap-8 text-center">
            {[
              {
                step: "1",
                title: "Paste your resume",
                desc: "Copy and paste your existing resume text. No formatting needed.",
              },
              {
                step: "2",
                title: "Paste the job posting",
                desc: "Copy the job description from any job board — LinkedIn, Indeed, anywhere.",
              },
              {
                step: "3",
                title: "Get tailored output",
                desc: "Receive rewritten bullets, missing keywords, and a custom cover letter in seconds.",
              },
            ].map(({ step, title, desc }) => (
              <div key={step}>
                <div className="w-10 h-10 rounded-full bg-indigo-600 text-white text-lg font-bold flex items-center justify-center mx-auto mb-3">
                  {step}
                </div>
                <h3 className="font-semibold text-gray-800 mb-1">{title}</h3>
                <p className="text-sm text-gray-500">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What you get */}
      <section className="max-w-3xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-10">
          What you get
        </h2>
        <div className="grid sm:grid-cols-3 gap-6">
          {[
            {
              icon: "✦",
              title: "Tailored bullets",
              desc: "Your experience rewritten to match the specific language and requirements of the job.",
            },
            {
              icon: "🔑",
              title: "Missing keywords",
              desc: "The exact skills and terms the ATS and hiring manager are scanning for — that you're missing.",
            },
            {
              icon: "✉️",
              title: "Cover letter",
              desc: "A short, personalized cover letter that references the job and highlights your most relevant work.",
            },
          ].map(({ icon, title, desc }) => (
            <div
              key={title}
              className="border border-gray-200 rounded-xl p-5 text-center"
            >
              <div className="text-2xl mb-3">{icon}</div>
              <h3 className="font-semibold text-gray-800 mb-1">{title}</h3>
              <p className="text-sm text-gray-500">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-indigo-600 py-16 px-6 text-center">
        <h2 className="text-3xl font-extrabold text-white mb-4">
          Stop sending the same resume to every job
        </h2>
        <p className="text-indigo-200 mb-8 text-lg">
          Tailor it in 60 seconds. Get more interviews.
        </p>
        <Link
          href="/app"
          className="inline-block bg-white text-indigo-700 font-bold px-8 py-4 rounded-xl hover:bg-indigo-50 transition shadow"
        >
          Generate my tailored resume →
        </Link>
      </section>

      <footer className="text-center py-6 text-xs text-gray-400">
        ResuMatch · Built to get you hired faster
      </footer>
    </main>
  );
}
