import Link from "next/link";
import LogoHeader from "./LogoHeader";

export default function Header() {
  return (
    <header className="h-[120px] px-8 py-3 flex items-center justify-between border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm">
      <LogoHeader />
      <nav className="flex gap-6 text-base font-medium">
        <Link href="/upload" className="hover:text-orange-600 transition-colors">
          Upload
        </Link>
        <Link href="/itineraries" className="hover:text-orange-600 transition-colors">
          Itineraries
        </Link>
      </nav>
    </header>
  )
};
