import { ItineraryWithId } from "@/lib/mockDb";

type Props = {
  itinerary: ItineraryWithId;
};

export default function ItineraryCard({ itinerary }: Props) {
  const { title, destination, days, summary, recommended_time, tags, items } = itinerary;

  return (
    <article className="bg-white dark:bg-gray-900 shadow rounded-lg p-6 space-y-4">
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">{title}</h2>
      <p className="text-gray-600 dark:text-gray-300">
        <strong>Destination:</strong> {destination} • <strong>Days:</strong> {days}
      </p>
      <p className="text-gray-700 dark:text-gray-300">{summary}</p>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Recommended: {recommended_time} • Tags: {tags.join(", ")}
      </p>

      {items?.length > 0 && (
        <div className="overflow-x-auto">
          <table className="table-auto w-full text-sm mt-2 border border-gray-200 dark:border-gray-700">
            <thead className="bg-gray-100 dark:bg-gray-700 text-left">
              <tr>
                {Object.keys(items[0]).map((key) => (
                  <th key={key} className="px-3 py-2 border-b font-medium text-gray-800 dark:text-gray-200">
                    {key}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {items.map((row, rowIndex) => (
                <tr key={rowIndex} className="even:bg-gray-50 dark:even:bg-gray-800">
                  {Object.values(row).map((val, colIndex) => (
                    <td key={colIndex} className="px-3 py-2 border-b text-gray-700 dark:text-gray-200">
                      {val}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </article>
  );
}
