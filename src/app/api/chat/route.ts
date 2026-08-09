import { NextRequest, NextResponse } from "next/server";

// Groq Free API - llama-3.3-70b-versatile
// Get free key at: https://console.groq.com
const GROQ_API_KEY = process.env.GROQ_API_KEY || "";
const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";

// Comprehensive system prompt for FitSraj Chat Bot
const SYSTEM_PROMPT = `तिमी FitSraj AI Chat Bot हौ। तिमी नेपाली र अंग्रेजी दुवैमा जवाफ दिन सक्छौ।

तिमी यी सबै विषयमा जवाफ दिन सक्छौ:
- AI Tools: ChatGPT, Gemini, NotebookLM, Claude, Canva, InShot, Google Flow, Suno
- AI Learning: Prompt Engineering, AI basics, Machine Learning
- Fitness: व्यायाम, योगा, डाइट, तौल व्यवस्थापन, मासपेशी बनाउने
- Trading: Forex, Stock Market, Cryptocurrency, Bitcoin, Investment
- Technology: Coding, Python, JavaScript, Website, App बनाउने
- Education: English सिक्ने, Study Tips, गणित
- Health: स्वास्थ्य, निद्रा, तनाव व्यवस्थापन
- Business: Marketing, YouTube, व्यापार
- Nepal: NRIC, लोकसेवा, नागरिकता, नेपालको इतिहास
- General: कुनै पनि प्रश्नको जवाफ

नेपालीमा सोधेको छ भने नेपालीमा जवाफ देऊ, अंग्रेजीमा सोधेको छ भने अंग्रेजीमा।
सधैं helpful, friendly र detailed जवाफ देऊ।`;

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Messages array required" }, { status: 400 });
    }

    // If no API key, use comprehensive local responses
    if (!GROQ_API_KEY) {
      const lastUserMessage = [...messages].reverse().find((m: { role: string }) => m.role === "user");
      const query = lastUserMessage?.content?.toLowerCase() || "";
      return NextResponse.json({ response: getLocalResponse(query) });
    }

    // Call Groq API
    const response = await fetch(GROQ_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages.map((m: { role: string; content: string }) => ({
            role: m.role,
            content: m.content,
          })),
        ],
        temperature: 0.7,
        max_tokens: 1024,
      }),
    });

    if (!response.ok) {
      const lastUserMessage = [...messages].reverse().find((m: { role: string }) => m.role === "user");
      const query = lastUserMessage?.content?.toLowerCase() || "";
      return NextResponse.json({ response: getLocalResponse(query) });
    }

    const data = await response.json();
    const aiResponse = data.choices?.[0]?.message?.content;

    if (!aiResponse) {
      const lastUserMessage = [...messages].reverse().find((m: { role: string }) => m.role === "user");
      const query = lastUserMessage?.content?.toLowerCase() || "";
      return NextResponse.json({ response: getLocalResponse(query) });
    }

    return NextResponse.json({ response: aiResponse });
  } catch {
    return NextResponse.json({ response: "माफ गर्नुहोस्, केही समस्या भयो। कृपया फेरि प्रयास गर्नुहोस्।" });
  }
}

