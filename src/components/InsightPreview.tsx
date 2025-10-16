import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Users, Smile, Heart } from "lucide-react";

const sampleInsights = [
  {
    title: "Product Packaging Test",
    sentiment: "Positive",
    tags: ["modern", "clean", "professional"],
    emotion: "confident",
    score: 87,
    icon: Smile,
    color: "text-green-500",
  },
  {
    title: "Ad Creative Analysis",
    sentiment: "Mixed",
    tags: ["colorful", "energetic", "busy"],
    emotion: "excited",
    score: 72,
    icon: TrendingUp,
    color: "text-amber-500",
  },
  {
    title: "Voice Testimonial",
    sentiment: "Very Positive",
    tags: ["authentic", "enthusiastic", "grateful"],
    emotion: "joyful",
    score: 94,
    icon: Heart,
    color: "text-rose-500",
  },
];

export const InsightPreview = () => {
  return (
    <section className="py-24 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            AI-Powered
            <span className="bg-gradient-primary bg-clip-text text-transparent"> Insights</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See how AI transforms raw feedback into actionable intelligence
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {sampleInsights.map((insight, index) => (
            <Card
              key={index}
              className="p-6 hover:shadow-medium transition-all duration-300 hover:-translate-y-1 bg-gradient-card backdrop-blur-sm"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-soft`}>
                  <insight.icon className="w-6 h-6 text-white" />
                </div>
                <Badge
                  variant="outline"
                  className={`${insight.color} border-current`}
                >
                  {insight.score}% confidence
                </Badge>
              </div>

              <h3 className="text-lg font-semibold mb-2">{insight.title}</h3>
              
              <div className="space-y-3">
                <div>
                  <span className="text-sm text-muted-foreground">Sentiment:</span>
                  <p className="font-medium">{insight.sentiment}</p>
                </div>

                <div>
                  <span className="text-sm text-muted-foreground">Emotion:</span>
                  <p className="font-medium capitalize">{insight.emotion}</p>
                </div>

                <div>
                  <span className="text-sm text-muted-foreground block mb-2">
                    AI Tags:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {insight.tags.map((tag, tagIndex) => (
                      <Badge key={tagIndex} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground text-sm">
            * Sample insights shown. Real analysis powered by GPT-4V, CLIP, and Whisper
          </p>
        </div>
      </div>
    </section>
  );
};