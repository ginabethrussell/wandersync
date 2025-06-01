import Link from "next/link";
import Layout from "@/components/Layout";

export default function Home() {
  return (
    <Layout>
      <main className="flex flex-col gap-6 px-8 py-16 max-w-3xl mx-auto w-full">
        <h1 className="text-5xl font-semibold leading-tight">
          Welcome to <span className="text-accent">WanderSync</span>
        </h1>
        <p className="text-2xlg text-gray-700 dark:text-gray-300 max-w-prose">
          Share your favorite travel itineraries. Unlock inspiration from other explorers — all for free.
        </p>
        <div className="flex justify-end">
          <Link
            href="/upload"
            className="inline-flex items-center bg-orange-500 text-white text-sm font-semibold px-5 py-3 rounded-md hover:bg-orange-600 transition-shadow shadow-md w-fit"
          >
            Upload Your First Itinerary
          </Link>
        </div>
      </main>
    </Layout>
  );
}
