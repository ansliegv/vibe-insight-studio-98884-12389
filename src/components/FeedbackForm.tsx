import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Upload, Image, Video, Mic, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface FeedbackFormProps {
  onSubmit: (data: any) => void;
}

const FeedbackForm = ({ onSubmit }: FeedbackFormProps) => {
  const [textFeedback, setTextFeedback] = useState("");
  const [files, setFiles] = useState<{ type: string; name: string; preview?: string }[]>([]);
  const { toast } = useToast();

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, type: string) => {
    const uploadedFiles = Array.from(e.target.files || []);
    const newFiles = uploadedFiles.map(file => ({
      type,
      name: file.name,
      preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined
    }));
    
    setFiles(prev => [...prev, ...newFiles]);
    toast({
      title: "Files uploaded",
      description: `${uploadedFiles.length} ${type} file(s) added`,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!textFeedback && files.length === 0) {
      toast({
        title: "No feedback provided",
        description: "Please add text feedback or upload files",
        variant: "destructive",
      });
      return;
    }

    onSubmit({
      text: textFeedback,
      files,
      timestamp: new Date().toISOString(),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card className="p-6 border-primary/20 shadow-lg">
        <div className="space-y-4">
          <div>
            <Label htmlFor="feedback" className="text-lg font-semibold">
              Feedback Description
            </Label>
            <Textarea
              id="feedback"
              placeholder="Describe what you're testing or the context for this feedback..."
              value={textFeedback}
              onChange={(e) => setTextFeedback(e.target.value)}
              className="mt-2 min-h-[120px]"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label className="flex items-center gap-2 mb-2">
                <Image className="w-4 h-4" />
                Images
              </Label>
              <Input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => handleFileUpload(e, 'image')}
                className="cursor-pointer"
              />
            </div>

            <div>
              <Label className="flex items-center gap-2 mb-2">
                <Video className="w-4 h-4" />
                Videos
              </Label>
              <Input
                type="file"
                accept="video/*"
                multiple
                onChange={(e) => handleFileUpload(e, 'video')}
                className="cursor-pointer"
              />
            </div>

            <div>
              <Label className="flex items-center gap-2 mb-2">
                <Mic className="w-4 h-4" />
                Audio
              </Label>
              <Input
                type="file"
                accept="audio/*"
                multiple
                onChange={(e) => handleFileUpload(e, 'audio')}
                className="cursor-pointer"
              />
            </div>
          </div>

          {files.length > 0 && (
            <div className="border border-border rounded-lg p-4 bg-muted/50">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Upload className="w-4 h-4" />
                Uploaded Files ({files.length})
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {files.map((file, idx) => (
                  <div key={idx} className="border border-border rounded p-2 bg-background">
                    {file.preview ? (
                      <img src={file.preview} alt={file.name} className="w-full h-20 object-cover rounded mb-2" />
                    ) : (
                      <div className="w-full h-20 bg-muted rounded mb-2 flex items-center justify-center">
                        {file.type === 'video' ? <Video className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
                      </div>
                    )}
                    <p className="text-xs truncate">{file.name}</p>
                    <p className="text-xs text-muted-foreground capitalize">{file.type}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </Card>

      <Button type="submit" size="lg" className="w-full">
        <Sparkles className="w-5 h-5 mr-2" />
        Analyze Feedback
      </Button>
    </form>
  );
};

export default FeedbackForm;
