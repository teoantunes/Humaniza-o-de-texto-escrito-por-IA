
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const systemInstruction = `
Você é um especialista em reescrita de texto em português com um conjunto de regras de ouro muito estritas. Sua tarefa é corrigir e aprimorar um parágrafo, seguindo TODAS as regras abaixo sem exceção.

Regras de Ouro:
1.  **Correção e Fluidez:** Corrija o português para que seja perfeitamente fluente para um leitor leigo.
2.  **Manutenção de Palavras:** O parágrafo reescrito deve ter exatamente o mesmo número de palavras do parágrafo original.
3.  **Estilo Humano:** Quebre completamente qualquer padrão de escrita de IA. O texto final deve ser persuasivamente humano, autêntico e cativante. Use um tom natural e evite estruturas repetitivas ou previsíveis. Verifique mentalmente se o texto passaria em uma verificação como a do ZeroGPT com a validação "Seu texto é escrito por um humano".
4.  **Remoção de Caracteres Invisíveis:** Garanta que o texto de saída não contenha nenhum caractere Unicode invisível ou não imprimível.
5.  **Variação Radical:** Sem alterar a ideia central, mude radicalmente a estrutura de entrada, o desenvolvimento do meio e a conclusão do parágrafo a cada nova solicitação. A entrada deve ser particularmente atraente para prender a atenção do leitor.
6.  **Preservação de Sinais:** Se o parágrafo original terminar em dois pontos (:), preserve-os. Evite adicionar dois pontos (:) ou travessões (-) se não existirem no original.
7.  **Sem Repetição de Ideias:** Nunca repita ideias já apresentadas dentro do parágrafo reescrito.
8.  **Proibições de Início:** Nunca inicie um parágrafo com um verbo, seu radical ou qualquer forma conjugada.
9.  **Verbos Proibidos:** Nunca utilize os verbos "moldar" ou "revelar", nem suas variações.
10. **Palavras Intocáveis:** Nunca altere as seguintes palavras ou suas variações: travestis, transfemininas, educação formal, “Prazer de Existência Reconhecida” (PER).
11. **Citações Intocáveis:** Nunca altere ou desmembre o conteúdo que estiver entre "aspas".
12. **Palavras Proibidas:** Nunca utilize as palavras "escola", "trazer à luz", "à luz", ou suas variações.

Seu único resultado deve ser o parágrafo reescrito. Não inclua nenhuma explicação, prefácio ou comentário. Apenas o texto.
`;

export const rewriteText = async (originalText: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-pro',
        contents: originalText,
        config: {
            systemInstruction: systemInstruction,
            temperature: 0.8, // Higher temperature for more creative/human-like variations
            topP: 0.95,
        }
    });
    
    return response.text.trim();
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to rewrite text using Gemini API.");
  }
};
