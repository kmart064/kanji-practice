import { Link } from "react-router-dom";
import { LockClosedIcon } from "@heroicons/react/24/outline";
import type { ReactNode } from "react";

interface DashboardProps {
  isDemo?: boolean;
}

function LockedAction({ children }: { children: ReactNode }) {
  return (
    <button
      type="button"
      disabled
      aria-label={`${children} is unavailable in the demo`}
      className="flex w-full max-w-xs cursor-not-allowed items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-100 px-5 py-2.5 font-medium text-slate-400"
    >
      <LockClosedIcon className="h-4 w-4" />
      {children}
    </button>
  );
}

export default function Dashboard({ isDemo: isDemo = false }: DashboardProps) {
  const demoPrefix = isDemo ? "/demo" : "";

  return (
    <div className="py-4 lg:py-8">
      <div className="panel-surface mx-auto w-full max-w-3xl rounded-[2rem] p-8 text-center">
        <div className="space-y-3">
          {isDemo ? (
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-600">
              Demo Mode
            </p>
          ) : (
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">
              Dashboard
            </p>
          )}
          <h1 className="font-['Noto_Serif_JP'] text-4xl font-semibold text-slate-900">
            Study, Analyze, Reflect, and <br />
            Improve Your Kanji
          </h1>
          <p className="mx-auto max-w-xl text-sm leading-7 text-slate-600">
            {isDemo
              ? "Explore the reading demo and statistics. Sign in to create your own deck and begin studying."
              : "Manage your deck, start a study session, or analyze your progress from one place."}
          </p>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="flex flex-col items-center">
            {isDemo ? (
              <LockedAction>Manage Deck</LockedAction>
            ) : (
              <Link
                to="/manage"
                className="btn-tinted btn-blue w-full max-w-xs"
              >
                Manage Deck
              </Link>
            )}

            <p className="mt-2 text-center text-xs text-slate-500">
              Add, delete, and browse kanji cards in your deck
            </p>
          </div>
          <div className="flex flex-col items-center">
            {isDemo ? (
              <LockedAction>Study Kanji</LockedAction>
            ) : (
              <Link
                to="/study"
                className="btn-tinted btn-green w-full max-w-xs"
              >
                Study Kanji
              </Link>
            )}
            <p className="mt-2 text-center text-xs text-slate-500">
              Start a new study session or resume one in progress
            </p>
          </div>
          <div className="flex flex-col items-center">
            <Link
              to={`${demoPrefix}/rdemo`}
              className="btn-tinted btn-purple w-full max-w-xs"
            >
              Reading Demo
            </Link>

            <p className="mt-2 text-center text-xs text-slate-500">
              Test your kanji comprehension in context
            </p>
          </div>
          <div className="flex flex-col items-center">
            <Link
              to={`${demoPrefix}/statistics`}
              className="btn-tinted btn-red w-full max-w-xs"
            >
              Statistics
            </Link>
            <p className="mt-2 text-center text-xs text-slate-500">
              Track your progress and analyze your study results
            </p>
          </div>
        </div>

        {isDemo ? (
          <Link
            to="/login"
            className="mt-6 inline-flex text-sm font-semibold text-slate-700 underline decoration-slate-300 underline-offset-4 hover:text-slate-950"
          >
            Sign in to build your deck and start studying
          </Link>
        ) : (
          <p className="mt-8 text-sm text-gray-500">
            Built for immersive kanji learning
          </p>
        )}
      </div>
    </div>
  );
}
