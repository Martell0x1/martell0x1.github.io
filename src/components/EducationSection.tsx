import { GraduationCap, Calendar, MapPin } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";

interface Education {
  degree: string;
  institution: string;
  year: string;
  description?: string;
  location?: string;
  status?: string;
}

const EDUCATION: Education[] = [
  {
    degree: "Bachelor of Computer Science",
    institution: "Faculty of Computers & Data Science (FCDS), Alexandria University",
    year: "2023 - 2027",
    location: "Alexandria, Egypt",
    status: "In Progress",
    description:
      "Focused on software engineering, systems programming, and IoT projects.",
  },
];

const EducationSection = () => {
  return (
    <section id="education" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <ScrollReveal animation="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            <span className="text-primary">🎓</span> Education
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {EDUCATION.map((edu, idx) => (
            <ScrollReveal key={idx} animation="fade-up" delay={idx * 150}>
              <Card className="group relative overflow-hidden border-border/50 bg-card/80 backdrop-blur-md hover:border-primary/50 transition-all duration-500 hover:shadow-glow">
                {/* Animated gradient border effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Glowing accent line */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-primary/80 to-primary/40 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

                <CardContent className="relative p-6 space-y-4">
                  {/* Header with icon */}
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                      <GraduationCap className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                        {edu.degree}
                      </h3>
                      <p className="text-muted-foreground text-sm mt-1">
                        {edu.institution}
                      </p>
                    </div>
                  </div>

                  {/* Meta info */}
                  <div className="flex flex-wrap gap-3">
                    <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4 text-primary/70" />
                      <span>{edu.year}</span>
                    </div>
                    {edu.location && (
                      <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                        <MapPin className="w-4 h-4 text-primary/70" />
                        <span>{edu.location}</span>
                      </div>
                    )}
                  </div>

                  {/* Status badge */}
                  {edu.status && (
                    <Badge variant="outline" className="border-primary/50 text-primary bg-primary/5">
                      {edu.status}
                    </Badge>
                  )}

                  {/* Description */}
                  {edu.description && (
                    <p className="text-sm text-muted-foreground leading-relaxed border-t border-border/50 pt-4">
                      {edu.description}
                    </p>
                  )}
                </CardContent>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
