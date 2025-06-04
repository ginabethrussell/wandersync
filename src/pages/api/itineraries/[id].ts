import { NextApiRequest, NextApiResponse } from "next";
import { getItineraries } from "@/lib/mockDb";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const itineraries = getItineraries();

  if (req.method === "GET") {
    const itinerary = itineraries.find((i) => i.id === id);
    if (!itinerary) return res.status(404).json({ message: "Not found" });
    return res.status(200).json(itinerary);
  }
  res.status(405).end();
}
