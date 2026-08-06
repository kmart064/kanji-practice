import { NavLink } from "react-router-dom";
import {
  Bars3Icon,
  BookOpenIcon,
  ChartBarIcon,
  ChevronLeftIcon,
  HomeIcon,
  LanguageIcon,
} from "@heroicons/react/24/outline";

const navItems = [
  { label: "Dashboard", to: "/", icon: HomeIcon, end: true },
  { label: "Reading Demo", to: "/rdemo", icon: BookOpenIcon },
  { label: "Grammar Demo", to: "/grammar-demo", icon: LanguageIcon },
  { label: "Statistics", to: "/statistics", icon: ChartBarIcon },
];

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

export default function Sidebar({ isCollapsed, onToggle }: SidebarProps) {
  return (
    <>
      <aside
        className={[
          "w-full lg:fixed lg:left-6 lg:top-6 lg:z-20 lg:w-56 lg:transition-transform lg:duration-300",
          isCollapsed
            ? "lg:-translate-x-[calc(100%+2rem)]"
            : "lg:translate-x-0",
        ].join(" ")}
      >
        <div className="panel-surface rounded-[2rem] border border-white/40 px-3 py-4 shadow-xl">
          <div className="flex items-start justify-between gap-3 px-2 pb-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
                Kanji Practice
              </p>
              <h2 className="mt-2 text-xl font-semibold text-slate-800">
                Navigation
              </h2>
            </div>

            <button
              type="button"
              onClick={onToggle}
              aria-label="Collapse sidebar"
              className="hidden rounded-full border border-slate-200/80 bg-white/80 p-2 text-slate-600 shadow-sm transition hover:bg-white hover:text-slate-900 lg:inline-flex"
            >
              <ChevronLeftIcon className="h-4 w-4" />
            </button>
          </div>

          <nav aria-label="Primary" className="flex flex-col gap-2">
            {navItems.map(({ label, to, icon: Icon, end }) => (
              <NavLink
                key={label}
                to={to}
                end={end}
                className={({ isActive }) =>
                  [
                    "flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-medium transition-all duration-200",
                    isActive
                      ? "bg-slate-900 text-white shadow-lg shadow-slate-900/20"
                      : "text-slate-700 hover:bg-white/60 hover:text-slate-900",
                  ].join(" ")
                }
              >
                <Icon className="h-5 w-5 flex-shrink-0" />
                <span>{label}</span>
              </NavLink>
            ))}
          </nav>
        </div>
      </aside>

      {isCollapsed ? (
        <button
          type="button"
          onClick={onToggle}
          aria-label="Expand sidebar"
          className="hidden lg:fixed lg:left-4 lg:top-6 lg:z-20 lg:inline-flex rounded-full border border-white/70 bg-white/85 p-3 text-slate-700 shadow-lg backdrop-blur transition hover:bg-white hover:text-slate-900"
        >
          <Bars3Icon className="h-5 w-5" />
        </button>
      ) : null}
    </>
  );
}
