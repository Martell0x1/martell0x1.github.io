import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import Terminal from "./Terminal";
import MatrixRain from "./MatrixRain";
import profilePhoto from "@/assets/profile-photo.jpg";

const HeroSection = () => {
  return (
    <section className="min-h-screen flex items-center justify-center relative pt-16 overflow-hidden">
      {/* Matrix Rain Background */}
      <MatrixRain />

      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(var(--accent))_0%,transparent_50%)] opacity-50" />
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div
            className="space-y-6 opacity-0 animate-fade-in"
            style={{ animationDelay: "200ms", animationFillMode: "forwards" }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent text-accent-foreground text-sm font-medium">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Available for opportunities
            </div>

            {/* Profile Photo - Mobile */}
            <div className="lg:hidden flex justify-center mb-6">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary to-primary/50 rounded-full blur-md opacity-75 animate-pulse" />
                <img
                  src={profilePhoto}
                  alt="Marwan Mohamed Zein"
                  className="relative w-32 h-32 rounded-full object-cover border-2 border-primary/50 shadow-glow"
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
              specializing in{" "}
              <span className="text-foreground font-medium">
                backend systems
              </span>
              ,{" "}
              <span className="text-foreground font-medium">
                embedded development
              </span>
              , and{" "}
              <span className="text-foreground font-medium">IoT solutions</span>
              . FCDS Student from Alexandria, Egypt. Passionate about Linux,
              Rust, and building reliable systems from hardware to cloud.
            </p>

            <div className="flex flex-wrap gap-3">
              <Button size="lg" variant="outline" asChild>
                <a href="#projects">
                  View Projects
                  <ArrowDown className="w-4 h-4" />
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="#contact">Get in Touch</a>
              </Button>
              <Button size="lg" className="gap-2" asChild>
                <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                  Download Resume
                </a>
              </Button>
            </div>

            <div className="flex items-center gap-4 pt-4">
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
                href="mailto:marwan@example.com"
                className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Right Content - Profile Photo + Terminal */}
          <div
            className="space-y-6 opacity-0 animate-fade-in"
            style={{ animationDelay: "500ms", animationFillMode: "forwards" }}
          >
            {/* Profile Photo - Desktop */}
            <div className="hidden lg:flex justify-center mb-6">
              <div className="relative group">
                <div className="absolute -inset-2 bg-gradient-to-r from-primary via-primary/50 to-primary rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500 animate-pulse" />
                <div className="relative">
                  <img
                    src={profilePhoto}
                    alt="Marwan Mohamed Zein"
                    className="w-48 h-48 rounded-full object-cover border-4 border-card shadow-2xl"
                  />
                  {/* Glitch overlay effect on hover */}
                  <div className="absolute inset-0 rounded-full bg-primary/10 opacity-0 group-hover:opacity-100 group-hover:animate-flicker transition-opacity" />
                </div>
              </div>
            </div>

            <Terminal className="shadow-xl" />
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
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
