import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Image, Video, Mic, Send, X, StopCircle, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Respond = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [textResponse, setTextResponse] = useState("");
  const [files, setFiles] = useState<{ type: string; name: string; preview?: string }[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [isTraditionalMode, setIsTraditionalMode] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordingIntervalRef = useRef<number | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, type: string) => {
    const uploadedFiles = Array.from(e.target.files || []);
    const newFiles = uploadedFiles.map(file => ({
      type,
      name: file.name,
      preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined
    }));
    
    setFiles(prev => [...prev, ...newFiles]);
    toast({
      title: "Uploaded",
      description: `${uploadedFiles.length} ${type} file(s) added`,
    });
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const fileName = `recording-${Date.now()}.webm`;
        
        setFiles(prev => [...prev, {
          type: 'audio',
          name: fileName,
        }]);

        stream.getTracks().forEach(track => track.stop());
        
        toast({
          title: "Recording saved",
          description: "Your audio has been added",
        });
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingTime(0);

      recordingIntervalRef.current = window.setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);

      toast({
        title: "Recording started",
        description: "Speak now...",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Could not access microphone",
        variant: "destructive",
      });
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      
      if (recordingIntervalRef.current) {
        clearInterval(recordingIntervalRef.current);
        recordingIntervalRef.current = null;
      }
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!textResponse && files.length === 0) {
      toast({
        title: "Nothing to submit",
        description: "Please add some feedback",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Thank you!",
      description: "Your feedback has been submitted",
    });
    
    setTextResponse("");
    setFiles([]);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 sm:py-12 max-w-4xl">
        <Button 
          onClick={() => navigate("/")} 
          variant="ghost" 
          size="sm"
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        <Card className="p-6 sm:p-8 md:p-12 shadow-sm border">
          <div className="mb-8">
            <div className="flex items-start justify-between gap-4 mb-3">
              <h1 className="text-2xl sm:text-3xl font-semibold text-foreground">
                Feedback survey
              </h1>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-muted rounded-full">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">~2 min</span>
              </div>
            </div>
            <p className="text-sm sm:text-base text-muted-foreground mb-6">
              We value your feedback to improve our service. Please take a moment to share your thoughts before proceeding.
            </p>
            
            <div className="flex items-center gap-3 p-4 bg-muted/30 rounded-lg border border-border">
              <Switch 
                id="survey-mode" 
                checked={isTraditionalMode}
                onCheckedChange={setIsTraditionalMode}
              />
              <Label htmlFor="survey-mode" className="text-sm cursor-pointer">
                <span className="hidden sm:inline">Love a more structured approach? Switch to traditional survey format</span>
                <span className="sm:hidden">Switch to traditional format</span>
              </Label>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {!isTraditionalMode ? (
              <>
                <div className="space-y-6">
                  <div className="text-center">
                    <h2 className="text-xl sm:text-2xl font-semibold text-foreground mb-2">
                      Share Your Experience
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      Choose how you'd like to provide feedback
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                    <label className="cursor-pointer flex-1">
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={(e) => handleFileUpload(e, 'image')}
                        className="hidden"
                      />
                      <div className="border-2 border-border rounded-xl p-6 sm:p-8 text-center hover:border-primary hover:bg-muted/30 transition-all h-full flex flex-col items-center justify-center">
                        <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                          <Image className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
                        </div>
                        <p className="text-base sm:text-lg font-semibold text-foreground mb-2">Image</p>
                        <p className="text-xs sm:text-sm text-muted-foreground hidden sm:block">Show visual context</p>
                      </div>
                    </label>

                    <label className="cursor-pointer flex-1">
                      <input
                        type="file"
                        accept="video/*"
                        multiple
                        onChange={(e) => handleFileUpload(e, 'video')}
                        className="hidden"
                      />
                      <div className="border-2 border-border rounded-xl p-6 sm:p-8 text-center hover:border-primary hover:bg-muted/30 transition-all h-full flex flex-col items-center justify-center">
                        <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                          <Video className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
                        </div>
                        <p className="text-base sm:text-lg font-semibold text-foreground mb-2">Video</p>
                        <p className="text-xs sm:text-sm text-muted-foreground hidden sm:block">Capture full experience</p>
                      </div>
                    </label>

                    <div className="flex-1">
                      {!isRecording ? (
                        <div
                          onClick={startRecording}
                          className="cursor-pointer border-2 border-border rounded-xl p-6 sm:p-8 text-center hover:border-primary hover:bg-muted/30 transition-all h-full flex flex-col items-center justify-center"
                        >
                          <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                            <Mic className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
                          </div>
                          <p className="text-base sm:text-lg font-semibold text-foreground mb-2">Record</p>
                          <p className="text-xs sm:text-sm text-muted-foreground hidden sm:block">Express naturally</p>
                        </div>
                      ) : (
                        <div
                          onClick={stopRecording}
                          className="cursor-pointer border-2 border-destructive bg-destructive/10 rounded-xl p-6 sm:p-8 text-center transition-all animate-pulse h-full flex flex-col items-center justify-center"
                        >
                          <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-destructive/20 flex items-center justify-center mb-4">
                            <StopCircle className="w-6 h-6 sm:w-8 sm:h-8 text-destructive" />
                          </div>
                          <p className="text-base sm:text-lg font-semibold text-destructive mb-2">Recording</p>
                          <p className="text-sm text-destructive font-medium">{formatTime(recordingTime)}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="block">
                    <span className="text-base font-medium text-foreground mb-3 block">
                      Additional comments (optional)
                    </span>
                    <Textarea
                      placeholder="Share any additional details..."
                      value={textResponse}
                      onChange={(e) => setTextResponse(e.target.value)}
                      className="min-h-[120px] resize-none text-sm"
                    />
                  </label>
                </div>
              </>
            ) : (
              <>
                <div className="space-y-4">
                  <label className="block">
                    <span className="text-base font-medium text-foreground mb-3 block">
                      1. How satisfied were you with the quality of service that you received?
                    </span>
                    <Textarea
                      placeholder="Enter answer here"
                      value={textResponse}
                      onChange={(e) => setTextResponse(e.target.value)}
                      className="min-h-[120px] resize-none text-sm"
                    />
                  </label>
                </div>

                <div className="space-y-4">
                  <p className="text-base font-medium text-foreground">
                    2. Add supporting media
                  </p>
                  <div className="flex gap-3 sm:gap-4">
                    <label className="cursor-pointer flex-1">
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={(e) => handleFileUpload(e, 'image')}
                        className="hidden"
                      />
                      <div className="border border-border rounded-lg p-4 text-center hover:border-primary/50 hover:bg-muted/30 transition-colors">
                        <Image className="w-5 h-5 sm:w-6 sm:h-6 mx-auto mb-2 text-muted-foreground" />
                        <p className="text-xs sm:text-sm font-medium text-foreground mb-1">Image</p>
                        <p className="text-xs text-muted-foreground hidden sm:block">Show visual context</p>
                      </div>
                    </label>

                    <label className="cursor-pointer flex-1">
                      <input
                        type="file"
                        accept="video/*"
                        multiple
                        onChange={(e) => handleFileUpload(e, 'video')}
                        className="hidden"
                      />
                      <div className="border border-border rounded-lg p-4 text-center hover:border-primary/50 hover:bg-muted/30 transition-colors">
                        <Video className="w-5 h-5 sm:w-6 sm:h-6 mx-auto mb-2 text-muted-foreground" />
                        <p className="text-xs sm:text-sm font-medium text-foreground mb-1">Video</p>
                        <p className="text-xs text-muted-foreground hidden sm:block">Capture full experience</p>
                      </div>
                    </label>

                    <div className="flex-1">
                      {!isRecording ? (
                        <div
                          onClick={startRecording}
                          className="cursor-pointer border border-border rounded-lg p-4 text-center hover:border-primary/50 hover:bg-muted/30 transition-colors"
                        >
                          <Mic className="w-5 h-5 sm:w-6 sm:h-6 mx-auto mb-2 text-muted-foreground" />
                          <p className="text-xs sm:text-sm font-medium text-foreground mb-1">Record</p>
                          <p className="text-xs text-muted-foreground hidden sm:block">Express naturally</p>
                        </div>
                      ) : (
                        <div
                          onClick={stopRecording}
                          className="cursor-pointer border-2 border-destructive bg-destructive/10 rounded-lg p-4 text-center transition-colors animate-pulse"
                        >
                          <StopCircle className="w-5 h-5 sm:w-6 sm:h-6 mx-auto mb-2 text-destructive" />
                          <p className="text-xs sm:text-sm text-destructive font-medium">{formatTime(recordingTime)}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </>
            )}

            {files.length > 0 && (
              <div className="space-y-3">
                <p className="text-sm font-medium text-foreground">
                  {files.length} file{files.length > 1 ? 's' : ''} attached
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {files.map((file, idx) => (
                    <div key={idx} className="relative group">
                      {file.preview ? (
                        <img 
                          src={file.preview} 
                          alt={file.name} 
                          className="w-full h-24 object-cover rounded-md border border-border"
                        />
                      ) : (
                        <div className="w-full h-24 bg-muted rounded-md border border-border flex items-center justify-center">
                          {file.type === 'video' ? 
                            <Video className="w-6 h-6 text-muted-foreground" /> : 
                            <Mic className="w-6 h-6 text-muted-foreground" />
                          }
                        </div>
                      )}
                      <button
                        type="button"
                        onClick={() => removeFile(idx)}
                        className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
                      >
                        <X className="w-3 h-3" />
                      </button>
                      <p className="text-xs text-muted-foreground truncate mt-1">{file.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="pt-4">
              <Button 
                type="submit" 
                size="lg"
                className="w-full sm:w-auto px-8"
              >
                Submit Feedback
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Respond;
