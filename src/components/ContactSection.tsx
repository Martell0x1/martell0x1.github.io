import { Mail, Github, Linkedin, Send, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import ScrollReveal from "./ScrollReveal";

const ContactSection = () => {
  const contactLinks = [
    {
      icon: Github,
      label: "GitHub",
      href: "https://github.com/Martell0x1",
      username: "@Martell0x1",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/marawan-zein/",
      username: "Marwan Mohamed Zein",
    },
    {
      icon: Mail,
      label: "Email",
      href: "mailto:marwan@example.com",
      username: "marwan@example.com",
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <section id="contact" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <ScrollReveal animation="fade-up">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Get in <span className="text-primary">Touch</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Have a project in mind or want to collaborate? Feel free to reach
              out!
            </p>
          </div>
        </ScrollReveal>

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Contact Info */}
          <div className="space-y-6">
            <ScrollReveal animation="fade-right">
              <h3 className="text-xl font-semibold mb-4">Let's Connect</h3>
              <p className="text-muted-foreground mb-6">
                I'm always interested in hearing about new projects,
                opportunities, or just having a chat about technology. Don't
                hesitate to reach out!
              </p>
            </ScrollReveal>

            <ScrollReveal animation="fade-right" delay={100}>
              <div className="flex items-center gap-3 text-muted-foreground">
                <MapPin className="w-5 h-5 text-primary" />
                <span>Alexandria, Egypt • Available worldwide</span>
              </div>
            </ScrollReveal>

            <div className="space-y-3 pt-4">
              {contactLinks.map((link, index) => (
                <ScrollReveal
                  key={link.label}
                  animation="fade-right"
                  delay={200 + index * 100}
                >
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border hover:border-primary/30 transition-all group"
                  >
                    <div className="p-2 rounded-lg bg-accent text-accent-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <link.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">
                        {link.label}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {link.username}
                      </p>
                    </div>
                  </a>
                </ScrollReveal>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <ScrollReveal animation="fade-left" delay={200}>
            <Card>
              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label
                        htmlFor="name"
                        className="text-sm font-medium text-foreground"
                      >
                        Name
                      </label>
                      <Input id="name" placeholder="Your name" required />
                    </div>
                    <div className="space-y-2">
                      <label
                        htmlFor="email"
                        className="text-sm font-medium text-foreground"
                      >
                        Email
                      </label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="subject"
                      className="text-sm font-medium text-foreground"
                    >
                      Subject
                    </label>
                    <Input
                      id="subject"
                      placeholder="What's this about?"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="message"
                      className="text-sm font-medium text-foreground"
                    >
                      Message
                    </label>
                    <Textarea
                      id="message"
                      placeholder="Your message..."
                      rows={5}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full gap-2">
                    <Send className="w-4 h-4" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
