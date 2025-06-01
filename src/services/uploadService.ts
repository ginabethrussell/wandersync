import { ItineraryItem } from "@/types/itinerary";

export type UploadPayload = {
  title: string;
  destination: string;
  days: number;
  summary: string;
  tags: string[];
  recommendedTime: string;
  csv: ItineraryItem[];
};

export async function uploadItinerary(data: UploadPayload): Promise<void> {
  const response = await fetch("/api/itinerary", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Upload failed");
  }
}
