import { ExternalLink, Quote } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ScrollReveal from "./ScrollReveal";
import { cn } from "@/lib/utils";
import { recommendations, type Recommendation } from "@/data/recommendations";

const getInitials = (name: string) =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");

interface RecommendationCardProps {
  recommendation: Recommendation;
  featured?: boolean;
}

const RecommendationCard = ({
  recommendation,
  featured = false,
}: RecommendationCardProps) => {
  const { name, role, relationship, text, avatar, linkedin } = recommendation;

  return (
    <figure
      className={cn(
        "group relative flex h-full flex-col rounded-xl border p-6 transition-all duration-300",
        featured
          ? "border-primary/20 bg-gradient-card shadow-sm"
          : "border-border/60 bg-card hover:border-primary/30 hover:shadow-sm"
      )}
    >
      <figcaption className="flex items-start gap-4">
        <Avatar
          className={cn(
            "shrink-0 ring-1 ring-border/70",
            featured ? "h-14 w-14" : "h-11 w-11"
          )}
        >
          <AvatarImage src={avatar} alt={`Photo of ${name}`} />
          <AvatarFallback className="bg-primary/10 font-semibold text-primary">
            {getInitials(name)}
          </AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-1">
          <p className="font-semibold text-foreground leading-snug">{name}</p>
          <p className="mt-0.5 text-sm text-muted-foreground leading-snug">
            {role}
          </p>
          <p className="mt-1.5 text-xs font-medium text-primary">
            {relationship}
          </p>
        </div>
      </figcaption>

      <blockquote className={cn("flex-1", featured ? "mt-6" : "mt-5")}>
        <Quote
          aria-hidden
          className={cn(
            "mb-3 text-primary/40",
            featured ? "h-6 w-6" : "h-5 w-5"
          )}
        />
        <p
          className={cn(
            "text-muted-foreground leading-relaxed",
            featured ? "text-base" : "text-sm"
          )}
        >
          {text}
        </p>
      </blockquote>

      {linkedin && (
        <a
          href={linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`View ${name}'s LinkedIn profile (opens in a new tab)`}
          className="mt-5 inline-flex items-center gap-1.5 self-start rounded text-sm font-medium text-foreground/80 transition-colors hover:text-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:outline-none"
        >
          View on LinkedIn
          <ExternalLink className="h-3.5 w-3.5 shrink-0" aria-hidden />
        </a>
      )}
    </figure>
  );
};

const RecommendationsSection = () => {
  const featured = recommendations.find((r) => r.featured) ?? recommendations[0];

  if (!featured) return null;

  const rest = recommendations.filter((r) => r !== featured);

  return (
    <section id="recommendations" className="py-20 bg-section-5">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          <ScrollReveal animation="fade-up">
            <div className="mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                <span className="text-primary">Recommendations</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl">
                What teammates and collaborators say about working with me.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid gap-6 lg:grid-cols-12">
            <ScrollReveal animation="fade-up" className="h-full lg:col-span-7">
              <RecommendationCard recommendation={featured} featured />
            </ScrollReveal>

            <div className="grid gap-6 lg:col-span-5">
              {rest.map((rec, index) => (
                <ScrollReveal
                  key={rec.name}
                  animation="fade-up"
                  delay={100 + index * 100}
                  className="h-full"
                >
                  <RecommendationCard recommendation={rec} />
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecommendationsSection;