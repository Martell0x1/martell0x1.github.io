import { ExternalLink, Github } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

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
  return (
    <Card className="group overflow-hidden bg-card hover:shadow-lg transition-all duration-300 border-border hover:border-primary/30 h-full flex flex-col">
      {imageUrl && (
        <div className="aspect-video overflow-hidden bg-muted">
          <img 
            src={imageUrl} 
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
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
  );
};

export default ProjectCard;
