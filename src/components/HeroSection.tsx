import { ArrowDown, Github, Linkedin, Mail, Youtube, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import Terminal from "./Terminal";
import ParticleNetwork from "./ParticleNetwork";
import profilePhoto from "@/assets/profile-photo.jpg";
import { usePageViews } from "@/hooks/use-page-views";

const IMPACT_STATS = [
  { value: "106+", label: "Commits at Dice" },
  { value: "40+", label: "REST APIs shipped" },
  { value: "2k+", label: "Jobs every 30 min" },
];

const HeroSection = () => {
  const { viewCount, isLoading } = usePageViews("home");

  return (
    <section className="min-h-screen flex flex-col justify-center relative pt-16 pb-24 overflow-hidden">
      <div
        className="absolute inset-0 bg-gradient-hero"
        style={{ zIndex: 0 }}
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_15%_0%,hsl(198_50%_88%/0.7)_0%,transparent_48%),radial-gradient(ellipse_at_90%_85%,hsl(38_40%_90%/0.55)_0%,transparent_50%)]"
        style={{ zIndex: 0 }}
        aria-hidden
      />

      <ParticleNetwork />

      <div className="container mx-auto px-4 relative z-10 flex-1 flex flex-col justify-center">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div
            className="space-y-6 opacity-0 animate-fade-in"
            style={{ animationDelay: "200ms", animationFillMode: "forwards" }}
          >
            <div className="flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-card/70 border border-primary/30 text-sm font-medium shadow-glow backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_hsl(var(--primary)/0.7)] animate-pulse" />
                <span className="text-primary">Available for opportunities</span>
              </div>

              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-card/60 border border-border/60 text-sm font-medium text-muted-foreground backdrop-blur-sm">
                <Eye className="w-4 h-4" />
                <span>
                  {isLoading ? "..." : viewCount?.toLocaleString() ?? "0"} views
                </span>
              </div>
            </div>

            <div className="lg:hidden flex justify-center mb-6">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary via-primary/40 to-accent rounded-full blur-md opacity-65 animate-pulse" />
                <img
                  src={profilePhoto}
                  alt="Marwan Mohamed Zein"
                  className="relative w-32 h-32 rounded-full object-cover border-2 border-card shadow-glow"
                />
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Hi, I'm{" "}
              <span className="text-primary relative inline-block group">
                Marwan
                <span className="absolute -inset-1 bg-primary/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-lg leading-relaxed">
              <span className="text-foreground font-medium">
                Full Stack Developer
              </span>{" "}
              with expertise in{" "}
              <span className="text-foreground font-medium">Angular</span>,{" "}
              <span className="text-foreground font-medium">.NET</span>, and{" "}
              <span className="text-foreground font-medium">Node.js</span>. Also
              specializing in{" "}
              <span className="text-foreground font-medium">
                embedded development
              </span>{" "}
              and{" "}
              <span className="text-foreground font-medium">IoT solutions</span>
              . FCDS Student from Alexandria, Egypt. Passionate about Linux,
              Rust, and building reliable systems from hardware to cloud.
            </p>

            <p className="text-sm md:text-base text-foreground/90 max-w-lg leading-relaxed border-l-2 border-primary/50 pl-4">
              <span className="font-medium text-primary">Looking for:</span>{" "}
              Backend / systems roles and internships — remote or hybrid. Keen
              on APIs, queues, data pipelines, and IoT platforms.
            </p>

            <div className="flex flex-wrap gap-3">
              <Button size="lg" className="gap-2" asChild>
                <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                  Download Resume
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="#projects">
                  View Projects
                  <ArrowDown className="w-4 h-4" />
                </a>
              </Button>
              <Button size="lg" variant="ghost" asChild>
                <a href="#contact">Get in Touch</a>
              </Button>
            </div>

            <div className="flex items-center gap-4 pt-2">
              <a
                href="https://github.com/Martell0x1"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/marawan-zein/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="mailto:marawanzein222@gmail.com"
                className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
              >
                <Mail className="w-5 h-5" />
              </a>
              <a
                href="https://www.youtube.com/@marawanmohamed7126"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div
            className="space-y-6 opacity-0 animate-fade-in"
            style={{ animationDelay: "500ms", animationFillMode: "forwards" }}
          >
            <div className="hidden lg:flex justify-center mb-6">
              <div className="relative group">
                <div className="absolute -inset-2 bg-gradient-to-r from-primary via-primary/45 to-accent rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500 animate-pulse" />
                <div className="relative">
                  <img
                    src={profilePhoto}
                    alt="Marwan Mohamed Zein"
                    className="w-48 h-48 rounded-full object-cover border-4 border-card shadow-2xl"
                  />
                  <div className="absolute inset-0 rounded-full bg-primary/10 opacity-0 group-hover:opacity-100 group-hover:animate-flicker transition-opacity" />
                </div>
              </div>
            </div>

            <Terminal className="shadow-xl" />
          </div>
        </div>

        {/* Impact strip */}
        <div
          className="mt-14 md:mt-16 opacity-0 animate-fade-in"
          style={{ animationDelay: "750ms", animationFillMode: "forwards" }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {IMPACT_STATS.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-border/60 bg-card/60 backdrop-blur-sm px-5 py-4 text-center"
              >
                <p className="text-2xl md:text-3xl font-bold text-primary tracking-tight">
                  {stat.value}
                </p>
                <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-0 animate-fade-in"
        style={{ animationDelay: "1000ms", animationFillMode: "forwards" }}
      >
        <a
          href="#about"
          className="flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <span className="text-xs font-medium font-mono">&gt;_ scroll</span>
          <ArrowDown className="w-4 h-4 animate-bounce" />
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
