import React from "react";

interface Education {
  degree: string;
  institution: string;
  year: string;
  description?: string;
}

const EDUCATION: Education[] = [
  {
    degree: "Bachelor of Computer Science",
    institution:
      "Faculty of Computers & Data Science (FCDS), Alexandria University",
    year: "2023 - 2027 (Expected)",
    description:
      "Focused on software engineering, systems programming, and IoT projects.",
  },
];

const EducationSection = () => {
  return (
    <section id="education" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">🎓 Education</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {EDUCATION.map((edu, idx) => (
            <div
              key={idx}
              className="p-6 rounded-xl bg-card/60 backdrop-blur-md border border-border/30 hover:bg-gradient-to-br hover:from-purple-600 hover:to-pink-500 hover:text-white transition-all duration-300 cursor-pointer shadow-lg hover:shadow-2xl"
            >
              <h3 className="text-xl font-semibold mb-2">{edu.degree}</h3>
              <p className="text-sm text-muted-foreground mb-2">
                {edu.institution} • {edu.year}
              </p>
              {edu.description && <p className="text-sm">{edu.description}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
