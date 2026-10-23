export type QuizQuestion = {
  id: number;
  category: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
};

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    category: "SMART MANUFACTURING",
    question: "What is the primary purpose of a Manufacturing Execution System (MES)?",
    options: [
      "To manage social media campaigns",
      "To monitor and coordinate production-floor operations",
      "To replace every machine on the shop floor",
      "To design product packaging only",
    ],
    correctAnswer: 1,
    explanation: "MES connects production activity with operational data, helping teams track, coordinate and improve manufacturing performance.",
  },
  {
    id: 2,
    category: "PREDICTIVE MAINTENANCE",
    question: "How can predictive maintenance help a steel plant?",
    options: [
      "By identifying warning signs before equipment fails",
      "By increasing unplanned downtime",
      "By removing the need for machine data",
      "By scheduling repairs only after a breakdown",
    ],
    correctAnswer: 0,
    explanation: "Sensor data and analytics can reveal patterns that indicate developing equipment issues, giving teams time to act.",
  },
  {
    id: 3,
    category: "INDUSTRIAL IoT",
    question: "What does Industrial IoT make possible?",
    options: [
      "Isolated machines with no data exchange",
      "Connected equipment that shares operational data",
      "Manual reporting as the only source of information",
      "Eliminating all quality checks",
    ],
    correctAnswer: 1,
    explanation: "Industrial IoT connects machines, sensors and systems so teams can use timely operational data to make decisions.",
  },
  {
    id: 4,
    category: "DATA & ANALYTICS",
    question: "Which is a useful outcome of a real-time production dashboard?",
    options: [
      "Less visibility into production status",
      "More manual data entry for every update",
      "Faster identification of bottlenecks and performance changes",
      "A guarantee that equipment can never fail",
    ],
    correctAnswer: 2,
    explanation: "A well-designed dashboard makes important production signals visible sooner, helping teams investigate issues and respond faster.",
  },
  {
    id: 5,
    category: "INDUSTRY 4.0",
    question: "What is the best description of a digital twin?",
    options: [
      "A digital representation of a physical asset or process",
      "A second physical factory built beside the first",
      "A static spreadsheet that is never updated",
      "A replacement for all human expertise",
    ],
    correctAnswer: 0,
    explanation: "A digital twin represents a physical asset or process digitally and can use operational data to support monitoring and analysis.",
  },
];
