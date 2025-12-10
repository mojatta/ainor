import { useState } from "react";
import "./FaqSection.css";

interface FaqItem {
  question: string;
  answer: string;
}

const faqs: FaqItem[] = [
  {
    question: "What are the benefits of using AINOR?",
    answer: "AINOR helps restaurants increase revenue by capturing every reservation opportunity, reduces staff workload by handling routine calls, and provides 24/7 availability. It also offers real-time analytics and can handle multiple languages to serve international guests."
  },
  {
    question: "Does AINOR integrate with reservation platforms?",
    answer: "Yes! AINOR integrates with popular reservation systems like OpenTable, Resy, Tock, and custom booking platforms via API. We also work with POS systems like Toast, Square, and Clover for menu synchronization."
  },
  {
    question: "Can I customize AINOR's voice?",
    answer: "Absolutely! You can customize AINOR's tone, add your restaurant's personality, set specific phrases or greetings, and configure how it handles different scenarios. Make AINOR sound like your brand."
  },
  {
    question: "How many calls can AINOR handle at once?",
    answer: "AINOR can handle unlimited concurrent calls and chat messages. There's no limit to how many guests can interact with AINOR simultaneously, ensuring you never miss a reservation opportunity."
  },
  {
    question: "How does AINOR handle complex reservation requests?",
    answer: "AINOR is trained specifically on restaurant conversations and can handle party sizes, special occasions, dietary restrictions, and time preferences. It asks clarifying questions when needed and confirms all details before booking."
  },
  {
    question: "What happens if AINOR can't answer a question?",
    answer: "If AINOR encounters something it's unsure about, it will politely ask the guest to contact the restaurant directly or transfer them to a human staff member. You can also set up escalation rules for complex situations."
  },
  {
    question: "How long does it take to set up AINOR?",
    answer: "Most restaurants are up and running in 30 minutes. We'll help you connect your reservation system, upload your menu, set your opening hours, and configure any special instructions. No technical expertise required."
  },
  {
    question: "Is there a contract or long-term commitment?",
    answer: "No long-term contracts. You can cancel anytime. We offer monthly and annual plans, with discounts for annual commitments. Start with a free trial to see if AINOR works for your restaurant."
  }
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="faq-section">
      <div className="faq-container">
        <h2 className="faq-title">Frequently asked questions</h2>
        <div className="faq-grid">
          {faqs.map((faq, index) => (
            <div key={index} className="faq-item">
              <button
                className="faq-question"
                onClick={() => toggleFaq(index)}
                aria-expanded={openIndex === index}
              >
                <span>{faq.question}</span>
                <span className="faq-icon">{openIndex === index ? "−" : "+"}</span>
              </button>
              {openIndex === index && (
                <div className="faq-answer">{faq.answer}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
