import { SeasonalTrends } from "@/components/seasonal-trends"

export default function TrendsPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <SeasonalTrends />
      </div>
    </div>
  )
}
