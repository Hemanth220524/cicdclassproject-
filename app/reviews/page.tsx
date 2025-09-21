"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Star, Search, Filter } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Review {
  id: number
  reviewer_id: number
  reviewee_id: number
  project_id: number
  overall_rating: number
  skills_rating?: number
  communication_rating?: number
  quality_rating?: number
  timeliness_rating?: number
  comment: string
  created_at: string
  reviewer_name: string
  reviewer_avatar: string
  reviewee_name?: string
  reviewee_avatar?: string
  project_title: string
}

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [ratingFilter, setRatingFilter] = useState<string>("all")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // For demo purposes, we'll show all reviews
    // In a real app, you'd typically show reviews for the current user
    fetchReviews()
  }, [])

  const fetchReviews = async () => {
    try {
      // This would need to be modified to get reviews for the current user
      // For now, we'll show a placeholder
      setReviews([])
    } catch (error) {
      console.error("Error fetching reviews:", error)
    } finally {
      setLoading(false)
    }
  }

  const StarRating = ({ rating, size = "sm" }: { rating: number; size?: "sm" | "lg" }) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${size === "lg" ? "h-5 w-5" : "h-4 w-4"} ${
              star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
            }`}
          />
        ))}
        <span className={`${size === "lg" ? "text-lg" : "text-sm"} font-medium ml-1`}>{rating.toFixed(1)}</span>
      </div>
    )
  }

  const ReviewForm = () => {
    const [formData, setFormData] = useState({
      reviewee_id: "",
      project_id: "",
      overall_rating: 5,
      skills_rating: 5,
      communication_rating: 5,
      quality_rating: 5,
      timeliness_rating: 5,
      comment: "",
    })
    const [submitting, setSubmitting] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault()
      setSubmitting(true)

      try {
        const response = await fetch("/api/reviews", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        })

        if (response.ok) {
          fetchReviews()
          setFormData({
            reviewee_id: "",
            project_id: "",
            overall_rating: 5,
            skills_rating: 5,
            communication_rating: 5,
            quality_rating: 5,
            timeliness_rating: 5,
            comment: "",
          })
        }
      } catch (error) {
        console.error("Error submitting review:", error)
      } finally {
        setSubmitting(false)
      }
    }

    const RatingInput = ({
      label,
      value,
      onChange,
    }: {
      label: string
      value: number
      onChange: (value: number) => void
    }) => (
      <div className="space-y-2">
        <label className="text-sm font-medium">{label}</label>
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button key={star} type="button" onClick={() => onChange(star)} className="focus:outline-none">
              <Star
                className={`h-6 w-6 ${
                  star <= value ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                } hover:text-yellow-400 transition-colors`}
              />
            </button>
          ))}
          <span className="ml-2 text-sm text-gray-600">{value}/5</span>
        </div>
      </div>
    )

    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button>Write Review</Button>
        </DialogTrigger>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Write a Review</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Project</label>
              <Select
                value={formData.project_id}
                onValueChange={(value) => setFormData({ ...formData, project_id: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a completed project" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Sample Project 1</SelectItem>
                  <SelectItem value="2">Sample Project 2</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <RatingInput
              label="Overall Rating"
              value={formData.overall_rating}
              onChange={(value) => setFormData({ ...formData, overall_rating: value })}
            />

            <RatingInput
              label="Skills"
              value={formData.skills_rating}
              onChange={(value) => setFormData({ ...formData, skills_rating: value })}
            />

            <RatingInput
              label="Communication"
              value={formData.communication_rating}
              onChange={(value) => setFormData({ ...formData, communication_rating: value })}
            />

            <RatingInput
              label="Quality"
              value={formData.quality_rating}
              onChange={(value) => setFormData({ ...formData, quality_rating: value })}
            />

            <RatingInput
              label="Timeliness"
              value={formData.timeliness_rating}
              onChange={(value) => setFormData({ ...formData, timeliness_rating: value })}
            />

            <div className="space-y-2">
              <label className="text-sm font-medium">Comment</label>
              <Textarea
                placeholder="Share your experience working with this person..."
                value={formData.comment}
                onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                rows={4}
              />
            </div>

            <Button type="submit" disabled={submitting} className="w-full">
              {submitting ? "Submitting..." : "Submit Review"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    )
  }

  const filteredReviews = reviews.filter((review) => {
    const matchesSearch =
      review.reviewer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.project_title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.comment.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesRating =
      ratingFilter === "all" ||
      (ratingFilter === "5" && review.overall_rating === 5) ||
      (ratingFilter === "4" && review.overall_rating >= 4 && review.overall_rating < 5) ||
      (ratingFilter === "3" && review.overall_rating >= 3 && review.overall_rating < 4) ||
      (ratingFilter === "2" && review.overall_rating >= 2 && review.overall_rating < 3) ||
      (ratingFilter === "1" && review.overall_rating >= 1 && review.overall_rating < 2)

    return matchesSearch && matchesRating
  })

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Reviews</h1>
          <p className="text-gray-600">Manage and view project reviews</p>
        </div>
        <ReviewForm />
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search reviews..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-gray-400" />
              <Select value={ratingFilter} onValueChange={setRatingFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Ratings</SelectItem>
                  <SelectItem value="5">5 Stars</SelectItem>
                  <SelectItem value="4">4+ Stars</SelectItem>
                  <SelectItem value="3">3+ Stars</SelectItem>
                  <SelectItem value="2">2+ Stars</SelectItem>
                  <SelectItem value="1">1+ Stars</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Reviews List */}
      {filteredReviews.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <Star className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Reviews Yet</h3>
            <p className="text-gray-600 mb-4">
              Complete projects to start receiving reviews from clients and freelancers.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredReviews.map((review) => (
            <Card key={review.id}>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={review.reviewer_avatar || "/placeholder.svg"} />
                    <AvatarFallback>{review.reviewer_name.charAt(0).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h3 className="font-medium text-gray-900">{review.reviewer_name}</h3>
                        <Badge variant="secondary" className="text-xs">
                          {review.project_title}
                        </Badge>
                      </div>
                      <span className="text-sm text-gray-500">
                        {formatDistanceToNow(new Date(review.created_at), { addSuffix: true })}
                      </span>
                    </div>

                    <div className="mb-3">
                      <StarRating rating={review.overall_rating} size="lg" />
                    </div>

                    {(review.skills_rating ||
                      review.communication_rating ||
                      review.quality_rating ||
                      review.timeliness_rating) && (
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4 text-sm">
                        {review.skills_rating && (
                          <div>
                            <span className="text-gray-600">Skills:</span>
                            <StarRating rating={review.skills_rating} />
                          </div>
                        )}
                        {review.communication_rating && (
                          <div>
                            <span className="text-gray-600">Communication:</span>
                            <StarRating rating={review.communication_rating} />
                          </div>
                        )}
                        {review.quality_rating && (
                          <div>
                            <span className="text-gray-600">Quality:</span>
                            <StarRating rating={review.quality_rating} />
                          </div>
                        )}
                        {review.timeliness_rating && (
                          <div>
                            <span className="text-gray-600">Timeliness:</span>
                            <StarRating rating={review.timeliness_rating} />
                          </div>
                        )}
                      </div>
                    )}

                    <p className="text-gray-700">{review.comment}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
