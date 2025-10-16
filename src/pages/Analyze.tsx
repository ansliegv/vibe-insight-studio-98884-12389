import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TrendChart from "@/components/TrendChart";
import MindMap from "@/components/MindMap";
import { 
  ArrowLeft, 
  Search, 
  Filter, 
  Download, 
  TrendingUp, 
  Eye, 
  Heart, 
  Tag,
  BarChart3,
  Grid3x3,
  Image as ImageIcon,
  Video,
  Mic,
  AlertCircle
} from "lucide-react";

const Analyze = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Mock data
  const availableTags = ["positive", "frustrated", "excited", "modern", "confusing", "smiling"];
  const themes = [
    { theme: "Visual Design", mentions: 45, sentiment: "positive", score: 0.82 },
    { theme: "User Experience", mentions: 38, sentiment: "mixed", score: 0.65 },
    { theme: "Brand Recognition", mentions: 52, sentiment: "positive", score: 0.89 },
    { theme: "Accessibility", mentions: 23, sentiment: "negative", score: 0.42 },
  ];

  const responses = [
    {
      id: 1,
      text: "The packaging looks modern and appealing",
      sentiment: "positive",
      tags: ["modern", "positive"],
      emotionalTone: "Excited",
      media: [
        { type: 'image', name: 'packaging-front.jpg' },
        { type: 'image', name: 'packaging-side.jpg' }
      ]
    },
    {
      id: 2,
      text: "Text is hard to read in smaller sizes",
      sentiment: "negative",
      tags: ["frustrated", "confusing"],
      emotionalTone: "Frustrated",
      media: [
        { type: 'video', name: 'label-demonstration.mp4' }
      ]
    },
    {
      id: 3,
      text: "Love the color scheme and branding",
      sentiment: "positive",
      tags: ["excited", "positive", "smiling"],
      emotionalTone: "Happy",
      media: [
        { type: 'image', name: 'brand-colors.jpg' },
        { type: 'audio', name: 'voice-feedback.webm' }
      ]
    },
  ];

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const filteredResponses = responses.filter(r => {
    const matchesSearch = searchQuery === "" || 
      r.text.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTags = selectedTags.length === 0 || 
      selectedTags.some(tag => r.tags.includes(tag));
    return matchesSearch && matchesTags;
  });

  return (
    <div className="min-h-screen bg-gradient-hero">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Button 
          onClick={() => navigate("/")} 
          variant="ghost" 
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>

        <header className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-4xl font-bold mb-2 bg-gradient-primary bg-clip-text text-transparent">
                Analysis Dashboard
              </h1>
              <p className="text-muted-foreground">
                AI-powered insights from multimodal feedback
              </p>
            </div>
            <Button variant="outline" className="gap-2">
              <Download className="w-4 h-4" />
              Export Data
            </Button>
          </div>

          {/* Search and Filter Bar */}
          <Card className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search responses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Filters:</span>
                <div className="flex flex-wrap gap-2">
                  {availableTags.map(tag => (
                    <Badge
                      key={tag}
                      variant={selectedTags.includes(tag) ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => toggleTag(tag)}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </header>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-auto">
            <TabsTrigger value="overview" className="gap-2">
              <BarChart3 className="w-4 h-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="themes" className="gap-2">
              <Tag className="w-4 h-4" />
              Themes
            </TabsTrigger>
            <TabsTrigger value="responses" className="gap-2">
              <Grid3x3 className="w-4 h-4" />
              Responses
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* AI Insights Mind Map */}
            <MindMap />

            {/* Summary Section */}
            <Card className="p-6 bg-card border-2 border-border/60 shadow-sm">
              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
                  <TrendingUp className="w-6 h-6 text-muted-foreground" />
                  Executive Summary
                </h2>
                <p className="text-sm text-muted-foreground">
                  AI-powered analysis of 158 responses collected
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Key Findings */}
                <div className="space-y-3">
                  <h3 className="font-semibold text-base flex items-center gap-2">
                    <Badge className="bg-[#4CAF50]/10 text-[#4CAF50] hover:bg-[#4CAF50]/20 border-[#4CAF50]/30">
                      Key Findings
                    </Badge>
                  </h3>
                  <ul className="space-y-2">
                    <li className="flex gap-2 text-sm">
                      <span className="text-[#4CAF50] font-bold">•</span>
                      <span><strong>67% positive sentiment</strong> across all responses</span>
                    </li>
                    <li className="flex gap-2 text-sm">
                      <span className="text-[#4CAF50] font-bold">•</span>
                      <span><strong>Brand recognition at 92%</strong> - highest scoring theme</span>
                    </li>
                    <li className="flex gap-2 text-sm">
                      <span className="text-[#4CAF50] font-bold">•</span>
                      <span><strong>56% included multimedia</strong> feedback (images/video)</span>
                    </li>
                  </ul>
                </div>

                {/* Notable Trends */}
                <div className="space-y-3">
                  <h3 className="font-semibold text-base flex items-center gap-2">
                    <Badge className="bg-[#FFC107]/10 text-[#FFC107] hover:bg-[#FFC107]/20 border-[#FFC107]/30">
                      Notable Trends
                    </Badge>
                  </h3>
                  <ul className="space-y-2">
                    <li className="flex gap-2 text-sm">
                      <span className="text-[#4CAF50] font-bold">↑</span>
                      <span>Visual design praise <strong>increased 34%</strong></span>
                    </li>
                    <li className="flex gap-2 text-sm">
                      <span className="text-[#FFC107] font-bold">→</span>
                      <span>Accessibility concerns remain <strong>consistent</strong></span>
                    </li>
                    <li className="flex gap-2 text-sm">
                      <span className="text-[#4CAF50] font-bold">↑</span>
                      <span>Emotional tone is <strong>energetic & positive</strong></span>
                    </li>
                  </ul>
                </div>

                {/* Recommended Actions */}
                <div className="space-y-3">
                  <h3 className="font-semibold text-base flex items-center gap-2">
                    <Badge className="bg-[#EF5350]/10 text-[#EF5350] hover:bg-[#EF5350]/20 border-[#EF5350]/30">
                      Action Items
                    </Badge>
                  </h3>
                  <ul className="space-y-2">
                    <li className="flex gap-2 text-sm">
                      <AlertCircle className="w-4 h-4 text-[#EF5350] shrink-0 mt-0.5" />
                      <span><strong>Priority:</strong> Improve text readability in smaller sizes</span>
                    </li>
                    <li className="flex gap-2 text-sm">
                      <AlertCircle className="w-4 h-4 text-[#EF5350] shrink-0 mt-0.5" />
                      <span><strong>Address:</strong> Accessibility score (42%) needs improvement</span>
                    </li>
                    <li className="flex gap-2 text-sm">
                      <AlertCircle className="w-4 h-4 text-[#EF5350] shrink-0 mt-0.5" />
                      <span><strong>Leverage:</strong> Strong brand recognition in marketing</span>
                    </li>
                  </ul>
                </div>
              </div>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Sentiment Overview */}
              <Card className="p-6 bg-card border-2 border-border/60 hover:border-border transition-colors">
                <h3 className="font-semibold mb-4 flex items-center gap-2 text-base">
                  <Heart className="w-5 h-5 text-[#4CAF50]" />
                  Sentiment Overview
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Positive</span>
                    <span className="font-semibold text-[#4CAF50]">67%</span>
                  </div>
                  <div className="w-full bg-border/20 rounded-full h-2">
                    <div className="bg-[#4CAF50] h-2 rounded-full transition-all" style={{ width: '67%' }} />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Neutral</span>
                    <span className="font-semibold text-[#FFC107]">20%</span>
                  </div>
                  <div className="w-full bg-border/20 rounded-full h-2">
                    <div className="bg-[#FFC107] h-2 rounded-full transition-all" style={{ width: '20%' }} />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Negative</span>
                    <span className="font-semibold text-[#EF5350]">13%</span>
                  </div>
                  <div className="w-full bg-border/20 rounded-full h-2">
                    <div className="bg-[#EF5350] h-2 rounded-full transition-all" style={{ width: '13%' }} />
                  </div>
                </div>
              </Card>

              {/* Visual Insights */}
              <Card className="p-6 bg-card border-2 border-border/60 hover:border-border transition-colors">
                <h3 className="font-semibold mb-4 flex items-center gap-2 text-base">
                  <Eye className="w-5 h-5 text-muted-foreground" />
                  Visual Insights
                </h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-3">Top Detected Tags</p>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline" className="border-border/60">Smiling</Badge>
                      <Badge variant="outline" className="border-border/60">Modern</Badge>
                      <Badge variant="outline" className="border-border/60">Excited</Badge>
                    </div>
                  </div>
                  <div className="pt-2">
                    <p className="text-sm text-muted-foreground mb-2">Emotional Tone</p>
                    <p className="font-semibold text-base">Energetic & Positive</p>
                  </div>
                </div>
              </Card>

              {/* Response Stats */}
              <Card className="p-6 bg-card border-2 border-border/60 hover:border-border transition-colors">
                <h3 className="font-semibold mb-4 flex items-center gap-2 text-base">
                  <TrendingUp className="w-5 h-5 text-muted-foreground" />
                  Response Stats
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Total Responses</span>
                    <span className="font-bold text-2xl">158</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">With Media</span>
                    <span className="font-bold text-2xl">89</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Text Only</span>
                    <span className="font-bold text-2xl">69</span>
                  </div>
                </div>
              </Card>
            </div>

            {/* Real-time Trend Chart - Moved to bottom */}
            <TrendChart />
          </TabsContent>

          <TabsContent value="themes" className="space-y-4">
            {themes.map((theme, idx) => (
              <Card key={idx} className="p-5 hover:shadow-soft transition-shadow">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-1">{theme.theme}</h3>
                    <p className="text-sm text-muted-foreground">{theme.mentions} mentions across responses</p>
                    <Badge 
                      variant="outline"
                      className={`mt-2 ${
                        theme.sentiment === "positive" 
                          ? "bg-green-500/20 text-green-700 border-green-500/30" 
                          : theme.sentiment === "negative"
                          ? "bg-red-500/20 text-red-700 border-red-500/30"
                          : "bg-yellow-500/20 text-yellow-700 border-yellow-500/30"
                      }`}
                    >
                      {theme.sentiment}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="relative w-24 h-24">
                      {/* Background circle */}
                      <svg className="w-24 h-24 transform -rotate-90">
                        <circle
                          cx="48"
                          cy="48"
                          r="40"
                          stroke="currentColor"
                          strokeWidth="8"
                          fill="none"
                          className="text-muted"
                        />
                        {/* Progress circle */}
                        <circle
                          cx="48"
                          cy="48"
                          r="40"
                          stroke="currentColor"
                          strokeWidth="8"
                          fill="none"
                          strokeDasharray={`${2 * Math.PI * 40}`}
                          strokeDashoffset={`${2 * Math.PI * 40 * (1 - theme.score)}`}
                          className={
                            theme.sentiment === "positive" ? "text-green-500" :
                            theme.sentiment === "negative" ? "text-red-500" : "text-yellow-500"
                          }
                          strokeLinecap="round"
                        />
                      </svg>
                      {/* Center text */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <p className="font-bold text-xl">{(theme.score * 100).toFixed(0)}%</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="responses" className="space-y-4">
            <p className="text-sm text-muted-foreground mb-4">
              Showing {filteredResponses.length} of {responses.length} responses
            </p>
            {filteredResponses.map((response) => (
              <Card key={response.id} className="p-6 hover:shadow-soft transition-shadow">
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Main Content */}
                  <div className="flex-1 space-y-4">
                    <div>
                      <p className="text-base mb-3">{response.text}</p>
                      <div className="flex flex-wrap gap-2">
                        {response.tags.map((tag, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Media Preview */}
                    {response.media && response.media.length > 0 && (
                      <div className="border-t pt-4">
                        <p className="text-sm font-medium text-muted-foreground mb-3">
                          Attached Media ({response.media.length})
                        </p>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                          {response.media.map((item, idx) => (
                            <div key={idx} className="border border-border rounded-lg p-3 bg-muted/30">
                              <div className="flex items-center gap-2 mb-2">
                                {item.type === 'image' && <ImageIcon className="w-4 h-4 text-primary" />}
                                {item.type === 'video' && <Video className="w-4 h-4 text-primary" />}
                                {item.type === 'audio' && <Mic className="w-4 h-4 text-primary" />}
                                <span className="text-xs font-medium capitalize">{item.type}</span>
                              </div>
                              <p className="text-xs text-muted-foreground truncate" title={item.name}>
                                {item.name}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Sidebar Metadata */}
                  <div className="lg:text-right space-y-3 lg:min-w-[180px] flex lg:flex-col gap-3 lg:gap-0">
                    <div>
                      <p className="text-xs text-muted-foreground mb-2">Sentiment</p>
                      <Badge 
                        className={
                          response.sentiment === "positive" 
                            ? "bg-green-500/20 text-green-700 border-green-500/30" 
                            : "bg-red-500/20 text-red-700 border-red-500/30"
                        }
                      >
                        {response.sentiment}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Emotional Tone</p>
                      <p className="text-sm font-medium">{response.emotionalTone}</p>
                    </div>
                    {response.media && response.media.length > 0 && (
                      <div>
                        <Badge variant="outline" className="text-xs">
                          <Eye className="w-3 h-3 mr-1" />
                          {response.media.length} file{response.media.length > 1 ? 's' : ''}
                        </Badge>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Analyze;
