import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 border-t border-gray-800 text-gray-200 font-jost">
      <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Branding */}
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-indigo-400">Inkwave</span>
          <span className="hidden md:inline text-gray-400 text-sm ml-2">- Ride the wave of words</span>
        </div>
        {/* Copyright & Author */}
        <div className="flex items-center gap-2 text-sm">
          <span>&copy; {new Date().getFullYear()} Inkwave. All rights reserved.</span>
          <span className="mx-2 hidden sm:inline">|</span>
          <span>
            Made by{' '}
            <Link
              href="https://github.com/CodeFusionEhsan"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-400 hover:underline font-semibold"
            >
              Ehsan Saleem
            </Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
