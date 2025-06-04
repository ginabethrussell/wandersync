import { ItineraryMetadata } from "@/types/itinerary";

const API_BASE = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function fetchItineraries(): Promise<ItineraryMetadata[]> {
  const response = await fetch(`${API_BASE}/api/itineraries/`, {
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
  const response = await fetch(`${API_BASE}/api/itineraries/${id}/`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Fetch failed");
  }
  return response.json()
}
