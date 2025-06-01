import { ItineraryMetadata } from "@/types/itinerary";

export async function fetchItineraries(): Promise<ItineraryMetadata[]> {
  const response = await fetch("/api/itinerary", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Fetch failed");
  }
  return response.json()
}

export async function fetchItineraryById(id: number): Promise<ItineraryMetadata> {
  const response = await fetch(`/api/itinerary/${id}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Fetch failed");
  }
  return response.json()
}
