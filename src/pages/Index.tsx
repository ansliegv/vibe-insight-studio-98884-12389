import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare, BarChart3, ArrowRight } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-hero">
      <div className="container mx-auto px-4 py-16 max-w-6xl">
        <header className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Vibe Insight Studio
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Capture multimodal feedback and unlock deep AI-powered insights
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card className="p-8 hover:shadow-medium transition-shadow cursor-pointer group" onClick={() => navigate("/respond")}>
            <div className="flex flex-col items-center text-center space-y-6">
              <div className="p-6 bg-primary/10 rounded-2xl group-hover:bg-primary/20 transition-colors">
                <MessageSquare className="w-12 h-12 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-3">Share Feedback</h2>
                <p className="text-muted-foreground mb-6">
                  Provide your responses through text, images, videos, or audio
                </p>
              </div>
              <Button className="w-full group-hover:shadow-soft">
                Start Responding
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </Card>

          <Card className="p-8 hover:shadow-medium transition-shadow cursor-pointer group" onClick={() => navigate("/analyze")}>
            <div className="flex flex-col items-center text-center space-y-6">
              <div className="p-6 bg-secondary/10 rounded-2xl group-hover:bg-secondary/20 transition-colors">
                <BarChart3 className="w-12 h-12 text-secondary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-3">Analyze Insights</h2>
                <p className="text-muted-foreground mb-6">
                  Explore AI-generated insights, themes, and sentiment analysis
                </p>
              </div>
              <Button variant="secondary" className="w-full group-hover:shadow-soft">
                View Dashboard
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
