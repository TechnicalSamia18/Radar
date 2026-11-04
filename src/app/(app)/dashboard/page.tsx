// Dashboard (REQ-050). At Milestone 1 it shows the first-run empty states from
// PRD §4; stat cards, openings and watched companies arrive in Milestones 2–7.
import Link from "next/link";
import { connection } from "next/server";
import { Suspense } from "react";
import { getProfile } from "@/lib/profile/repo";

export const metadata = { title: "Dashboard — Radar" };

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-5xl">
      <Suspense fallback={<p className="text-stormy">Loading…</p>}>
        <DashboardBody />
      </Suspense>
    </div>
  );
}

async function DashboardBody() {
  await connection();
  const now = new Date();
  const profile = await getProfile();
  const hasSkills = (profile?.skills.length ?? 0) > 0;

  return (
    <>
      <p className="label-caps text-sunset">
        {now.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "short", timeZone: "Asia/Karachi" })}
      </p>
      <h1 className="mt-2 text-4xl font-normal">{greeting(now)}</h1>

      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {!hasSkills && (
          <EmptyCard
            title="No resume yet"
            body="Upload your resume to get fit scores. Matching stays off until then, but company tracking still works."
            action={{ href: "/profile", label: "Upload your resume" }}
          />
        )}
        <EmptyCard
          title="No companies yet"
          body="Radar starts watching once you import a list of software houses or add one by hand."
        />
      </div>
    </>
  );
}

function EmptyCard(props: { title: string; body: string; action?: { href: string; label: string } }) {
  return (
    <section className="border border-dashed border-cloud bg-paper p-6">
      <h2 className="text-xl font-normal">{props.title}</h2>
      <p className="mt-2 text-stormy">{props.body}</p>
      {props.action && (
        <Link href={props.action.href} className="label-caps mt-5 inline-block bg-sunset px-6 py-3 text-sand hover:bg-sunset/85">
          {props.action.label}
        </Link>
      )}
    </section>
  );
}

/** "Good morning/afternoon/evening" in Pakistan time, whatever the server's time zone. */
function greeting(now: Date) {
  const hour = Number(new Intl.DateTimeFormat("en-GB", { hour: "numeric", hour12: false, timeZone: "Asia/Karachi" }).format(now));
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}
