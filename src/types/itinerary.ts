export type ParsedCSV = {
  Day: string;
  Location: string;
  Activity: string;
  Lodging: string;
  Dining: string;
  Notes: string;
}

export type ItineraryItem = {
  day: string;
  location: string;
  activity: string;
  lodging: string;
  dining: string;
  notes: string;
};

export type ItineraryMetadata = {
  title: string;
  destination: string;
  days: number;
  summary: string;
  tags: string[];
  recommended_time: string;
  items: ItineraryItem[];
};
