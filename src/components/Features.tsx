import { Card } from "@/components/ui/card";
import { Image, Video, Mic, Sparkles, BarChart3, Search } from "lucide-react";

const features = [
  {
    icon: Image,
    title: "Image Analysis",
    description: "Upload product shots, ads, or designs. AI detects objects, emotions, and visual preferences.",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    icon: Video,
    title: "Video Insights",
    description: "Analyze user reactions and testimonials. Extract key moments and sentiment patterns.",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: Mic,
    title: "Audio Processing",
    description: "Transcribe and analyze tone, emotion, and key themes from voice feedback.",
    gradient: "from-green-500 to-teal-500",
  },
  {
    icon: Sparkles,
    title: "Auto Tagging",
    description: "AI automatically identifies themes, emotions, and key attributes without manual work.",
    gradient: "from-amber-500 to-orange-500",
  },
  {
    icon: BarChart3,
    title: "Thematic Clustering",
    description: "Group similar responses and discover patterns across all your feedback.",
    gradient: "from-violet-500 to-purple-500",
  },
  {
    icon: Search,
    title: "Smart Search",
    description: "Compare sentiment across creatives and find exactly what you're looking for.",
    gradient: "from-pink-500 to-rose-500",
  },
];

export const Features = () => {
  return (
    <section className="py-24 px-4">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Multimodal Analysis,
            <span className="bg-gradient-primary bg-clip-text text-transparent"> Simplified</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Everything you need to extract meaningful insights from creative feedback, 
            powered by state-of-the-art AI models.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="p-6 hover:shadow-medium transition-all duration-300 hover:-translate-y-1 border-border/50 backdrop-blur-sm bg-gradient-card"
            >
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 shadow-soft`}>
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};