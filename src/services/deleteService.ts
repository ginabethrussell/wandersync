import { ItineraryMetadata } from "@/types/itinerary";
import { API_BASE } from "../config";

export async function deleteItineraryById(id: number): Promise<ItineraryMetadata> {
  const response = await fetch(`${API_BASE}/api/itineraries/${id}/`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Fetch failed");
  }
  return response.json()
}
