export const botConfig = {
  responses: {
    welcome: "Hi! I'm ShareFlyt's assistant. How can I help you today?",
    services: {
      webDev:
        "I offer web development services using Next.js, React, and TypeScript.",
      mobile: "I provide mobile app development for iOS and Android platforms.",
      cloud: "I offer cloud solutions and DevOps services.",
    },
    booking: "Would you like to schedule a meeting? I can help you with that.",
    pricing:
      "Pricing varies based on project requirements. Would you like to discuss your specific needs?",
  },
  triggers: {
    services: ["services", "what do you offer", "help"],
    pricing: ["price", "cost", "rates"],
    booking: ["book", "schedule", "meeting"],
  },
};
