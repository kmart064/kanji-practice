import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="py-4 lg:py-8">
      <div className="panel-surface mx-auto w-full max-w-3xl rounded-[2rem] p-8 text-center">
        <div className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">
            Dashboard
          </p>
          <h1 className="text-4xl font-semibold text-slate-900">
            Build your daily kanji flow.
          </h1>
          <p className="mx-auto max-w-xl text-sm leading-7 text-slate-600">
            Jump into deck management, study sessions, or demos from one place.
          </p>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="flex justify-center">
            <Link to="/manage" className="btn-tinted btn-blue w-full max-w-xs">
              Manage Deck
            </Link>
          </div>
          <div className="flex justify-center">
            <Link
              to="/study"
              className="btn-tinted btn-green w-full max-w-xs"
            >
              Study Kanji
            </Link>
          </div>
          <div className="flex justify-center">
            <Link
              to="/rdemo"
              className="btn-tinted btn-purple w-full max-w-xs"
            >
              Reading Demo
            </Link>
          </div>
          <div className="flex justify-center">
            <Link to="/statistics" className="btn-tinted btn-red w-full max-w-xs">
              View Statistics
            </Link>
          </div>
        </div>

        <p className="mt-8 text-sm text-gray-500">
          Built for immersive kanji learning
        </p>
      </div>
    </div>
  );
}
