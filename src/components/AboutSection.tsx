import { Code2, Server, Cpu, Boxes } from "lucide-react";

const AboutSection = () => {
  const highlights = [
    { icon: Server, label: "Backend Systems", value: "Scalable APIs & Services" },
    { icon: Cpu, label: "Embedded Dev", value: "IoT & Microcontrollers" },
    { icon: Code2, label: "Systems Programming", value: "Linux & Low-level" },
    { icon: Boxes, label: "Infrastructure", value: "DevOps & Automation" },
  ];

  return (
    <section id="about" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 opacity-0 animate-fade-in" style={{ animationFillMode: 'forwards' }}>
            About <span className="text-primary">Me</span>
          </h2>
          
          <div className="space-y-6 opacity-0 animate-fade-in" style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}>
            <p className="text-lg text-muted-foreground leading-relaxed">
              I'm Marwan, a Software Engineer and FCDS student from Alexandria, Egypt. I have a strong passion 
              for backend development, systems programming, and building things from the ground up. 
              My journey has led me through OS development in Rust, IoT projects with ESP32, and cloud integrations with AWS.
            </p>
            
            <p className="text-lg text-muted-foreground leading-relaxed">
              I believe in writing clean, efficient code that not only works but scales. Whether it's building 
              RESTful APIs with Express/NestJS, developing bare-metal OS kernels, or creating IoT solutions, 
              I approach each challenge with a focus on performance and reliability.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-12">
            {highlights.map((item, index) => (
              <div 
                key={item.label}
                className="p-4 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors opacity-0 animate-fade-in"
                style={{ animationDelay: `${400 + index * 100}ms`, animationFillMode: 'forwards' }}
              >
                <item.icon className="w-8 h-8 text-primary mb-3" />
                <h3 className="font-semibold text-foreground">{item.label}</h3>
                <p className="text-sm text-muted-foreground mt-1">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
