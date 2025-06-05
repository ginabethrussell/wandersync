import { ItineraryItem } from "@/types/itinerary";
import { API_BASE } from "../config";

export type UploadPayload = {
  title: string;
  destination: string;
  days: number;
  summary: string;
  tags: string[];
  recommended_time: string;
  items: ItineraryItem[];
};

export async function uploadItinerary(data: UploadPayload): Promise<void> {
  const response = await fetch(`${API_BASE}/api/itineraries/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Upload failed");
  }
}
