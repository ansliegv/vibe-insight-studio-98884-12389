import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, FileImage, FileVideo, FileAudio } from "lucide-react";
import { useState } from "react";

export const UploadZone = () => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    // Handle file drop logic here
  };

  return (
    <section className="py-24 px-4 bg-muted/30">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Ready to
            <span className="bg-gradient-primary bg-clip-text text-transparent"> Get Started?</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Drop your creative assets and let AI do the heavy lifting
          </p>
        </div>

        <Card
          className={`p-12 border-2 border-dashed transition-all duration-300 ${
            isDragging
              ? "border-primary bg-primary/5 shadow-medium"
              : "border-border hover:border-primary/50"
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center justify-center space-y-6">
            <div className="w-20 h-20 rounded-full bg-gradient-primary flex items-center justify-center shadow-medium">
              <Upload className="w-10 h-10 text-white" />
            </div>

            <div className="text-center space-y-2">
              <h3 className="text-2xl font-semibold">
                Drop files here or click to upload
              </h3>
              <p className="text-muted-foreground">
                Support for images, videos, and audio files
              </p>
            </div>

            <div className="flex gap-4 flex-wrap justify-center">
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card border border-border">
                <FileImage className="w-4 h-4 text-primary" />
                <span className="text-sm">JPG, PNG, WEBP</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card border border-border">
                <FileVideo className="w-4 h-4 text-secondary" />
                <span className="text-sm">MP4, MOV, WEBM</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card border border-border">
                <FileAudio className="w-4 h-4 text-accent" />
                <span className="text-sm">MP3, WAV, M4A</span>
              </div>
            </div>

            <Button variant="gradient" size="lg">
              Browse Files
            </Button>
          </div>
        </Card>

        <div className="mt-8 text-center text-sm text-muted-foreground">
          Maximum file size: 20MB • Up to 10 files per upload
        </div>
      </div>
    </section>
  );
};