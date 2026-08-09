import { ChatMessage } from "@/types";

export async function getAIResponse(
  messages: ChatMessage[]
): Promise<string> {
  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: messages.map((m) => ({
          role: m.role,
          content: m.content,
        })),
      }),
    });

    if (!response.ok) {
      return "माफ गर्नुहोस्, केही समस्या भयो। कृपया फेरि प्रयास गर्नुहोस्।";
    }

    const data = await response.json();
    return data.response || "जवाफ प्राप्त भएन। कृपया फेरि प्रयास गर्नुहोस्।";
  } catch {
    return "जडान गर्दा समस्या भयो। कृपया फेरि प्रयास गर्नुहोस्।";
  }
}
