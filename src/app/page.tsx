import Link from "next/link";
import { RadarGraphic } from "@/components/radar-graphic";
import { RadarMark, ShieldIcon, UploadIcon } from "@/components/icons";

const STEPS = [
  {
    n: "01",
    title: "Discover",
    body: "Builds a list of software houses from public directories, including the small ones.",
  },
  {
    n: "02",
    title: "Watch",
    body: "Checks their careers pages daily and finds hiring emails when there's no page.",
  },
  {
    n: "03",
    title: "Match",
    body: "Compares each opening with your resume and explains what fits and what's missing.",
  },
];

export default function LandingPage() {
  return (
    <main className="flex flex-1 flex-col">
      {/* ── Hero ───────────────────────────────────────── */}
      <section className="bg-evening text-beige">
        <div className="mx-auto max-w-6xl px-6 pb-20 pt-8 sm:px-10">
          <header className="flex flex-wrap items-center justify-between gap-6">
            <Link href="/" className="flex items-center gap-3 text-xl font-normal tracking-[0.3em]">
              <RadarMark className="h-6 w-6 text-rose" />
              RADAR
            </Link>
            <nav aria-label="Main" className="flex flex-wrap items-center gap-6 whitespace-nowrap text-sm sm:gap-10">
              <a href="#how" className="label-caps text-cloud hover:text-beige">How it works</a>
              <a href="#about" className="label-caps text-cloud hover:text-beige">About</a>
              <Link href="/dashboard" className="label-caps border border-beige px-5 py-3 hover:bg-beige hover:text-evening">
                Dashboard
              </Link>
            </nav>
          </header>

          <div className="mt-16 grid items-center gap-12 md:grid-cols-[1.1fr_1fr]">
            <div>
              <p className="label-caps text-cloud">For CS students in Pakistan</p>
              <h1 className="mt-6 text-5xl leading-[1.1] font-normal sm:text-6xl">
                Find the software houses{" "}
                <em className="font-accent text-rose">you&apos;ve never heard of.</em>
              </h1>
              <p className="mt-8 max-w-xl text-lg leading-relaxed text-beige/85">
                Radar watches the careers pages of Pakistani software houses every day, spots new internships and
                jobs, and tells you which ones fit your resume, and why.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/profile"
                  className="label-caps inline-flex items-center gap-3 bg-sunset px-8 py-4 text-sand hover:bg-sunset/85"
                >
                  <UploadIcon /> Upload your resume
                </Link>
                <Link
                  href="/demo"
                  className="label-caps inline-flex items-center border border-beige/70 px-8 py-4 hover:bg-beige hover:text-evening"
                >
                  Try the demo
                </Link>
              </div>
              <p className="mt-6 flex items-center gap-2 text-sm text-cloud">
                <ShieldIcon /> You always apply yourself. No bots, no scraping LinkedIn.
              </p>
            </div>
            <RadarGraphic />
          </div>
        </div>
      </section>

      {/* ── How it works ───────────────────────────────── */}
      <section id="how" className="bg-beige">
        <div className="mx-auto max-w-6xl px-6 py-14 sm:px-10">
          <h2 className="label-caps text-sunset">How it works</h2>
          <ol className="mt-8 grid gap-10 md:grid-cols-3">
            {STEPS.map((s) => (
              <li key={s.n}>
                <span className="text-5xl text-stormy" aria-hidden="true">{s.n}</span>
                <h3 className="label-caps mt-4 text-base text-evening">{s.title}</h3>
                <p className="mt-3 leading-relaxed text-stormy">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── About ──────────────────────────────────────── */}
      <section id="about" className="bg-sand">
        <div className="mx-auto max-w-6xl px-6 py-14 sm:px-10">
          <h2 className="label-caps text-sunset">About</h2>
          <div className="mt-6 grid gap-8 text-stormy md:grid-cols-2">
            <p className="leading-relaxed">
              Openings at smaller Pakistani software houses are scattered across company websites and private
              groups. Radar is a personal tool built by a CS student to see them in one place.
            </p>
            <p className="leading-relaxed">
              It reads only public careers pages and job feeds, respects each site&apos;s robots.txt, checks each
              site at most once a day, and never fills in or submits an application for you.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
