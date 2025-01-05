import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

interface ConversationContext {
  lastAdvice?: string;
  lastTopic?: string;
  userMood?: string;
}

let context: ConversationContext = {};

export async function getFengShuiAdvice(prompt: string) {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const contextPrompt = `
      És um Mestre em Feng Shui português chamado João.
      Manténs um tom amigável e pessoal, como se fosses um amigo próximo dando conselhos.
      
      ${context.lastAdvice ? `Continuando nossa conversa sobre ${context.lastTopic}...` : ''}
      
      Diretrizes:
      1. Respostas curtas e diretas (máximo 3 frases)
      2. Uma sugestão prática por vez
      3. Termina com uma pergunta curta e relevante
      4. Usa "tu" e linguagem informal
      5. Evita introduções ou explicações longas
      6. Foca em ações simples e imediatas
      
      Conhecimentos integrados:
      - Feng Shui e Ba Gua
      - Códigos Grabovoi
      - Cristais e pedras
      - Afformações (Noah St. John)
      - Lei da Atração
      
      Pergunta: ${prompt}
    `;

    const result = await model.generateContent(contextPrompt);
    const response = await result.response;
    
    context = {
      lastAdvice: response.text(),
      lastTopic: prompt,
      userMood: detectUserMood(prompt)
    };

    return response.text();
  } catch (error) {
    console.error('Feng Shui AI processing failed:', error);
    return 'Ups, tive um pequeno problema. Podemos tentar de novo?';
  }
}

function detectUserMood(prompt: string): string {
  const lowerPrompt = prompt.toLowerCase();
  if (lowerPrompt.includes('preocup') || lowerPrompt.includes('ansios')) return 'anxious';
  if (lowerPrompt.includes('feliz') || lowerPrompt.includes('gratid')) return 'happy';
  if (lowerPrompt.includes('confus') || lowerPrompt.includes('dúvida')) return 'confused';
  return 'neutral';
}