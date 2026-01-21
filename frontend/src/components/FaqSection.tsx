import { useState } from "react";
import "./FaqSection.css";

interface FaqItem {
  question: string;
  answer: string;
}

const faqs: FaqItem[] = [
  {
    question: "Hva er fordelene med å bruke AINOR?",
    answer: "AINOR hjelper restauranter med å øke inntektene ved å fange opp hver reservasjonsmulighet, reduserer personalbelastningen ved å håndtere rutineanrop og gir 24/7-tilgjengelighet. Den tilbyr også sanntidsanalyse og kan håndtere flere språk for å betjene internasjonale gjester."
  },
  {
    question: "Integrerer AINOR seg med reservasjonsplattformer?",
    answer: "Ja! AINOR integrerer seg med populære reservasjonssystemer som OpenTable, Resy, Tock og tilpassede bestillingsplattformer via API. Vi jobber også med kassasystemer som Toast, Square og Clover for meny-synkronisering."
  },
  {
    question: "Kan jeg tilpasse AINORs stemme?",
    answer: "Absolutt! Du kan tilpasse AINORs tone, legge til restaurantens personlighet, sette spesifikke fraser eller hilsener og konfigurere hvordan den håndterer ulike scenarier. Få AINOR til å høres ut som merkevaren din."
  },
  {
    question: "Hvor mange anrop kan AINOR håndtere samtidig?",
    answer: "AINOR kan håndtere ubegrenset samtidige anrop og chatmeldinger. Det er ingen grense for hvor mange gjester som kan samhandle med AINOR samtidig, noe som sikrer at du aldri går glipp av en reservasjonsmulighet."
  },
  {
    question: "Hvordan håndterer AINOR komplekse reservasjonsforespørsler?",
    answer: "AINOR er trent spesifikt på restaurant-samtaler og kan håndtere antall personer, spesielle anledninger, kostholdsrestriksjoner og tidspreferanser. Den spør avklarende spørsmål når det trengs og bekrefter alle detaljer før booking."
  },
  {
    question: "Hva skjer hvis AINOR ikke kan svare på et spørsmål?",
    answer: "Hvis AINOR støter på noe den ikke er sikker på, vil den høflig be gjesten om å kontakte restauranten direkte eller overføre dem til en menneskelig medarbeider. Du kan også sette opp eskaleringsregler for komplekse situasjoner."
  },
  {
    question: "Hvor lang tid tar det å sette opp AINOR?",
    answer: "De fleste restauranter er i gang på 30 minutter. Vi hjelper deg med å koble til reservasjonssystemet, laste opp menyen, sette åpningstidene og konfigurere spesielle instruksjoner. Ingen teknisk ekspertise kreves."
  },
  {
    question: "Finnes det en kontrakt eller langtidsforpliktelse?",
    answer: "Ingen langtidskontrakter. Du kan kansellere når som helst. Vi tilbyr månedlige og årlige planer, med rabatter for årlige forpliktelser. Start med en gratis prøveversjon for å se om AINOR fungerer for restauranten din."
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
        <h2 className="faq-title">Ofte Stilte Spørsmål</h2>
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


