import { useEffect, useState } from "react";
import Link from "next/link";
import Layout from "@/components/Layout";
import { ItineraryWithId } from "@/lib/mockDb";
import { API_BASE } from "@/config";


export default function ItinerariesPage() {
  const [itineraries, setItineraries] = useState<ItineraryWithId[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchItineraries() {
      const res = await fetch(`${API_BASE}/api/itineraries/`);
      const data = await res.json();
      setItineraries(data);
      setLoading(false);
    }
    fetchItineraries();
  }, []);

    // inside ItinerariesPage:
  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this itinerary?")) return;

    const res = await fetch(`${API_BASE}/api/itineraries/${id}/`, {
      method: "DELETE",
    });

    if (res.ok) {
      // Remove it from local state so the UI updates instantly
      setItineraries(prev => prev.filter(it => it.id !== id));
    } else {
      alert("Failed to delete. Please try again.");
    }
  }

  if(loading) return (
    <p className="text-gray-700 dark:text-gray-300">Loading...</p>
  )
  
  return (
    <Layout>
      <main className="flex flex-col flex-1 px-6 py-16 max-w-4xl mx-auto w-full space-y-8">
        <h1 className="text-4xl font-semibold">Shared Itineraries</h1>

        {itineraries.length === 0 ? (
          <div className="text-center space-y-4 text-gray-700 dark:text-gray-300">
            <p>No itineraries have been shared yet.</p>
            <Link
              href="/upload"
              className="inline-flex items-center bg-orange-500 text-white text-sm font-semibold px-5 py-3 rounded-md hover:bg-orange-600 transition-shadow shadow-md"
            >
              Be the First to Upload
            </Link>
          </div>
        ) : (
          <>
          {itineraries.map((itinerary, idx) => (
            <div key={idx} className="p-6 rounded-xl bg-white dark:bg-gray-900 shadow border border-gray-200 dark:border-gray-800">
              <div className="flex justify-between items-center">
                <Link href={`/itineraries/${itinerary.id}`}>
                  <h2 className="text-xl font-semibold text-sky-600 hover:text-sky-700">
                    {itinerary.title}
                  </h2>
                </Link>
                <button
                  onClick={() => handleDelete(itinerary.id)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </div>
              <p className="text-gray-700 dark:text-gray-300">{itinerary.summary}</p>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Destination: <strong>{itinerary.destination}</strong> | Days: {itinerary.days} | Best time: {itinerary.recommended_time}
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {itinerary.tags.map((tag) => (
                  <span key={tag} className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full">{tag}</span>
                ))}
              </div>
              <div className="mt-4 overflow-x-auto">
                <table className="table-auto min-w-full text-sm border-collapse">
                  <thead className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                    <tr>
                      {Object.keys(itinerary.items[0] || {}).map((key) => (
                        <th key={key} className={`${key === "id" ? "hidden" : ""} border px-3 py-2 text-left`}>{key}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {itinerary.items.slice(0, 3).map((row, rowIndex) => (
                      <tr
                        key={rowIndex}
                        className="even:bg-gray-50 dark:even:bg-gray-800"
                      >
                        {Object.entries(row)
                          .filter(([key]) => key !== "id")       /* drop the id field */
                          .map(([, val], colIndex) => (
                            <td
                              key={colIndex}
                              className="border px-3 py-2 text-gray-700 dark:text-gray-200"
                            >
                              {val}
                            </td>
                          ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Previewing first 3 rows</p>
              </div>
            </div>
          ))}
          </>
        )}
      </main>
    </Layout>
  );
}
