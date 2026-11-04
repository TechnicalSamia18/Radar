// INCOMPLETE (Milestone 9): the public demo with fictional sample data
// (docs/ASSUMPTIONS.md A-04) is built once the dashboard exists.
import Link from "next/link";
import { RadarMark } from "@/components/icons";

export const metadata = { title: "Demo — Radar" };

export default function DemoPage() {
  return (
    <main className="flex flex-1 items-center justify-center bg-evening px-6 py-20 text-beige">
      <div className="max-w-md text-center">
        <RadarMark className="mx-auto h-10 w-10 text-rose" />
        <h1 className="mt-6 text-3xl font-normal">The demo isn&apos;t ready yet</h1>
        <p className="mt-4 text-beige/80">
          It will show the dashboard with sample data from fictional companies, once the dashboard is built.
        </p>
        <Link href="/" className="label-caps mt-8 inline-block border border-beige/70 px-6 py-3 hover:bg-beige hover:text-evening">
          Back to home
        </Link>
      </div>
    </main>
  );
}
