import { useState } from "react";

export type SpeechRecognitionStatus = "idle" | "listening" | "error" | "unsupported";

type UseSpeechRecognitionOptions = {
  onResult: (transcript: string) => void;
  language?: "nb" | "en"; // Language hint: "nb" or "en"
};

export function useSpeechRecognition({ onResult, language: defaultLanguage = "en" }: UseSpeechRecognitionOptions) {
  const [status, setStatus] = useState<SpeechRecognitionStatus>("idle");
  const [currentLanguage, setCurrentLanguage] = useState<"nb" | "en">(defaultLanguage);

  const startListening = (language?: "nb" | "en") => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setStatus("unsupported");
      return;
    }

    // Use provided language or fall back to current/default
    const lang = language || currentLanguage;
    if (language) {
      setCurrentLanguage(language);
    }

    const recognition = new SpeechRecognition();
    
    // Map language hint to language code
    const langCode = lang === "nb" ? "nb-NO" : "en-US";
    recognition.lang = langCode;
    
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => setStatus("listening");
    recognition.onerror = () => setStatus("error");
    recognition.onend = () => setStatus("idle");

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let transcript = "";
      for (let i = 0; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
      }
      transcript = transcript.trim();
      if (transcript) {
        onResult(transcript);
      }
    };

    recognition.start();
  };

  return { startListening, status };
}
