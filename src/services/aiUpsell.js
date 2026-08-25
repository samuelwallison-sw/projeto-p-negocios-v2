// src/services/aiUpsell.js

export async function getAISuggestion(cartItems) {
  if (!cartItems || cartItems.length === 0) return null;

  // Lista os nomes dos produtos presentes no carrinho
  const nomesProdutos = cartItems.map(item => item.name || item.nome).join(", ");

  const prompt = `
  Você é um assistente de recomendação de um restaurante/hambuergueria.
  O cliente possui os seguintes itens no carrinho: ${nomesProdutos}.
  Recomende EXATAMENTE 1 item complementar (bebida, sobremesa ou acompanhamento como batata) para transformar a refeição em um combo incrível.

  Responda EXCLUSIVAMENTE em formato JSON com a seguinte estrutura (sem marcações markdown de código):
  {
    "id": 999,
    "name": "Nome do Produto",
    "reason": "Frase curta e persuasiva (máx 12 palavras) de por que combina",
    "price": 8.50,
    "image": "https://images.unsplash.com/photo-1576107232684-1279f3908594?w=500&auto=format&fit=crop&q=80"
  }
  `;

  try {
    // Insira sua API Key da OpenAI no local indicado (ou altere para o endpoint do seu Backend)
    const OPENAI_API_KEY = "SUA_API_KEY_AQUI";

    // Se não tiver chave configurada, dispara o fallback imediato
    if (!OPENAI_API_KEY || OPENAI_API_KEY === "SUA_API_KEY_AQUI") {
      throw new Error("Chave de API não configurada");
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7
      })
    });

    const data = await response.json();
    const content = data.choices[0].message.content.trim();
    
    // Converte a resposta em texto da IA para objeto JSON
    return JSON.parse(content);

  } catch (error) {
    console.warn("Utilizando sugestão padrão (fallback):", error.message);

    // Lógica local para simular IA caso a API falhe ou fique sem chave
    const temBebida = nomesProdutos.toLowerCase().includes("coca") || nomesProdutos.toLowerCase().includes("suco");

    if (temBebida) {
      return {
        id: 98,
        name: "Batata Rústica com Cheddar",
        reason: "Sua refeição fica completa com uma batata quentinha!",
        price: 14.00,
        image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=500&auto=format&fit=crop&q=80"
      };
    }

    return {
      id: 99,
      name: "Coca-Cola Zero Gelada",
      reason: "Nada melhor que uma bebida gelada para acompanhar seu lanche!",
      price: 6.50,
      image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=500&auto=format&fit=crop&q=80"
    };
  }
}