import { Quote, Linkedin } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

interface Recommendation {
  name: string;
  headline: string;
  relation: string;
  text: string;
}

const RECOMMENDATIONS: Recommendation[] = [
  {
    name: "Yahya Zakaria",
    headline: "Ex-SWE Intern @ Deloitte Innovation Hub | Ex-Research Intern @ Nile University | Big Data Alumnus @ SIC",
    relation: "Worked with Marwan on the same team",
    text: "Honestly, Marwan is one of the best teammates that I have worked with; he demonstrated strong and great technical skills in various fields, especially backend and architectural design. Most importantly, he proved that he is eager to learn new things and solve problems; he is so supportive, and you will find him whenever you ask. I worked with him on various projects; one of them was a smart parking system using IoT. He was able to deliver tasks early with high quality. Definitely, Marwan is a good addition to any team.",
  },
  {
    name: "Mahmoud Mostafa",
    headline: "Front-end Developer",
    relation: "Worked with Marwan on the same team",
    text: "It is a pleasure to recommend Marwan for future opportunities. He is exceptionally hardworking, highly ambitious, and possesses a genuine passion for learning new skills. During his time working with me, Marwan proved to be a fast learner and an active listener who constantly seeks to expand his capabilities. He takes full ownership of his responsibilities, approaches challenges with a proactive mindset, and brings a positive energy to the team. Marwan’s dedication, adaptability, and drive make him an outstanding intern. I recommend him without reservation and am confident he will be a tremendous asset to any team.",
  },
  {
    name: "Huda Ali",
    headline: "EX SWE Intern @ Accord Business Group | ITI & DEPI .NET Graduate | Backend Developer | CS Student @ Alexandria University",
    relation: "Studied together",
    text: "I had the opportunity to work with Marawan on several projects before, and I really appreciate his dedication and hard work to make the project in the best engineering architecture and implementation. He is a great problem-solver who finds software solutions. I highly recommend him.",
  },
];

const RecommendationsSection = () => {
  return (
    <section id="recommendations" className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal animation="fade-up">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">
              <span className="text-primary">Recommendations</span>
            </h2>
            <p className="text-muted-foreground mb-10">
              What teammates and collaborators say about working with me.
            </p>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {RECOMMENDATIONS.map((rec, index) => (
              <ScrollReveal
                key={rec.name}
                animation="fade-up"
                delay={150 + index * 100}
              >
                <div className="relative h-full flex flex-col p-6 rounded-xl bg-card border border-border hover:border-primary/40 hover:shadow-glow transition-all duration-300">
                  <Quote className="w-8 h-8 text-primary/60 mb-4" />

                  <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                    “{rec.text}”
                  </p>

                  <div className="mt-6 pt-4 border-t border-border/60">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-foreground">{rec.name}</p>
                      <Linkedin className="w-4 h-4 text-primary/70" />
                    </div>
                    <p className="text-xs text-primary/90 mt-1">{rec.relation}</p>
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                      {rec.headline}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecommendationsSection;
