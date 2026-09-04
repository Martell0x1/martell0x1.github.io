import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import OpenSourceProjectCard from "@/components/OpenSourceProjectCard";
import GitHubHeatmap from "@/components/GitHubHeatmap";
import { openSourceProjects } from "@/data/openSource";


const OpenSource = () => (
  <div className="min-h-screen text-foreground bg-transparent">
    <Navigation />
    <main className="pt-28 pb-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Open Source <span className="text-primary">Contributions</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl leading-relaxed">
            A collection of the open-source projects I've contributed to, with links to
            the work I've done and the pull requests behind it.
          </p>

          {openSourceProjects.length > 0 ? (
            <div className="mt-10 space-y-6">
              {openSourceProjects.map((project) => (
                <OpenSourceProjectCard key={project.name} project={project} />
              ))}
            </div>
          ) : (
            <p className="mt-10 text-sm italic text-muted-foreground opacity-70">
              Open-source contributions will appear here soon.
            </p>
          )}
        </div>
      </div>
    </main>
    <Footer />
  </div>
);

export default OpenSource;
