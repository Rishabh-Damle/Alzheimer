import { Hero } from "../components/Hero";
import { NavBar } from "../components/NavBar";

export const Landing = () => {
  return (
    <div className="relative min-h-screen w-full">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[420px] bg-gradient-to-b from-purple-100/80 via-purple-50/30 to-transparent blur-[2px]" />
      <main className="mx-auto flex min-h-screen max-w-6xl flex-col px-4 sm:px-6 pb-16">
        <div className="pt-6">
          <NavBar></NavBar>
        </div>
        <Hero></Hero>
      </main>
    </div>
  );
};
