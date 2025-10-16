import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, TrendingUp, Eye, Heart, AlertCircle } from "lucide-react";

interface InsightsDisplayProps {
  data: any;
  onBack: () => void;
}

const InsightsDisplay = ({ data, onBack }: InsightsDisplayProps) => {
  // Mock AI-generated insights
  const mockInsights = {
    sentiment: {
      overall: "Positive",
      score: 0.78,
      distribution: { positive: 65, neutral: 25, negative: 10 }
    },
    visualAnalysis: {
      dominantColors: ["#6366F1", "#EC4899", "#F59E0B"],
      detectedObjects: ["Product packaging", "Logo", "Text overlay"],
      emotionalTone: "Energetic and Modern"
    },
    themes: [
      { theme: "Color Contrast", mentions: 12, sentiment: "positive" },
      { theme: "Readability", mentions: 8, sentiment: "mixed" },
      { theme: "Brand Recognition", mentions: 15, sentiment: "positive" },
      { theme: "Visual Appeal", mentions: 10, sentiment: "positive" }
    ],
    keyFindings: [
      "85% of respondents found the packaging modern and appealing",
      "Color contrast received consistently positive feedback",
      "Some users mentioned text readability could be improved in smaller sizes",
      "Strong brand recognition with 92% correctly identifying the logo"
    ]
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <Button onClick={onBack} variant="outline" className="mb-4">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Form
      </Button>

      <Card className="p-6 border-primary/20 shadow-lg">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-primary/10 rounded-lg">
            <TrendingUp className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">AI-Generated Insights</h2>
            <p className="text-sm text-muted-foreground">
              Analysis completed • {data.files.length} files • {new Date(data.timestamp).toLocaleString()}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Sentiment Analysis */}
          <Card className="p-5 bg-gradient-to-br from-background to-primary/5">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Heart className="w-5 h-5 text-primary" />
              Sentiment Analysis
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span>Overall Sentiment:</span>
                <Badge className="bg-green-500/20 text-green-700 hover:bg-green-500/30">
                  {mockInsights.sentiment.overall}
                </Badge>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Positive</span>
                  <span className="font-semibold">{mockInsights.sentiment.distribution.positive}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full" 
                    style={{ width: `${mockInsights.sentiment.distribution.positive}%` }}
                  />
                </div>
                <div className="flex justify-between text-sm">
                  <span>Neutral</span>
                  <span className="font-semibold">{mockInsights.sentiment.distribution.neutral}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="bg-yellow-500 h-2 rounded-full" 
                    style={{ width: `${mockInsights.sentiment.distribution.neutral}%` }}
                  />
                </div>
                <div className="flex justify-between text-sm">
                  <span>Negative</span>
                  <span className="font-semibold">{mockInsights.sentiment.distribution.negative}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="bg-red-500 h-2 rounded-full" 
                    style={{ width: `${mockInsights.sentiment.distribution.negative}%` }}
                  />
                </div>
              </div>
            </div>
          </Card>

          {/* Visual Analysis */}
          <Card className="p-5 bg-gradient-to-br from-background to-secondary/5">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Eye className="w-5 h-5 text-secondary" />
              Visual Analysis
            </h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-muted-foreground mb-2">Dominant Colors</p>
                <div className="flex gap-2">
                  {mockInsights.visualAnalysis.dominantColors.map((color, idx) => (
                    <div
                      key={idx}
                      className="w-12 h-12 rounded-lg border border-border shadow-sm"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-2">Detected Elements</p>
                <div className="flex flex-wrap gap-2">
                  {mockInsights.visualAnalysis.detectedObjects.map((obj, idx) => (
                    <Badge key={idx} variant="outline">{obj}</Badge>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Emotional Tone</p>
                <p className="font-semibold">{mockInsights.visualAnalysis.emotionalTone}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Key Themes */}
        <Card className="p-5 mt-6 bg-muted/50">
          <h3 className="font-semibold mb-4">Key Themes</h3>
          <div className="space-y-3">
            {mockInsights.themes.map((theme, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-background rounded-lg border border-border">
                <div>
                  <p className="font-medium">{theme.theme}</p>
                  <p className="text-sm text-muted-foreground">{theme.mentions} mentions</p>
                </div>
                <Badge 
                  variant="outline"
                  className={
                    theme.sentiment === "positive" 
                      ? "bg-green-500/20 text-green-700 border-green-500/30" 
                      : "bg-yellow-500/20 text-yellow-700 border-yellow-500/30"
                  }
                >
                  {theme.sentiment}
                </Badge>
              </div>
            ))}
          </div>
        </Card>

        {/* Key Findings */}
        <Card className="p-5 mt-6 border-l-4 border-l-primary">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-primary" />
            Key Findings
          </h3>
          <ul className="space-y-2">
            {mockInsights.keyFindings.map((finding, idx) => (
              <li key={idx} className="flex gap-3">
                <span className="text-primary font-bold">•</span>
                <span className="text-sm">{finding}</span>
              </li>
            ))}
          </ul>
        </Card>

        {data.text && (
          <Card className="p-5 mt-6 bg-muted/30">
            <h3 className="font-semibold mb-3">Original Feedback</h3>
            <p className="text-sm">{data.text}</p>
          </Card>
        )}
      </Card>
    </div>
  );
};

export default InsightsDisplay;
