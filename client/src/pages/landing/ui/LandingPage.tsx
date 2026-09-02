import { Link } from "react-router-dom";
import { ArrowRightIcon, ChevronUpIcon } from "@heroicons/react/24/outline";

export default function LandingPage() {
  return (
    <div className="flex min-h-[calc(100vh-2rem)] items-center justify-center py-8 lg:min-h-[calc(100vh-3rem)]">
      <section className="panel-surface w-full max-w-3xl overflow-hidden rounded-[2rem] p-8 text-center sm:p-14">
        <div className="mt-7 flex justify-center gap-10 sm:gap-15">
          <div className="flex flex-col items-center">
            <span className="font-['Yuji_Boku'] text-7xl leading-none text-slate-900 sm:text-8xl">
              改善
            </span>
            <span className="mt-3 text-sm font-semibold uppercase tracking-[0.3em] text-slate-600">
              Kaizen
            </span>
          </div>

          <div className="flex flex-col items-center">
            <span className="font-['Yuji_Boku'] text-7xl leading-none text-slate-900 sm:text-8xl">
              漢字
            </span>
            <span className="mt-3 text-sm font-semibold uppercase tracking-[0.3em] text-slate-600">
              Kanji
            </span>
          </div>
        </div>

        <h1 className="mx-auto mt-4 max-w-3xl text-xl font-semibold tracking-tight text-slate-900">
          Build Kanji Proficiency and Reading Comprehension <br />
          Through Continuous Improvement
        </h1>

        <div className="mt-8 flex flex-col items-center gap-3">
          <Link
            to="/demo"
            className="inline-flex w-full max-w-[14rem] items-center justify-center gap-2 rounded-xl bg-slate-900 px-6 py-3 font-semibold text-white shadow-lg shadow-slate-900/20 transition hover:bg-slate-700"
          >
            Explore Demo
            <ArrowRightIcon className="h-4 w-4" />
          </Link>

          <Link
            to="/login"
            className="inline-flex w-full max-w-[14rem] items-center justify-center rounded-xl border border-slate-300 bg-white/70 px-6 py-3 font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-white"
          >
            Log in
          </Link>
        </div>

        <div className="mt-6">
          <h2>About Kaizen Kanji</h2>
          <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-700">
            This app is designed to supplement conventional Japanese kanji
            flashcards by focusing on reading comprehension and practical usage.
            <br />
            <br />A demo mode is available to showcase the reading comprehension
            exercises and statistics using a sample of study results.
            Authentication is required to access the full functionality of the
            application. <br />
            <br />
            Thank you for taking the time to explore Kaizen Kanji!
          </p>
        </div>
      </section>
    </div>
  );
}
