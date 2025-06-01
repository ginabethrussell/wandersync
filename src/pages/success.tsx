import Link from "next/link";
import Layout from "@/components/Layout";

export default function SuccessPage() {
  return (
    <Layout>
      <main className="flex flex-col items-center justify-center flex-1 px-6 py-16">
        <div className="max-w-md text-center space-y-6 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-semibold text-green-600">
            🎉 Success!
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Your itinerary has been uploaded. Thanks for sharing with the community!
          </p>
          <Link
            href="/itineraries"
            className="inline-flex items-center bg-orange-500 text-white text-sm font-semibold px-5 py-3 rounded-md hover:bg-orange-600 transition-shadow shadow-md"
          >
            Browse Itineraries
          </Link>
        </div>
      </main>
    </Layout>
  );
}
