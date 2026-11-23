const express = require("express");
const path = require("path");
const OpenAI = require("openai");
const app = express();
app.use(express.json({limit:"1mb"}));
app.use(express.static(path.join(__dirname,"public")));
app.post("/api/chat", async (req,res) => {
  try {
    if (!process.env.OPENAI_API_KEY) return res.status(503).json({error:"A chave da OpenAI ainda não foi configurada no servidor."});
    const {message,history=[]} = req.body || {};
    if (typeof message !== "string" || !message.trim()) return res.status(400).json({error:"Envie uma pergunta."});
    const client = new OpenAI({apiKey:process.env.OPENAI_API_KEY});
    const safeHistory = Array.isArray(history) ? history.slice(-12).filter(x => ["user","assistant"].includes(x.role) && typeof x.content==="string").map(x=>({role:x.role,content:x.content.slice(0,6000)})) : [];
    const response = await client.responses.create({
      model: process.env.OPENAI_MODEL || "gpt-4.1-mini",
      instructions: "Você é a IA RR, uma assistente prestativa, clara e amigável. Responda em português do Brasil por padrão. Explique passo a passo quando ajudar em tarefas escolares e não invente fatos.",
      input: [...safeHistory,{role:"user",content:message.trim()}]
    });
    res.json({reply:response.output_text || "Não consegui gerar uma resposta agora."});
  } catch(e) {
    console.error(e);
    res.status(500).json({error:"Erro ao consultar a IA. Verifique a configuração da API e tente novamente."});
  }
});
const port=process.env.PORT || 3000;
app.listen(port,()=>console.log(`IA RR rodando na porta ${port}`));
