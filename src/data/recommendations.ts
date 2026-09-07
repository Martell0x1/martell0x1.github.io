export interface Recommendation {
  name: string;
  role: string;
  relationship: string;
  text: string;
  avatar?: string;
  linkedin?: string;
  featured?: boolean;
}

export const recommendations: Recommendation[] = [
  {
    name: "Yahya Zakaria",
    role: "Ex-SWE Intern @ Deloitte Innovation Hub | Ex-Research Intern @ Nile University | Big Data Alumnus @ SIC",
    relationship: "Worked with Marwan on the same team",
    text: "Honestly, Marwan is one of the best teammates that I have worked with; he demonstrated strong and great technical skills in various fields, especially backend and architectural design. Most importantly, he proved that he is eager to learn new things and solve problems; he is so supportive, and you will find him whenever you ask. I worked with him on various projects; one of them was a smart parking system using IoT. He was able to deliver tasks early with high quality. Definitely, Marwan is a good addition to any team.",
    featured: true,
  },
  {
    name: "Mahmoud Mostafa",
    role: "Front-end Developer",
    relationship: "Worked with Marwan on the same team",
    text: "It is a pleasure to recommend Marwan for future opportunities. He is exceptionally hardworking, highly ambitious, and possesses a genuine passion for learning new skills. During his time working with me, Marwan proved to be a fast learner and an active listener who constantly seeks to expand his capabilities. He takes full ownership of his responsibilities, approaches challenges with a proactive mindset, and brings a positive energy to the team. Marwan’s dedication, adaptability, and drive make him an outstanding intern. I recommend him without reservation and am confident he will be a tremendous asset to any team.",
  },
  {
    name: "Huda Ali",
    role: "Ex SWE Intern @ Accord Business Group | ITI & DEPI .NET Graduate | Backend Developer | CS Student @ Alexandria University",
    relationship: "Studied together",
    text: "I had the opportunity to work with Marawan on several projects before, and I really appreciate his dedication and hard work to make the project in the best engineering architecture and implementation. He is a great problem-solver who finds software solutions. I highly recommend him.",
  },
];