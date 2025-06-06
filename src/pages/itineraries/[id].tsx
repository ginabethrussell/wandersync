import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { API_BASE } from "../../config";
import { ItineraryWithId } from "@/lib/mockDb";
import Layout from "@/components/Layout";
import ItineraryCard from "@/components/IntineraryCard";

export default function ItineraryDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const [itinerary, setItinerary] = useState<ItineraryWithId | null>(null);

  useEffect(() => {
    if (!id) return;
    fetch(`${API_BASE}/api/itineraries/${id}/`)
      .then((res) => res.json())
      .then(setItinerary)
      .catch((err) => console.error("Failed to fetch itinerary", err));
  }, [id]);

    // inside ItineraryDetailPage:
  async function handleDelete() {
    if (!confirm("Are you sure you want to delete this entire itinerary?")) return;

    const res = await fetch(
      `${API_BASE}/api/itineraries/${id}/`,
      { method: "DELETE" }
    );

    if (res.ok) {
      // After deletion, redirect back to list or home
      router.push("/itineraries");
    } else {
      alert("Failed to delete. Please try again.");
    }
  }

  if (!itinerary) return <p className="text-center mt-10">Loading...</p>;

  return (
    <Layout showFooter={false}>
      <div className="max-w-3xl mx-auto py-10 px-4">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold mb-2">{itinerary.title}</h1>
          <button
            onClick={handleDelete}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
          >
            Delete
          </button>
        </div>
        <p className="text-gray-600 mb-4">
          {itinerary.destination} • {itinerary.days} days
        </p>
        <ItineraryCard itinerary={itinerary}/>
      </div>
    </Layout>
  );
}
