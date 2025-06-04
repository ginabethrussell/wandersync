import Head from "next/head";
import { useState } from "react";
import { useRouter } from "next/router";
import Papa from "papaparse";
import { ItineraryItem, ParsedCSV } from "@/types/itinerary";
import { UploadFormFields } from "@/types/uploadForm";
import { uploadItinerary } from "@/services/uploadService";
import Layout from "@/components/Layout";

const TAG_OPTIONS = ["family", "couple", "solo", "budget", "luxury", "adventure"];
const RECOMMENDED_TIMES = [
  "Winter (Dec–Feb)",
  "Spring (Mar–May)",
  "Summer (Jun–Aug)",
  "Fall (Sep–Nov)",
  "Year-Round",
];

export default function UploadPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    title: "",
    destination: "",
    days: 1,
    summary: "",
    tags: [] as string[],
    recommendedTime: "",
  });

  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [parsedCSV, setParsedCSV] = useState<ItineraryItem[]>([]);
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [serviceError, setServiceError] = useState<string | null>(null);



  const textInputFields: {
    id: keyof UploadFormFields;
    label: string;
    type?: string;
  }[] = [
    { id: "title", label: "Trip Title" },
    { id: "destination", label: "Destination" },
    { id: "days", label: "Number of Days", type: "number" },
  ];

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setFormErrors((prev) => ({ ...prev, [name]: "" }));
  }

  function handleTagToggle(tag: string) {
    setForm((prev) => {
      const tags = prev.tags.includes(tag)
        ? prev.tags.filter((t) => t !== tag)
        : [...prev.tags, tag];
      return { ...prev, tags };
    });
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setFormErrors((prev) => ({ ...prev, csv: "" }));
      setCsvFile(file);
      Papa.parse(file, {
        header: true,
        complete: (results) => {
          const parsed = results.data as ParsedCSV[];
          const requiredCols = ["Day", "Location", "Activity", "Lodging", "Dining", "Notes"];
          const headers = Object.keys(parsed[0] || {});
          const missing = requiredCols.filter(col => !headers.includes(col));
          if (missing.length > 0) {
            alert(`Missing columns: ${missing.join(", ")}`);
            setParsedCSV([]);
          } else {
            // Create a new array where every object’s keys have been lowercased:
            const normalized: ItineraryItem[] = parsed.map(row => ({
              day: row.Day,
              location: row.Location,
              activity: row.Activity,
              lodging: row.Lodging,
              dining: row.Dining,
              notes: row.Notes,
            }));
            setParsedCSV(normalized);
          }
        }
      });
    }
  }

  function validateForm() {
    const newErrors: { [key: string]: string } = {};
    if (!form.title) newErrors.title = "Title is required.";
    if (!form.destination) newErrors.destination = "Destination is required.";
    if (!form.days || form.days < 1) newErrors.days = "Days must be at least 1.";
    if (!form.summary) newErrors.summary = "Summary is required.";
    if (!form.recommendedTime) newErrors.recommendedTime = "Please select a time.";
    if (!csvFile) newErrors.csv = "Please upload a CSV file.";
    setFormErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setServiceError(null);
    if (!validateForm()) return;
    try {
      await uploadItinerary({
        title: form.title,
        destination: form.destination,
        days: Number(form.days),
        summary: form.summary,
        recommended_time: form.recommendedTime,
        tags: form.tags,
        items: parsedCSV,
      });

      router.push("/success");
    } catch (error) {
      if (error instanceof Error) {
        console.error("Upload failed:", error);
        setServiceError(error.message || "Something went wrong. Please try again.");
      } else {
        console.error("Unknown error:", error);
        setServiceError("Something went wrong. Please try again.");
      }
    }
  }

  return (
    <Layout showFooter={false}>
      <Head>
        <title>Upload Itinerary — WanderSync</title>
      </Head>
      <div className="min-h-screen bg-gray-50 dark:bg-black py-10 px-4">
        <main className="max-w-2xl mx-auto p-8 sm:p-10 lg:p-12 bg-white dark:bg-gray-900 rounded-xl shadow-md">

          <h1 className="text-4xl font-semibold mb-6 text-center text-gray-800 dark:text-white">Share Your Trip</h1>
          <form onSubmit={handleSubmit} className="space-y-8">

            {textInputFields.map(({ id, label, type = "text" }) => (
              <div key={id}>
                <label htmlFor={id} className="block text-sm font-semibold mb-1 text-gray-700 dark:text-gray-300">{label}</label>
                <input
                  type={type}
                  id={id}
                  name={id}
                  value={form[id]}
                  onChange={handleChange}
                  className="w-full border px-4 py-2 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {formErrors[id] && <p className="text-red-500 text-sm mt-1">{formErrors[id]}</p>}
              </div>
            ))}

            <div>
              <label htmlFor="summary" className="block text-sm font-semibold mb-1 text-gray-700 dark:text-gray-300">Trip Summary</label>
              <textarea
                id="summary"
                name="summary"
                value={form.summary}
                onChange={handleChange}
                rows={4}
                className="w-full border px-4 py-2 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {formErrors.summary && <p className="text-red-500 text-sm mt-1">{formErrors.summary}</p>}
            </div>

            <div>
              <label htmlFor="recommendedTime" className="block text-sm font-semibold mb-1 text-gray-700 dark:text-gray-300">Recommended Time to Go</label>
              <select
                id="recommendedTime"
                name="recommendedTime"
                value={form.recommendedTime}
                onChange={handleChange}
                className="w-full border px-4 py-2 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select...</option>
                {RECOMMENDED_TIMES.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
              {formErrors.recommendedTime && <p className="text-red-500 text-sm mt-1">{formErrors.recommendedTime}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">Tags</label>
              <div className="flex flex-wrap gap-3">
                {TAG_OPTIONS.map(tag => (
                  <label key={tag} className="flex items-center gap-2 text-sm text-gray-800 dark:text-gray-200">
                    <input
                      type="checkbox"
                      checked={form.tags.includes(tag)}
                      onChange={() => handleTagToggle(tag)}
                      className="accent-blue-600"
                    />
                    <span className="capitalize">{tag}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <div className="flex flex-col gap-1">
                <span className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Upload Itinerary
                </span>
                <label
                  htmlFor="csv"
                  className="inline-block cursor-pointer px-4 py-2 bg-gray-200 dark:bg-gray-700 text-sm rounded hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-white"
                >
                  {csvFile ? csvFile.name : "Choose File"}
                </label>
              </div>
              <input
                id="csv"
                name="csv"
                type="file"
                accept=".csv"
                onChange={handleFileChange}
                className="hidden"
              />
              <a href="/itinerary-template.csv" download className="text-sm text-blue-600 hover:text-blue-800 underline mt-2 block">Download CSV Template</a>
              {formErrors.csv && <p className="text-red-500 text-sm mt-1">{formErrors.csv}</p>}
              {parsedCSV.length > 0 && (
                <div className="overflow-x-auto mt-6">
                  <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">
                    Itinerary Preview
                  </h3>
                  <table className="min-w-full table-auto text-sm">
                    <thead className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                      <tr>
                        {Object.keys(parsedCSV[0]).map((key) => (
                          <th key={key} className="px-3 py-2 border-b font-medium text-left">{key}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {parsedCSV.slice(0, 5).map((row, rowIndex) => (
                        <tr key={rowIndex} className="even:bg-gray-50 dark:even:bg-gray-800">
                          {Object.values(row).map((val, colIndex) => (
                            <td key={colIndex} className="px-3 py-2 border-b text-gray-700 dark:text-gray-200">{val}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <p className="text-xs text-gray-500 dark:text-gray-400 px-2 py-1">Showing first 5 rows</p>
                </div>
              )}
            </div>
            {serviceError && (
              <div className="text-red-500 bg-red-50 border border-red-200 p-3 rounded mb-4 text-sm">
                {serviceError}
              </div>
            )}
            <div className="flex justify-between items-center gap-4">
              <button
                type="button"
                onClick={() => router.push("/")}
                className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-3 px-4 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
              >
                Submit Itinerary
              </button>
            </div>
          </form>
        </main>
      </div>
    </Layout>
  );
}
