import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, ChevronRight, ZoomIn, ZoomOut, Maximize2 } from "lucide-react";
import { useState } from "react";

interface MindMapNode {
  id: string;
  label: string;
  children?: MindMapNode[];
  type?: "primary" | "secondary" | "action";
  color?: string;
}

const MindMap = () => {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [expandedNode, setExpandedNode] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);

  const toggleNode = (nodeId: string) => {
    setExpandedNode(prev => prev === nodeId ? null : nodeId);
  };

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 0.2, 2));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 0.2, 0.5));
  };

  const handleResetZoom = () => {
    setZoom(1);
  };

  const mindMapData: MindMapNode = {
    id: "root",
    label: "AI Feedback Analysis",
    type: "primary",
    children: [
      {
        id: "visual-design",
        label: "Visual Design",
        type: "secondary",
        color: "#4CAF50", // 100% positive
        children: [
          { id: "vd-1", label: "Modern aesthetics praised by 67%", type: "action", color: "#4CAF50" },
          { id: "vd-2", label: "Color scheme highly appreciated", type: "action", color: "#4CAF50" },
        ]
      },
      {
        id: "brand-recognition",
        label: "Brand Recognition",
        type: "secondary",
        color: "#4CAF50", // 100% positive
        children: [
          { id: "br-1", label: "92% recognition score - highest theme", type: "action", color: "#4CAF50" },
          { id: "br-2", label: "Strong brand identity consistency", type: "action", color: "#4CAF50" },
        ]
      },
      {
        id: "user-experience",
        label: "User Experience",
        type: "secondary",
        color: "#FFC107", // 100% neutral/mixed
        children: [
          { id: "ux-1", label: "Navigation intuitive for most users", type: "action", color: "#FFC107" },
          { id: "ux-2", label: "Mobile responsiveness needs improvement", type: "action", color: "#FFC107" },
        ]
      },
      {
        id: "accessibility",
        label: "Accessibility",
        type: "secondary",
        color: "#EF5350", // 100% needs attention
        children: [
          { id: "acc-1", label: "Text readability issues in small sizes", type: "action", color: "#EF5350" },
          { id: "acc-2", label: "42% score requires immediate attention", type: "action", color: "#EF5350" },
        ]
      },
      {
        id: "sentiment",
        label: "Overall Sentiment",
        type: "secondary",
        color: "#4CAF50", // 100% positive
        children: [
          { id: "sent-1", label: "67% positive responses", type: "action", color: "#4CAF50" },
          { id: "sent-2", label: "Energetic and positive tone detected", type: "action", color: "#4CAF50" },
        ]
      },
      {
        id: "media-insights",
        label: "Media Insights",
        type: "secondary",
        color: "#8BC34A", // Mixed: mostly positive with some neutral
        children: [
          { id: "mi-1", label: "56% included visual feedback", type: "action", color: "#4CAF50" },
          { id: "mi-2", label: "Video feedback most detailed", type: "action", color: "#FFC107" },
        ]
      },
      {
        id: "recommendations",
        label: "Key Recommendations",
        type: "secondary",
        color: "#8BC34A", // Mixed: positive and needs attention
        children: [
          { id: "rec-1", label: "Prioritize text readability improvements", type: "action", color: "#EF5350" },
          { id: "rec-2", label: "Leverage strong brand in marketing", type: "action", color: "#4CAF50" },
        ]
      },
    ]
  };

  const renderNode = (node: MindMapNode, isRoot: boolean = false, index: number = 0) => {
    const isHovered = hoveredNode === node.id;
    const isExpanded = expandedNode === node.id;
    
    if (isRoot) {
      return (
        <div
          key={node.id}
          className="absolute left-16 top-1/2 transform -translate-y-1/2"
          onMouseEnter={() => setHoveredNode(node.id)}
          onMouseLeave={() => setHoveredNode(null)}
          style={{ width: 'fit-content' }}
        >
          <div className="bg-primary/20 border-2 border-primary rounded-xl px-6 py-3 shadow-lg hover:shadow-xl transition-all hover:scale-105 cursor-pointer">
            <p className="font-bold text-base text-foreground whitespace-nowrap">{node.label}</p>
          </div>
        </div>
      );
    }

    if (node.type === "secondary") {
      // Calculate position to fit all nodes within the container (600px height)
      // With 7 nodes, distribute them evenly with padding
      const totalNodes = mindMapData.children?.length || 1;
      const containerHeight = 600;
      const nodeHeight = 40;
      const availableHeight = containerHeight - 100; // Leave padding at top/bottom
      const spacing = availableHeight / totalNodes;
      const yPosition = 60 + (index * spacing);
      
      return (
        <div key={node.id}>
          {/* Secondary node */}
          <div
            className="absolute left-[360px] w-fit"
            style={{ top: `${yPosition}px` }}
            onMouseEnter={() => setHoveredNode(node.id)}
            onMouseLeave={() => setHoveredNode(null)}
            onClick={() => toggleNode(node.id)}
          >
            <div 
              className={`rounded-lg px-4 py-2 shadow-md hover:shadow-lg transition-all hover:scale-105 cursor-pointer flex items-center gap-2 ${isExpanded ? 'scale-105 shadow-xl' : ''} ${isHovered ? 'shadow-lg' : ''}`}
              style={{
                backgroundColor: `${node.color}15`,
                border: `2px solid ${node.color}${isExpanded ? 'FF' : '60'}`,
              }}
            >
              <p className="font-semibold text-sm text-foreground whitespace-nowrap">{node.label}</p>
              <ChevronRight className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-90' : ''}`} style={{ color: node.color }} />
            </div>
          </div>

          {/* Connection line from root to secondary */}
          <svg className="absolute left-0 top-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
            <path
              d={`M 280 300 Q 320 ${yPosition + 20}, 360 ${yPosition + 20}`}
              stroke={node.color || 'hsl(var(--primary))'}
              strokeWidth="2"
              fill="none"
              opacity="0.4"
            />
          </svg>

          {/* Render children (action nodes) - only if expanded */}
          {isExpanded && node.children?.map((child, childIndex) => (
            <div key={child.id} className="animate-fade-in">
              <div
                className="absolute left-[680px]"
                style={{ top: `${yPosition + (childIndex * 35) - 10}px` }}
                onMouseEnter={() => setHoveredNode(child.id)}
                onMouseLeave={() => setHoveredNode(null)}
              >
                <div 
                  className={`rounded-lg px-3 py-1.5 shadow-md hover:shadow-lg transition-all hover:scale-105 cursor-pointer ${
                    hoveredNode === child.id ? 'scale-105' : ''
                  }`}
                  style={{ 
                    backgroundColor: `${child.color}20`,
                    border: `1px solid ${child.color}60`
                  }}
                >
                  <p className="text-xs text-foreground whitespace-nowrap">{child.label}</p>
                </div>
              </div>

              {/* Connection line from secondary to action */}
              <svg className="absolute left-0 top-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
                <path
                  d={`M 655 ${yPosition + 20} Q 667 ${yPosition + (childIndex * 35) + 5}, 680 ${yPosition + (childIndex * 35) + 5}`}
                  stroke={child.color || 'hsl(var(--primary))'}
                  strokeWidth="1.5"
                  fill="none"
                  opacity="0.4"
                />
              </svg>
            </div>
          ))}
        </div>
      );
    }

    return null;
  };

  return (
    <Card className="p-6 bg-card border-2 border-border/60 shadow-sm overflow-hidden">
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h2 className="text-xl font-bold mb-1 flex items-center gap-2">
            <Brain className="w-5 h-5 text-primary" />
            AI Insights Mind Map
          </h2>
          <p className="text-sm text-muted-foreground">
            Interactive visualization of key themes, sentiments, and recommendations
          </p>
        </div>
        
        {/* Zoom Controls */}
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleZoomOut}
            disabled={zoom <= 0.5}
            className="h-8 w-8 p-0"
          >
            <ZoomOut className="w-4 h-4" />
          </Button>
          <span className="text-xs text-muted-foreground min-w-[3rem] text-center">
            {Math.round(zoom * 100)}%
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={handleZoomIn}
            disabled={zoom >= 2}
            className="h-8 w-8 p-0"
          >
            <ZoomIn className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleResetZoom}
            className="h-8 w-8 p-0"
            title="Reset zoom"
          >
            <Maximize2 className="w-3 h-3" />
          </Button>
        </div>
      </div>

      <div className="relative bg-gradient-to-br from-background to-muted/20 rounded-lg overflow-hidden" style={{ height: "600px" }}>
        <div 
          className="absolute inset-0 transition-transform duration-300 ease-out"
          style={{ 
            transform: `scale(${zoom})`,
            transformOrigin: 'center center'
          }}
        >
          <div className="relative w-full h-full overflow-hidden">
            {/* Render root node */}
            {renderNode(mindMapData, true)}

            {/* Render all secondary nodes and their children */}
            {mindMapData.children?.map((child, index) => renderNode(child, false, index))}
          </div>
        </div>

        {/* Legend */}
        <div className="absolute bottom-4 right-4 flex flex-col gap-2 bg-card/90 backdrop-blur-sm p-3 rounded-lg border border-border/60 shadow-md z-10">
          <p className="text-xs font-semibold text-muted-foreground mb-1">Sentiment Legend</p>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded" style={{ backgroundColor: "#4CAF50" }} />
            <span className="text-xs text-foreground">Positive</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded" style={{ backgroundColor: "#FFC107" }} />
            <span className="text-xs text-foreground">Neutral/Mixed</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded" style={{ backgroundColor: "#EF5350" }} />
            <span className="text-xs text-foreground">Needs Attention</span>
          </div>
        </div>

        {/* Interaction hint */}
        <div className="absolute top-4 right-4 text-xs text-muted-foreground bg-card/90 backdrop-blur-sm px-3 py-2 rounded-lg border border-border/60 z-10">
          💡 Click on categories to expand insights
        </div>
      </div>
    </Card>
  );
};

export default MindMap;
