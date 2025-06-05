import { ItineraryMetadata } from "@/types/itinerary";
import { API_BASE } from "../config";

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
