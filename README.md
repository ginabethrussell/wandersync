# 🌍 WanderSync

WanderSync is a simple, collaborative platform for sharing travel itineraries. Upload your trip as a CSV and instantly unlock inspiration from other explorers — all for free.

## ✨ Features

- Upload travel itineraries as CSV files
- Auto-preview uploaded trips before submission
- Add trip summary, tags (family, couple, solo, etc.), and recommended travel time
- View all submitted itineraries
- Click into detailed daily plans
- Responsive design using Tailwind CSS
- Lightweight, in-memory backend for fast prototyping

## 🛠 Tech Stack

- **Frontend**: Next.js, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API routes (simulated in-memory DB)
- **CSV Parsing**: [PapaParse](https://www.papaparse.com/)
- **Deployment**: [Vercel](https://vercel.com/)

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/your-username/wandersync.git
cd wandersync
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run the development server
```bash
npm run dev
```
Visit http://localhost:3000 to view it in the browser.

## 📁 File Structure

src/
├── components/        // Reusable UI components (e.g. Layout, Logo, ItineraryCard)
├── data/              // In-memory mock database
├── pages/             // Next.js pages and API routes
│   ├── api/           // Upload and fetch itineraries
│   ├── itineraries/   // Dynamic detail pages by ID
│   └── upload.tsx     // Form for uploading itineraries
├── services/          // Frontend service for posting data
├── types/             // Shared TypeScript types
└── styles/            // Tailwind config and global styles

## 🧪 Sample CSV Format

```sql
Day,Location,Activity,Lodging,Dining,Notes
```
You can download a template directly from the app.

## 📦 Deployment

This app is ready to deploy on Vercel. Just push to GitHub and import the repo in Vercel to go live.

## 📄 License

MIT — free to use, modify, and deploy.

Built with ❤️ by travel lovers.
