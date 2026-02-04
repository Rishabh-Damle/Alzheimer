import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Brain,
  BookmarkPlus,
  Tags,
  Database,
  Zap,
  Search,
  Sparkles,
  Twitter,
  Youtube,
  FileText,
  Menu,
  X,
} from "lucide-react";

export function Landing() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Brain className="w-8 h-8 text-blue-600" />
              <span className="text-2xl font-bold text-slate-900">Alzheimer</span>
            </div>


            <div className="hidden md:flex items-center gap-3">
              <button
                onClick={() => navigate("/signin")}
                className="px-6 py-2.5 text-blue-600 font-medium hover:text-blue-700 transition-all cursor-pointer"
              >
                Sign In
              </button>
              <button
                onClick={() => navigate("/signup")}
                className="px-6 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-all shadow-sm hover:shadow-md cursor-pointer"
              >
                Get Started
              </button>
            </div>


            <button
              className="md:hidden p-2 text-slate-600 hover:text-blue-600 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>


          {isMenuOpen && (
            <div className="md:hidden pt-4 pb-2 border-t border-slate-100 mt-4 space-y-4 animate-in slide-in-from-top duration-200">
              <button
                onClick={() => navigate("/signin")}
                className="block w-full text-left px-2 py-2 text-blue-600 font-medium hover:bg-blue-50 rounded-lg transition-all cursor-pointer"
              >
                Sign In
              </button>
              <button
                onClick={() => navigate("/signup")}
                className="block w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-all shadow-sm cursor-pointer"
              >
                Get Started
              </button>
            </div>
          )}
        </div>
      </nav>

      <main>
        <section className="pt-24 md:pt-32 pb-16 md:pb-20 px-6">
          <div className="max-w-7xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium mb-8 border border-blue-100">
              <Sparkles className="w-4 h-4" />
              Your Personal Knowledge Repository
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
              Your Second Brain for
              <br />
              <span className="text-blue-600">Digital Knowledge</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-600 mb-10 md:mb-12 max-w-3xl mx-auto leading-relaxed">
              Collect, organize, and manage knowledge from Twitter, YouTube, and
              Google Docs in one centralized place. Never lose valuable insights
              again.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => navigate("/signup")}
                className="w-full sm:w-auto px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl text-lg cursor-pointer"
              >
                Start Building Your Brain
              </button>
              <button
                onClick={() => scrollToSection("problem")}
                className="w-full sm:w-auto px-8 py-4 bg-white text-slate-700 rounded-lg font-semibold hover:bg-slate-50 transition-all shadow-md border border-slate-200 text-lg cursor-pointer"
              >
                Learn More
              </button>
            </div>
          </div>
        </section>

        <section id="problem" className="py-16 md:py-20 px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                The Problem We Solve
              </h2>
              <p className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto">
                In today's digital world, valuable information is scattered
                everywhere. Bookmarks get lost, notes become unstructured, and
                important insights are hard to retrieve.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="p-8 bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl border border-slate-200">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                  <Database className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                  Centralized Hub
                </h3>
                <p className="text-slate-600">
                  Save content from multiple platforms in one secure, organized
                  location.
                </p>
              </div>
              <div className="p-8 bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl border border-slate-200">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                  <Tags className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                  Smart Organization
                </h3>
                <p className="text-slate-600">
                  Tag and categorize your knowledge for easy retrieval when you
                  need it.
                </p>
              </div>
              <div className="p-8 bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl border border-slate-200">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                  Always Accessible
                </h3>
                <p className="text-slate-600">
                  Access your second brain across all sessions and devices,
                  anytime.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20 px-6 bg-gradient-to-br from-blue-50 to-slate-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Powerful Features
              </h2>
              <p className="text-base md:text-lg text-slate-600">
                Everything you need to build your personal knowledge base
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-all border border-slate-200">
                <BookmarkPlus className="w-10 h-10 text-blue-600 mb-4" />
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  Content Collection
                </h3>
                <p className="text-slate-600">
                  Save content from Twitter, YouTube, and Google Docs with ease.
                </p>
              </div>
              <div className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-all border border-slate-200">
                <Tags className="w-10 h-10 text-blue-600 mb-4" />
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  Smart Tagging
                </h3>
                <p className="text-slate-600">
                  Organize with tags and categories for structured knowledge
                  management.
                </p>
              </div>
              <div className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-all border border-slate-200">
                <Brain className="w-10 h-10 text-blue-600 mb-4" />
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  Second Brain
                </h3>
                <p className="text-slate-600">
                  Personal knowledge repository that helps you retain important
                  ideas.
                </p>
              </div>
              <div className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-all border border-slate-200">
                <Database className="w-10 h-10 text-blue-600 mb-4" />
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  Secure Storage
                </h3>
                <p className="text-slate-600">
                  Data stored securely and accessible across all your sessions.
                </p>
              </div>
              <div className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-all border border-slate-200">
                <Search className="w-10 h-10 text-blue-600 mb-4" />
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  Fast Search
                </h3>
                <p className="text-slate-600">
                  Find what you need instantly with powerful search
                  capabilities.
                </p>
              </div>
              <div className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-all border border-slate-200">
                <Zap className="w-10 h-10 text-blue-600 mb-4" />
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  High Performance
                </h3>
                <p className="text-slate-600">
                  Built with modern tech for speed and scalability.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20 px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Connect Your Sources
              </h2>
              <p className="text-base md:text-lg text-slate-600">
                Seamlessly integrate with the platforms you use every day
              </p>
            </div>
            <div className="flex flex-wrap justify-center items-center gap-6 md:gap-12">
              <div className="flex flex-col items-center gap-3 p-4 md:p-6 hover:scale-110 transition-transform">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-blue-50 rounded-2xl flex items-center justify-center border-2 border-blue-100">
                  <Twitter className="w-8 h-8 md:w-10 md:h-10 text-blue-600" />
                </div>
                <span className="font-semibold text-slate-700 text-sm md:text-base">Twitter</span>
              </div>
              <div className="flex flex-col items-center gap-3 p-4 md:p-6 hover:scale-110 transition-transform">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-red-50 rounded-2xl flex items-center justify-center border-2 border-red-100">
                  <Youtube className="w-8 h-8 md:w-10 md:h-10 text-red-600" />
                </div>
                <span className="font-semibold text-slate-700 text-sm md:text-base">YouTube</span>
              </div>
              <div className="flex flex-col items-center gap-3 p-4 md:p-6 hover:scale-110 transition-transform">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-blue-50 rounded-2xl flex items-center justify-center border-2 border-blue-100">
                  <FileText className="w-8 h-8 md:w-10 md:h-10 text-blue-600" />
                </div>
                <span className="font-semibold text-slate-700 text-sm md:text-base">
                  Google Docs
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20 px-6 bg-gradient-to-br from-blue-600 to-blue-700 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Start Building Your Second Brain Today
            </h2>
            <p className="text-lg md:text-xl text-blue-100 mb-10 leading-relaxed">
              Join users who are transforming the way they manage digital
              knowledge. Capture, organize, and never forget important insights
              again.
            </p>
            <button
              onClick={() => navigate("/signup")}
              className="w-full sm:w-auto px-10 py-4 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-all shadow-xl hover:shadow-2xl text-lg cursor-pointer"
            >
              Get Started Free
            </button>
          </div>
        </section>
      </main>

      <footer className="bg-slate-900 text-slate-300 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
            <div className="flex items-center gap-2 justify-center md:justify-start">
              <Brain className="w-6 h-6 text-blue-400" />
              <span className="text-xl font-bold text-white">Alzheimer</span>
            </div>
            <p className="text-sm text-slate-400">
              Your personal knowledge management system
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
