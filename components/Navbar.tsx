// Import Link for navigation
import Link from "next/link";

// Navbar component
export default function Navbar() {
  return (
    // Main Navbar
    <nav className="sticky top-0 z-50 border-b border-black/10 bg-[#24395E] shadow-md">

      {/* Navbar Container */}
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

        {/* Logo Section */}
        <div className="flex flex-col">

          {/* Main Brand */}
          <h1 className="text-4xl font-black tracking-tight text-white">
            Secco<span className="text-[#F84A13]">²</span>
          </h1>

          {/* Small Subtitle */}
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-white/70">
            Lead Capture Platform
          </p>
        </div>

        {/* Navigation Links */}
        <div className="flex items-center gap-3">

          {/* Home Link */}
          <Link
            href="/"
            className="rounded-full px-5 py-2 font-semibold text-white transition-all duration-300 hover:bg-white/10"
          >
            Home
          </Link>

          {/* Leads Link */}
          <Link
            href="/leads"
            className="rounded-full bg-[#F84A13] px-5 py-2 font-semibold text-white shadow-md transition-all duration-300 hover:scale-105 hover:bg-[#d93f10]"
          >
            Leads
          </Link>
        </div>
      </div>
    </nav>
  );
}