// Comprehensive local fallback responses
function getLocalResponse(query: string): string {
  if (query.includes("chatgpt")) return "ChatGPT OpenAI द्वारा बनाइएको AI chatbot हो। chatgpt.com मा जाएर निःशुल्क प्रयोग गर्न सक्नुहुन्छ। यसले प्रश्नको जवाफ दिन्छ, लेख्छ, कोड लेख्छ, र धेरै काम गर्छ।";
  if (query.includes("gemini")) return "Google Gemini Google को बहु-मोडल AI हो। यसले टेक्स्ट, चित्र र कोड बुझ्छ। gemini.google.com मा प्रयोग गर्न सकिन्छ।";
  if (query.includes("notebooklm")) return "NotebookLM Google को AI अनुसन्धान assistant हो। यसले तपाईंको कागजात बुझ्छ र सारांश बनाउँछ। notebooklm.google.com मा जानुहोस्।";
  if (query.includes("claude")) return "Claude Anthropic द्वारा बनाइएको AI chatbot हो। लामो लेख बुझ्न राम्रो छ। claude.ai मा प्रयोग गर्न सकिन्छ।";
  if (query.includes("canva")) return "Canva एक ग्राफिक डिजाइन tool हो। Logo, Poster, Banner, Thumbnail बनाउन सकिन्छ। canva.com मा जानुहोस्।";
  if (query.includes("inshot")) return "InShot एक भिडियो एडिटिङ app हो। भिडियो काट्ने, जोड्ने, टेक्स्ट राख्ने काम गर्छ।";
  if (query.includes("suno")) return "Suno AI ले गीत र संगीत स्वचालित बनाउँछ। suno.com मा प्रयोग गर्न सकिन्छ।";
  if (query.includes("google flow")) return "Google Flow ले AI बाट भिडियो बनाउँछ। flow.google.com मा प्रयोग गर्न सकिन्छ।";
  if (query.includes("prompt")) return "राम्रो Prompt: 1) स्पष्ट रहनुहोस्, 2) विशिष्ट रहनुहोस्, 3) सन्दर्भ दिनुहोस्, 4) उदाहरण दिनुहोस्।";
  if (query.includes("image") || query.includes("photo") || query.includes("चित्र")) return "AI बाट Photo बनाउन Canva, DALL-E, Midjourney प्रयोग गर्न सक्नुहुन्छ।";
  if (query.includes("video") || query.includes("भिडियो")) return "AI बाट Video बनाउन Google Flow, InShot AI प्रयोग गर्न सक्नुहुन्छ।";
  if (query.includes("fitness") || query.includes("व्यायाम")) return "दैनिक व्यायाम: स्ट्रेचिङ, दौड, शक्ति प्रशिक्षण। कम्तिमा ३० मिनेट व्यायाम गर्नुहोस्।";
  if (query.includes("yoga") || query.includes("योगा")) return "योगाले शरीर र मन दुवैलाई शान्त पार्छ। प्रतिदिन सूर्य नमस्कार, प्राणायाम गर्नुहोस्।";
  if (query.includes("diet") || query.includes("आहार")) return "स्वस्थ आहार: फलफूल, तरकारी, दाल, भात। जंक फूड कम खानुहोस्।";
  if (query.includes("trading") || query.includes("फोरेक्स")) return "Trading: Candlestick Patterns, Support & Resistance, Risk Management सिक्नुहोस्।";
  if (query.includes("forex")) return "Forex Trading भनेको विदेशी मुद्राको व्यापार हो। USD/EUR, USD/GBP जस्ता जोडीमा व्यापार गरिन्छ।";
  if (query.includes("bitcoin") || query.includes("crypto")) return "Bitcoin एक cryptocurrency हो। Trading गर्दा सावधान हुनुहोस्, जोखिम धेरै छ।";
  if (query.includes("stock")) return "Stock Market मा कम्पनीको शेयर किन्ने-बेच्ने गरिन्छ। लामो समयका लागि लगानी गर्दा बढी फाइदा हुन्छ।";
  if (query.includes("coding") || query.includes("कोडिङ")) return "Coding सिक्न YouTube मा tutorials छन्। Python, JavaScript बाट सुरु गर्नुहोस्।";
  if (query.includes("python")) return "Python एक सजिलो programming language हो। AI, Web Development, Data Science मा प्रयोग हुन्छ।";
  if (query.includes("javascript")) return "JavaScript Web Development को लागि प्रयोग हुन्छ। React, Node.js जस्ता frameworks छन्।";
  if (query.includes("website")) return "Website बनाउन WordPress, Wix, वा Coding (HTML, CSS, JS) प्रयोग गर्न सकिन्छ।";
  if (query.includes("english")) return "English सिक्न: रोजाना अंग्रेजीमा बोल्नुहोस्, YouTube मा English videos हेर्नुहोस्।";
  if (query.includes("health") || query.includes("स्वास्थ्य")) return "स्वास्थ्य: दैनिक व्यायाम, स्वस्थ खाना, राम्रो निद्रा, पानी पिउनुहोस्।";
  if (query.includes("sleep") || query.includes("निद्रा")) return "राम्रो निद्रा: दैनिक ७-८ घण्टा सुत्नुहोस्। सुत्दा फोन नहेर्नुहोस्।";
  if (query.includes("stress") || query.includes("तनाव")) return "तनाव कम गर्न: ध्यान गर्नुहोस्, व्यायाम गर्नुहोस्, प्रियजनसँग कुरा गर्नुहोस्।";
  if (query.includes("nepal") || query.includes("नेपाल")) return "नेपाल: सगरमाथा भएको देश। काठमाडौं राजधानी। धेरै जातजाति छन्।";
  if (query.includes("business") || query.includes("व्यापार")) return "व्यापार: बजार अध्ययन गर्नुहोस्, बिजनेस प्लान बनाउनुहोस्, सानोबाट सुरु गर्नुहोस्।";
  if (query.includes("youtube")) return "YouTube: राम्रो कन्टेन्ट बनाउनुहोस्, नियमित भिडियो अपलोड गर्नुहोस्, SEO सिक्नुहोस्।";
  if (query.includes("money") || query.includes("पैसा")) return "पैसा बचत: अनावश्यक खर्च कटौती गर्नुहोस्, बजेट बनाउनुहोस्, नियमित बचत गर्नुहोस्।";
  if (query.includes("investment") || query.includes("लगानी")) return "लगानी: बचत गर्नुहोस्, बजेट बनाउनुहोस्, सानो रकमबाट सुरु गर्नुहोस्।";
  if (query.includes("motivation") || query.includes("प्रेरणा")) return "प्रेरणा: आफ्नो लक्ष्य सम्झनुहोस्, छोटो कदम बाट सुरु गर्नुहोस्, हार नमान्नुहोस्।";
  if (query.includes("fitsraj") || query.includes("भरत")) return "FitSraj भनेको Bharat Sraj को personal brand हो। AI, Fitness, Trading, र Video Editing सिकाउँछन्।";
  if (query.includes("hello") || query.includes("hi") || query.includes("नमस्ते")) return "🙏 नमस्ते! म तपाईंको सेवामा छु। कुनै पनि प्रश्न सोध्नुहोस्!";
  if (query.includes("help") || query.includes("मद्दत")) return "म तपाईंलाई AI, Technology, Fitness, Trading, र धेरै विषयमा मद्दत गर्न सक्छु। के सोध्नुहुन्छ?";

  return `तपाईंले भन्नुभयो: "${query}"

म तपाईंलाई यसमा मद्दत गर्न सक्छु। तपाईं यी विषयमा पनि सोध्न सक्नुहुन्छ:

🤖 AI Tools — ChatGPT, Gemini, Claude, Canva
💪 Fitness — व्यायाम, योगा, डाइट
📈 Trading — Forex, Stock, Crypto
📚 Education — English, Coding
💼 Business — Marketing, YouTube
🧠 Health — निद्रा, तनाव

के सोध्नुहुन्छ?`;
}
