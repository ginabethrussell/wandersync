import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ItineraryWithId } from "@/lib/mockDb";
import Layout from "@/components/Layout";
import ItineraryCard from "@/components/IntineraryCard";

export default function ItineraryDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const [itinerary, setItinerary] = useState<ItineraryWithId | null>(null);

  useEffect(() => {
    if (!id) return;
    fetch(`/api/itinerary/${id}`)
      .then((res) => res.json())
      .then(setItinerary)
      .catch((err) => console.error("Failed to fetch itinerary", err));
  }, [id]);

  if (!itinerary) return <p className="text-center mt-10">Loading...</p>;

  return (
    <Layout showFooter={false}>
      <div className="max-w-3xl mx-auto py-10 px-4">
        <h1 className="text-3xl font-bold mb-2">{itinerary.title}</h1>
        <p className="text-gray-600 mb-4">
          {itinerary.destination} • {itinerary.days} days
        </p>
        <ItineraryCard itinerary={itinerary}/>
      </div>
    </Layout>
  );
}
