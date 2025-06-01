export type ItineraryItem = {
  Day: string;
  Location: string;
  Activity: string;
  Lodging: string;
  Dining: string;
  Notes: string;
};

export type ItineraryMetadata = {
  title: string;
  destination: string;
  days: number;
  summary: string;
  tags: string[];
  recommendedTime: string;
  csv: ItineraryItem[];
};
