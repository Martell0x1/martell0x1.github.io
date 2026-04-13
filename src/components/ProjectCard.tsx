import { useState } from "react";
import { ExternalLink, Github, X, ZoomIn } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
  imageUrl?: string;
}

const ProjectCard = ({ 
  title, 
  description, 
  tags, 
  githubUrl, 
  liveUrl, 
  imageUrl,
}: ProjectCardProps) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);

  return (
    <>
      <Card className="group overflow-hidden bg-card hover:shadow-lg transition-all duration-300 border-border hover:border-primary/30 h-full flex flex-col">
        {imageUrl && (
          <div
            className="aspect-video overflow-hidden bg-muted relative cursor-pointer"
            onClick={() => setLightboxOpen(true)}
          >
            <img 
              src={imageUrl} 
              alt={title}
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-background/0 group-hover:bg-background/30 transition-colors duration-300 flex items-center justify-center">
              <ZoomIn className="w-6 h-6 text-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </div>
        )}
        <CardHeader className="pb-2">
          <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
            {title}
          </h3>
        </CardHeader>
        <CardContent className="space-y-3 flex-grow">
          <p className="text-muted-foreground text-sm leading-relaxed">
            {description}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs font-normal">
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
        <CardFooter className="gap-2 pt-0">
          {githubUrl && (
            <Button variant="outline" size="sm" asChild className="gap-1.5">
              <a href={githubUrl} target="_blank" rel="noopener noreferrer">
                <Github className="w-4 h-4" />
                Code
              </a>
            </Button>
          )}
          {liveUrl && (
            <Button variant="default" size="sm" asChild className="gap-1.5">
              <a href={liveUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4" />
                Live
              </a>
            </Button>
          )}
        </CardFooter>
      </Card>

      {imageUrl && (
        <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
          <DialogContent className="max-w-[90vw] max-h-[90vh] p-0 bg-background/95 backdrop-blur-sm border-border overflow-hidden">
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute top-3 right-3 z-10 p-1.5 rounded-full bg-background/80 hover:bg-background text-foreground transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="p-2">
              <img
                src={imageUrl}
                alt={title}
                className="w-full h-auto max-h-[85vh] object-contain rounded-md"
              />
              <p className="text-center text-sm text-muted-foreground mt-2 pb-1">{title}</p>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default ProjectCard;
