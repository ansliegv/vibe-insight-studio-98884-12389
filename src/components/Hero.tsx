import { Button } from "@/components/ui/button";
import { Upload, Sparkles, Brain } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

export const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background with overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroBg}
          alt="AI visualization background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-hero opacity-95" />
      </div>

      {/* Content */}
      <div className="container relative z-10 px-4 py-20">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card/50 backdrop-blur-sm border border-border shadow-soft">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">Multimodal Feedback Analysis</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
            Turn
            <span className="bg-gradient-primary bg-clip-text text-transparent"> Creative Feedback </span>
            Into Actionable Insights
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
            Upload images, videos, or audio. Get AI-powered analysis that reveals emotional reactions, 
            visual preferences, and hidden themes in seconds.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button variant="gradient" size="lg" className="group">
              <Upload className="mr-2 group-hover:scale-110 transition-transform" />
              Start Analyzing
            </Button>
            <Button variant="outline" size="lg">
              <Brain className="mr-2" />
              See How It Works
            </Button>
          </div>

          <div className="pt-8 flex items-center justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-secondary" />
              <span>No setup required</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary" />
              <span>Instant insights</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-accent" />
              <span>AI-powered</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};