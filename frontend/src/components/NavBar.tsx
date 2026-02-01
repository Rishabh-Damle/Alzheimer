import { Link } from "react-router-dom";

import { Logo } from "./icons/Logo";

export const NavBar = () => {
  return (
    <header className="w-full">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between rounded-xl sm:rounded-2xl bg-white/80 shadow-sm backdrop-blur border border-purple-100 px-4 py-3 sm:px-6 sm:py-4">
          <div className="flex items-center justify-center sm:justify-start gap-3">
            <div className="text-3xl font-semibold text-purple-600">
              <Logo></Logo>
            </div>
            <div className="text-purple-700 text-2xl font-semibold tracking-tight">
              Alzheimer
            </div>
          </div>
          <nav className="flex w-full flex-wrap items-center justify-center sm:w-auto sm:justify-end gap-2">
            <Link
              to="/signup"
              className="inline-flex items-center justify-center rounded-full border border-purple-600 bg-purple-600 px-4 py-1.5 text-sm font-medium shadow-sm transition hover:bg-purple-700 hover:border-purple-700 mt-2 sm:mt-0"
              style={{ color: "#fefce8" }}
            >
              Signup
            </Link>
            <Link
              to="/signin"
              className="inline-flex items-center justify-center rounded-full border border-purple-600 bg-white px-4 py-1.5 text-sm font-medium text-purple-700 shadow-sm transition hover:bg-purple-50 mt-2 sm:mt-0"
            >
              Signin
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};
