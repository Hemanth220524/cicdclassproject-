"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"

interface ReviewSummaryProps {
  averageRating: number
  totalReviews: number
  ratingBreakdown?: {
    5: number
    4: number
    3: number
    2: number
    1: number
  }
}

export function ReviewSummary({ averageRating, totalReviews, ratingBreakdown }: ReviewSummaryProps) {
  const StarRating = ({ rating }: { rating: number }) => (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`h-5 w-5 ${star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
        />
      ))}
    </div>
  )

  return (
    <Card>
      <CardContent className="p-6">
        <div className="text-center mb-6">
          <div className="text-4xl font-bold text-gray-900 mb-2">{averageRating.toFixed(1)}</div>
          <StarRating rating={averageRating} />
          <p className="text-gray-600 mt-2">
            Based on {totalReviews} review{totalReviews !== 1 ? "s" : ""}
          </p>
        </div>

        {ratingBreakdown && (
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((rating) => (
              <div key={rating} className="flex items-center gap-3">
                <span className="text-sm font-medium w-8">{rating}</span>
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-yellow-400 h-2 rounded-full"
                    style={{
                      width: `${totalReviews > 0 ? (ratingBreakdown[rating as keyof typeof ratingBreakdown] / totalReviews) * 100 : 0}%`,
                    }}
                  />
                </div>
                <span className="text-sm text-gray-600 w-8">
                  {ratingBreakdown[rating as keyof typeof ratingBreakdown]}
                </span>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
