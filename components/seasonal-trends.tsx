"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TrendingUp, Calendar, Palette, Package } from "lucide-react"
import { getSeasonalTrends, type SeasonalTrend } from "@/lib/ai-services"
import { useLanguage } from "@/contexts/language-context"

export function SeasonalTrends() {
  const [trends, setTrends] = useState<SeasonalTrend[]>([])
  const [loading, setLoading] = useState(true)
  const { language } = useLanguage()

  useEffect(() => {
    loadTrends()
  }, [])

  const loadTrends = async () => {
    setLoading(true)
    try {
      const trendsData = await getSeasonalTrends()
      setTrends(trendsData)
    } catch (error) {
      console.error("Error loading trends:", error)
    } finally {
      setLoading(false)
    }
  }

  const getDemandColor = (demand: string) => {
    switch (demand) {
      case "high":
        return "bg-green-100 text-green-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center">Loading seasonal trends...</div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center space-x-2">
            <TrendingUp className="h-6 w-6 text-primary" />
            <span>{language === "hi" ? "मौसमी रुझान" : "Seasonal Trends"}</span>
          </h2>
          <p className="text-muted-foreground mt-1">
            {language === "hi"
              ? "आगामी त्योहारों और बाजार के रुझान के आधार पर AI-संचालित सुझाव"
              : "AI-powered suggestions based on upcoming festivals and market trends"}
          </p>
        </div>
        <Button variant="outline" onClick={loadTrends}>
          {language === "hi" ? "रिफ्रेश करें" : "Refresh"}
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {trends.map((trend, index) => (
          <Card key={index} className="relative overflow-hidden">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  <span>{trend.festival}</span>
                </CardTitle>
                <Badge className={getDemandColor(trend.demand)}>
                  {trend.demand === "high"
                    ? language === "hi"
                      ? "उच्च"
                      : "High"
                    : trend.demand === "medium"
                      ? language === "hi"
                        ? "मध्यम"
                        : "Medium"
                      : language === "hi"
                        ? "कम"
                        : "Low"}{" "}
                  Demand
                </Badge>
              </div>
              <CardDescription>{trend.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <Package className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">
                    {language === "hi" ? "सुझाए गए उत्पाद" : "Suggested Products"}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {trend.products.map((product, idx) => (
                    <Badge key={idx} variant="secondary" className="text-xs">
                      {product}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <Palette className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">{language === "hi" ? "ट्रेंडिंग रंग" : "Trending Colors"}</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {trend.colors.map((color, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs">
                      {color}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-sm font-medium">{language === "hi" ? "सामग्री" : "Materials"}</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {trend.materials.map((material, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs">
                      {material}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
