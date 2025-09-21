import { Card, CardContent } from "@/components/ui/card"
import { Search, MessageSquare, CheckCircle, CreditCard } from "lucide-react"

const steps = [
  {
    icon: Search,
    title: "Post Your Project",
    description: "Describe your project requirements and get proposals from qualified freelancers within hours.",
  },
  {
    icon: MessageSquare,
    title: "Review & Hire",
    description: "Compare proposals, interview candidates, and hire the perfect freelancer for your project.",
  },
  {
    icon: CheckCircle,
    title: "Work Together",
    description: "Collaborate with your freelancer using our built-in tools and track project progress.",
  },
  {
    icon: CreditCard,
    title: "Pay Securely",
    description: "Release payments safely through our escrow system when milestones are completed.",
  },
]

export function HowItWorks() {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4 font-serif">How It Works</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Get your project done in four simple steps</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <step.icon className="h-8 w-8 text-secondary" />
                </div>
                <div className="w-8 h-8 bg-secondary text-secondary-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-sm font-bold">
                  {index + 1}
                </div>
                <h3 className="font-semibold text-lg mb-3">{step.title}</h3>
                <p className="text-muted-foreground text-sm">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
