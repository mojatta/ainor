import { useEffect, useState } from "react";

type SpeakOptions = {
  text: string;
  languageHint?: "nb" | "en";
};

export function useVoicePlayback() {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  // Load voices when available
  useEffect(() => {
    if (!("speechSynthesis" in window)) return;

    const loadVoices = () => {
      setVoices(window.speechSynthesis.getVoices());
    };

    // Voices might be available immediately or need to be loaded
    loadVoices();
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, []);

  const speak = (options: SpeakOptions) => {
    const { text, languageHint = "en" } = options;

    if (!("speechSynthesis" in window)) return;

    // Stop anything currently speaking
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);

    // Map language hint to language code
    const langCode = languageHint === "nb" ? "nb-NO" : "en-US";
    utterance.lang = langCode;

    // Voice selection: pick the first voice that matches the language if available
    const availableVoices = voices.length > 0 ? voices : window.speechSynthesis.getVoices();
    const matchingVoice = availableVoices.find(v => v.lang === langCode) || availableVoices.find(v => v.lang.startsWith(langCode.split("-")[0]));
    if (matchingVoice) {
      utterance.voice = matchingVoice;
    }

    // Tune sound to be more natural
    utterance.rate = 1;    // 0.8 – 1.1 is a good range
    utterance.pitch = 1;   // Keep pitch natural
    utterance.volume = 1;

    window.speechSynthesis.speak(utterance);
  };

  return { speak };
}
