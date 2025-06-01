import { NextApiRequest, NextApiResponse } from "next";
import { ItineraryMetadata } from "@/types/itinerary";
import { addItinerary, getItineraries, ItineraryWithId } from "@/lib/mockDb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const body = req.body as ItineraryMetadata;

      if (
        !body.title ||
        !body.destination ||
        !body.days ||
        !body.summary ||
        !body.csv?.length
      ) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      const newItinerary: ItineraryWithId = {
        ...body,
        id: crypto.randomUUID(),
      };
      addItinerary(newItinerary);
      console.log("📥 Saved itinerary:", newItinerary.title);
      return res.status(200).json({ message: "Itinerary uploaded successfully!", id: newItinerary.id });
    } catch (error) {
      console.error("❌ Upload error:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  if (req.method === "GET") {
    return res.status(200).json(getItineraries());
  }

  return res.status(405).json({ message: "Method not allowed" });
}
