import { getTenantGemini } from "@/features/identity/server";
import type { TranslateNewsInput, TranslatedNewsResult } from "./validations";

export async function translateNewsWithGemini(
  tenantId: string,
  input: TranslateNewsInput
): Promise<TranslatedNewsResult> {
  const geminiConfig = await getTenantGemini(tenantId);
  const apiKey = geminiConfig?.apiKey || process.env.GEMINI_API_KEY || "";
  const model = geminiConfig?.model || process.env.GEMINI_MODEL || "gemini-2.5-flash";

  if (!apiKey) {
    throw new Error("news.aiTranslateMissingKey");
  }

  const prompt = `You are an expert bilingual academic translator and journalist for Mahachulalongkornrajavidyalaya University (MCU), specializing in Buddhist studies and meditation practices.

Translate and adapt the following Thai university news article into elegant, natural, world-standard academic English.
Guidelines:
- Accurately translate Buddhist terminology (e.g. Vipassana Meditation, Bhavana, Dhamma, Pali canons).
- Retain formal and inspiring university tone.
- If Thai summary is missing, synthesize a concise and compelling English summary (1-3 sentences) from the content.

Input Thai News:
- Thai Title: ${input.titleTh}
- Thai Summary: ${input.summaryTh || "None"}
- Thai Content: ${input.contentTh}

Return a STRICT JSON object with these keys:
{
  "titleEn": "English translation of the title",
  "summaryEn": "English translation or synthesis of the summary",
  "contentEn": "English translation of the full article content with formatted paragraphs"
}`;

  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent?key=${encodeURIComponent(apiKey)}`;

  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }],
        },
      ],
      generationConfig: {
        responseMimeType: "application/json",
        temperature: 0.2,
      },
    }),
  });

  if (!res.ok) {
    let errorMsg = `Gemini API error (${res.status} ${res.statusText})`;
    try {
      const errJson = await res.json();
      if (errJson.error?.message) {
        errorMsg = errJson.error.message;
      }
    } catch {}
    throw new Error(errorMsg);
  }

  const data = await res.json();
  const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!rawText) {
    throw new Error("No response from Gemini API");
  }

  try {
    const parsed = JSON.parse(rawText);
    return {
      titleEn: String(parsed.titleEn || "").trim(),
      summaryEn: String(parsed.summaryEn || "").trim(),
      contentEn: String(parsed.contentEn || "").trim(),
    };
  } catch {
    const jsonMatch = rawText.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0]);
      return {
        titleEn: String(parsed.titleEn || "").trim(),
        summaryEn: String(parsed.summaryEn || "").trim(),
        contentEn: String(parsed.contentEn || "").trim(),
      };
    }
    throw new Error("Failed to parse Gemini response as JSON");
  }
}
