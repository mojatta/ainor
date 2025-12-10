export function detectLanguage(text: string): "nb" | "en" {
  const lower = text.toLowerCase();

  // Heuristic for Norwegian: special letters or common words
  if (
    /[æøå]/.test(lower) ||
    lower.includes("hei") ||
    lower.includes("takk") ||
    lower.includes("bord") ||
    lower.includes("imorgen") ||
    lower.includes("klokken")
  ) {
    return "nb";
  }

  return "en";
}

