import { Link } from "react-router-dom";

export const Hero = () => {
  return (
    <section className="mt-16 flex flex-wrap justify-center items-center px-4">
      <div className="flex flex-col items-center text-center max-w-3xl">
        <h1 className="tracking-tight text-5xl sm:text-6xl md:text-7xl text-purple-700 font-semibold leading-tight">
          Your Second Brain
        </h1>
        <p className="mt-6 text-base sm:text-lg text-neutral-600 max-w-xl">
          Organize content from multiple sources such as Twitter, YouTube, and
          Google Docs into a calm, centralized knowledge hub you can trust.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/signup"
            className="inline-flex items-center justify-center rounded-full border border-purple-600 bg-purple-600 px-6 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-purple-700 hover:border-purple-700"
            style={{ color: "#ffffff" }}
          >
            Get started
          </Link>
          <Link
            to="https://github.com/Vrushabh-Damle/Alzheimer"
            className="inline-flex items-center justify-center rounded-full border border-purple-200 bg-white/70 px-6 py-2.5 text-sm font-medium text-purple-700 shadow-sm transition hover:bg-purple-50"
          >
            View on GitHub ➜
          </Link>
        </div>
      </div>
    </section>
  );
};
