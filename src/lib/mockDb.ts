import { UploadPayload } from "@/services/uploadService";

export type ItineraryWithId = UploadPayload & { id: string };

export const itineraries: ItineraryWithId[] = [];

export function addItinerary(itinerary: ItineraryWithId) {
  itineraries.push(itinerary);
}

export function getItineraries() {
  return itineraries;
}
